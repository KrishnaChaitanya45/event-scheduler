import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common/decorators';
//? the refresh token strategy is used to validate the refresh token
//? the refresh token is used to generate a new access token
//? the refresh token is stored in a cookie ( from client )
//? we extract the refresh token from the cookie and validate it
//? if it is valid, we generate a new access token
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
