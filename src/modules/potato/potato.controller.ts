import { PotatoService } from './potato.service';
import { PartialType } from '@nestjs/mapped-types';
import {
  Controller,
  Get,
  Req,
  Logger,
  Res,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
  UploadedFiles,
  Body,
  StreamableFile,
  Headers,
  Header,
  RequestTimeoutException,
  Render,
  Sse,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
  NoFilesInterceptor,
} from '@nestjs/platform-express';
import { interval, map, Observable } from 'rxjs';
import { Public } from '~/common/decorators/public.decorators';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';

@ApiTags('土豆')
@ApiBearerAuth()
@Controller('potato')
export class PotatoController {
  private readonly logger = new Logger(PotatoController.name);

  constructor(private readonly potatoService: PotatoService) {}
  @Get()
  getCookie(@Req() req: Request, @Res() res: Response): void {
    // res.cookie('potato', 'potato cookies send');
    const { potato } = req.cookies;
    this.logger.log(potato, PotatoController.name);
    res.send('hello potato'); // 用了@Res后要手动响应 否则会一直padding挂起
  }

  @Get('/getImage')
  @Header('Content-Type', 'image/jpeg')
  @Header('Content-Disposition', 'attachment; filename="dls.jpg"') //下载文件响应头
  getImage(): StreamableFile {
    const file = createReadStream(join(process.cwd(), '/src/assets/dls.jpg'));
    return new StreamableFile(file);
    // return new StreamableFile(file, {
    //   type: 'image/jpeg',
    // });
  }

  @Post('/upLoad')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '上传文件单个',
    description: '这里上传文件',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }), // 1kb = 1024 bytes 1MB = 1kb * 1024 bytes
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): string {
    console.log('file:', file);
    return 'upload successfully';
  }

  @Post('/uploadFiles')
  @ApiOperation({
    summary: '上传文件多个',
    description: '这里上传文件',
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 0.4 * 1024 * 1024 }), // 1kb = 1024 bytes 1MB = 1kb * 1024 bytes
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): string {
    console.log('files:', files);
    return 'upload successfully';
  }

  @Post('/uploadFilesName')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'potato', maxCount: 10 },
      { name: 'tomato', maxCount: 10 },
    ]),
  )
  uploadDifferentNameFile(
    @UploadedFiles()
    files: {
      potato?: Express.Multer.File[];
      tomato?: Express.Multer.File[];
    },
  ): string {
    console.log(files.potato);
    return 'upload successfully';
  }

  @Post('/uploadAny')
  @UseInterceptors(AnyFilesInterceptor())
  uploadAny(@UploadedFiles() files: Array<Express.Multer.File>): string {
    console.log(files);
    return 'upload successfully';
  }

  @Post('/uploadNoFile')
  @UseInterceptors(NoFilesInterceptor())
  uploadNoFile(@Body() body: Record<string, any>): string {
    console.log(body);
    return 'send successfully';
  }

  @Get('/getAxiosDate')
  async getAxiosDate(): Promise<void> {
    const result = await this.potatoService.getAxiosDate();
    return result;
  }

  @Public()
  @Get('/getHelloWorldMvc')
  @Render('index')
  getHelloWorldMvc(): Record<string, string> {
    return { message: 'Hello world!', potato: 'hello potato' };
  }

  @Sse('/getSseMessage')
  getSseMessage(): Observable<Record<string, any>> {
    return interval(1000).pipe(
      map((_) => {
        const timeNow = new Date().toLocaleString();
        return {
          data: JSON.stringify(`hello potato ${timeNow}`),
        };
      }),
    );
  }
}
