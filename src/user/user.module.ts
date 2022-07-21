import { Module } from '@nestjs/common';
import { FilesModule } from 'src/files/files.module';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';


@Module({
  imports: [FilesModule],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
  exports: [UserService]
})
export class UserModule {
}
