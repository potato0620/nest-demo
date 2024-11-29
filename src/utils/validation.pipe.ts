// 自定义验证管道
import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): number {
    console.log('value', value);
    console.log('metadata', metadata);
    return Number(value);
  }
}
