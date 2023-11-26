import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common/decorators';
//? Extract the access token from the request header
//? Validate the access token and decode it
//? we get userId and email from the access Token
//? for this process we use the passport-jwt library and
//? this strategy is used as the Guard for the protected routes
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      ignoreExpiration: true,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return { userId: payload.sub, email: payload.email };
  }
}
