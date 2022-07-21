import { Controller, Body, Post, UseGuards, Req, UseInterceptors, UploadedFile, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { DoesUserExist } from 'src/guards/doesUserExists.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post('login')
    async login(@Req() req: Request) {
        return await this.authService.login(req.user);
    }
    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }
}
