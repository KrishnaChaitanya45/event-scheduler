import { AuthGuard } from '@nestjs/passport';
//? Just to simplify the name of the guard
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
