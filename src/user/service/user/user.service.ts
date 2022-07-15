import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class UserService {
    public users: UserDto[]= []

    create(user: UserDto) {
        this.users.push(user)
    }

    getAll(): UserDto[]{
        return this.users
    }
}
