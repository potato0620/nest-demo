import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return Number(request.params[data]);
  },
);
