import { Injectable, Inject, HttpException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { USER_REPOSITORY } from '../constants';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly filesService: FilesService
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async uploadUserAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const user = await this.findOneById(userId);
    await this.userRepository.update<User>({avatarID:avatar.id},{where:{id:userId}})
    // userId, {
    //     ...user,
    //     avatar,
    //   }
    return avatar;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne<User>({ where: { email } });
    return user;
  }
  async findAll(): Promise<User[]> {
    const user = await this.userRepository.findAll<User>();
    return user;
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async deleteOneById(id: number): Promise<number> {
    const result = await this.userRepository.destroy<User>({ where: { id } });
    if (!result) {
      throw new HttpException('Account already deleted or doesn`t exist!', 409);
    }
    return result;
  }
}
