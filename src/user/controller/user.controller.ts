import {Controller,Get,Post} from '@nestjs/common'
import { UserService } from '../service/user/user.service'



@Controller('user')
export class UserController{

    constructor(private readonly userService: UserService){}

    @Get()
    getAll(): string{
        const users = this.userService.getAll()
        return 'Fetched all users!'
    }

    @Post()
    create(): string{
        return 'User created!'
    }
}