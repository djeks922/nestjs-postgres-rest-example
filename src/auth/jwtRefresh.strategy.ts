import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import TokenPayload from './interface/tokenPayload'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('nestjs-refresh-token'),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }
 
  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.headers['nestjs-refresh-token'] as string
    const user = await this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.id);
    if(user){
      delete user.password
      delete user.refreshToken

      return user
    }else{
      throw new UnauthorizedException()
    }
  }
}