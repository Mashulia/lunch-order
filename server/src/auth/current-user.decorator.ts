import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/users.model';

export const CurrentUser = createParamDecorator(
  (data: User, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
