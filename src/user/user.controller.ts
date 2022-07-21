import {Controller,Delete,Get,Param,Post, Req, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request, Express } from 'express'
import {RequestWithUser} from 'src/auth/interface/requestWithUser'
import { UserService } from './user.service'

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController{

    constructor(private userService: UserService ){}

    @Post('avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    addAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: RequestWithUser): string{
        console.log(file)
        this.userService.uploadUserAvatar(req.user.id,file.buffer,file.originalname)
        return 'uploaded!'
    }

    @Get('me')
    getMe(@Req() req: RequestWithUser): Express.User{
        return req.user
    }

    @Get(':id')
    getById(@Req() req: RequestWithUser): Express.User{
        return this.userService.findOneById(req.user.id)
    }

    @Get()
    getAll(){
        return this.userService.findAll()
    }

    // @UseGuards()
    @Delete(':id')
    deleteById(@Req() req: RequestWithUser,@Param('id') id: number ){
        return this.userService.deleteOneById(id)
    }

    @Delete('me')
    async deleteMe(@Req() req: RequestWithUser){
        await this.userService.deleteOneById(req.user.id)
        return 'Your account deleted successfully!'
    }
}