import {Controller,Get,Post, Req, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request, Express } from 'express'
import { CreateUserDto } from './dto/createUser.dto'
import { UserService } from './user.service'

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController{

    constructor(private userService: UserService ){}

    @Post('avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    addAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: Request): string{
        this.userService.uploadUserAvatar(req.user,file)
        return 'uploaded!'
    }

    @Get('me')
    getMe(@Req() req: Request): Express.User{
        return req.user
    }
}