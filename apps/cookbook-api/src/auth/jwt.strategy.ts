import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { Request as RequestType } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // !! Choice between cookie mode and token in header mode !!
  constructor(private readonly configService: ConfigService) {
    super({
      // --------- COOKIES MODE --------- //
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   JwtStrategy.extractJWT,
      //   ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ]),
      // --------- END COOKIE MODE --------- //

      // --------- HEADER MODE --------- //
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // --------- END HEADER MODE --------- //

      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: { userId: string; role: string }) {
    return { userId: payload.userId, role: payload.role };
  }

  // --------- COOKIES MODE --------- //
  // private static extractJWT(req: RequestType): string | null {
  //   if (req.cookies && 'access_token' in req.cookies) {
  //     return req.cookies.access_token;
  //   }
  //   return null;
  // }
  // --------- END COOKIE MODE --------- //
}
