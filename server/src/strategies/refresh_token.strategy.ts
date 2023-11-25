import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common/decorators';
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      passReqToCallback: true,
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
  }
  private static extractJWT(req: Request): string | null {
    console.log(req.cookies);
    if (
      req.cookies &&
      'refreshToken' in req.cookies &&
      req.cookies['refreshToken'].length > 0
    ) {
      console.log('COOKIES PRESENT');
      return req.cookies['refreshToken'];
    }
    return null;
  }
  validate(req: Request, payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      refreshToken: req.cookies['refreshToken'],
    };
  }
}
