import { ConsoleLogger, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from '../user/user.service';
import TokenPayload from './interface/tokenPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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
    delete result.password;
    return result;
  }

  public async login(user: Omit<UserDto,'password'>) {

    const payload = { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      gender: user.gender
    }

    const accesstoken = await this.generateAccessToken(payload);
    const refreshtoken = await this.generateRefreshToken(payload);
    delete user.refreshToken

    await this.userService.setCurrentRefreshToken(refreshtoken,user.id)
    return { user, tokens:{accesstoken,refreshtoken} };
  }

  public async create(user: CreateUserDto) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.create({ ...user, password: pass });
    console.log(newUser.get())
    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser.get({plain:true});

    const plainUser: Omit<UserDto,'password'> = result as Omit<UserDto,'password'> 

    // then login
    return await this.login(plainUser);
  }
  
  public async logout(userId: number) {
    // hash the password
   return await this.userService.updateOneById(userId,{refreshToken:null})
  }

  private async generateAccessToken(payload: TokenPayload) {
    const token = await this.jwtService.signAsync(payload,{expiresIn: process.env.JWT_ACCESS_EXPIRES,secret: process.env.JWT_ACCESS_SECRET});
    return token;
  }
  private async generateRefreshToken(payload: TokenPayload) {
    const token = await this.jwtService.signAsync(payload,{expiresIn: process.env.JWT_REFRESH_EXPIRES,secret: process.env.JWT_REFRESH_SECRET});
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
