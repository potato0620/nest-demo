import { HttpException } from '@nestjs/common';

// 自定义异常 但是就http异常来说不太用得上 nest已经提供很多了

class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(message, 403);
  }
}

export { ForbiddenException };
