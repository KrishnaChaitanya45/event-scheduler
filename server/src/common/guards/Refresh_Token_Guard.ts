import { AuthGuard } from '@nestjs/passport';
//? Just to improve readability of the code, a custom guard is created
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
