import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class MtlsStrategy extends PassportStrategy(Strategy, 'mtls') {
  constructor(configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        jwksUri: `${configService.get('AUTH_ISSUER_MTLS')}/jwks`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: configService.get('AUTH_ISSUER_MTLS'),
      algorithms: ['RS256'],
    });
  }

  validate(payload: any): unknown {
    return payload;
  }
}
