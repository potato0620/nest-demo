import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator that retrieves a parameter from the request URL and converts it to a number.
 * @param data - The name of the parameter to retrieve.
 * @param ctx - The ExecutionContext to access the request.
 * @returns The numeric value of the specified parameter.
 */
export const CustomDecorator = createParamDecorator(
  // 自定义参数装饰器
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return Number(request.params[data]);
  },
);
