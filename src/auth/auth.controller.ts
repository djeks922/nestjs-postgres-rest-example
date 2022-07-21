import { Controller, Body, Post, UseGuards, Req, UseInterceptors, UploadedFile, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { DoesUserExist } from 'src/guards/doesUserExists.guard';
import { Request } from 'express';
import RequestWithUser from './interface/requestWithUser';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post('login')
    async login(@Req() req: RequestWithUser) {
        return await this.authService.login(req.user);
    }
    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: CreateUserDto) {
        return await this.authService.create(user);
    }
}
