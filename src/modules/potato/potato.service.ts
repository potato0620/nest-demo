import {
  Injectable,
  OnApplicationBootstrap,
  RequestTimeoutException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class PotatoService implements OnApplicationBootstrap {
  private readonly logger = new Logger(PotatoService.name);

  constructor(private readonly httpService: HttpService) {}
  async onApplicationBootstrap(): Promise<void> {
    // const chalk = (await import('chalk')).default;
    // console.log('potato service start right now');
  }

  public async getAxiosDate(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get<any>('http://localhost:8899/api/cats/all').pipe(
        catchError((error) => {
          this.logger.error(error);
          throw new RequestTimeoutException('server error');
        }),
      ),
    );

    return data;
  }
}
