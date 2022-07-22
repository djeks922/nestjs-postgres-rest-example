import { Injectable, Inject, HttpException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { USER_REPOSITORY } from '../constants';
import { FilesService } from 'src/files/files.service';
import { PrivateFilesService } from 'src/privateFiles/privateFiles.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly filesService: FilesService,
    private readonly filesPrivateService: PrivateFilesService
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async uploadUserAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const user = await this.findOneById(userId);
    console.log(user)
    if(user.avatar){
      await this.updateOneById(userId,{avatar:null})
      await this.filesService.deletePublicFile(user.avatar.id)
    }
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    
    await this.userRepository.update<User>({avatarID:avatar.id},{where:{id:userId}})

    return avatar;
  }

  async addPrivateFile(userId: number, imageBuffer: Buffer, filename: string) {
    return this.filesPrivateService.uploadPrivateFile(imageBuffer, userId, filename);
  }

  async getPrivateFile(userId: number, id: number) {
    const result = await this.filesPrivateService.getPrivateFile(id);
    if(result.localInfo.userId === userId){
      return result 
    }
    throw new UnauthorizedException()
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
    const user =  await this.userRepository.findOne<User>({ where: { id },'include':[{all:true}]});
    return user
  }

  async updateOneById(id: number, updates: Partial<User>): Promise<any> {
    return await this.userRepository.update<User>({...updates}, {where: {id}});
  }

  async deleteOneById(id: number): Promise<number> {
    const result = await this.userRepository.destroy<User>({ where: { id } });
    if (!result) {
      throw new HttpException('Account already deleted or doesn`t exist!', 409);
    }
    return result;
  }
}
