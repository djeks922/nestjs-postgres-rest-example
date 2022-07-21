import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from '../user/user.service';
import TokenPayload from './interface/tokenPayload';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, pass: string) {
        // find if user exist with this email
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return null;
        }

        // find if user password match
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        const result: UserDto = user['dataValues'];
        delete result.password
        return result;
    }

    public async login(user: Partial<UserDto>) {
        const token = await this.generateToken({id:user.id,email:user.email});
        return { user, token };
    }

    public async create(user) {
        // hash the password
        const pass = await this.hashPassword(user.password);

        // create the user
        const newUser = await this.userService.create({ ...user, password: pass });

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newUser['dataValues'];

        // generate token
        const token = await this.generateToken(result);

        // return the user and the token
        return { user: result, token };
    }

    private async generateToken(payload: TokenPayload) {
        const token = await this.jwtService.signAsync(payload);
        return token;
    }

    private async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}
