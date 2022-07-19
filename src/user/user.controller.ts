import {Controller,Get,Post} from '@nestjs/common'



@Controller('user')
export class UserController{

    constructor(){}

    @Get()
    getAll(): string{
        return 'Fetched all users!'
    }

    @Post()
    create(): string{
        return 'User created!'
    }
}