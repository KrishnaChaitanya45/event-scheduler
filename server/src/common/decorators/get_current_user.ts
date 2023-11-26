import { ExecutionContext, createParamDecorator } from '@nestjs/common';
//? The AccessTokenStrategy returns the user object from the access token, in nestjs we cannot directly access
//? the user object from the request object, so we use this decorator to get the user object from the request object
export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!data) return request.user;
    return request.user[data];
  },
);
