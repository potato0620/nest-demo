import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
@WebSocketGateway(9999, {
  namespace: '/messages',
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  private server: Server;
  private intervals: { [key: string]: NodeJS.Timeout } = {};
  private logger = new Logger(EventsGateway.name);

  constructor(private jwtService: JwtService) {}

  // 当客户端连接时自动触发
  async handleConnection(client: Socket): Promise<void> {
    this.logger.log('客户端已连接:' + client.id);
    // 验证客户端
    const token = client.handshake.auth.token;

    const isValid = await this.validateToken(token);
    if (!isValid) {
      this.server.emit('error', '权限校验失败');
      client.disconnect(true);
      // this.server.disconnectSockets();
      return;
    }

    this.intervals['potato'] = setInterval(() => {
      this.server.emit('potato', 'hello see you potato');
    }, 2000);

    this.intervals['tomato'] = setInterval(() => {
      this.server.emit('tomato', 'hello tomato');
    }, 3000);
  }

  handleDisconnect(client: Socket): void {
    this.logger.error('客户端已断开:' + client.id);
    // 清除定时器
    clearInterval(this.intervals['potato']);
    clearInterval(this.intervals['tomato']);
  }

  afterInit(): void {
    this.logger.log('initd ~');
  }

  private async validateToken(token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      this.logger.log('验证成功: ' + payload.email);
      return true;
    } catch (error) {
      this.logger.error('验证失败:', error);
      return false;
    }
  }
}
