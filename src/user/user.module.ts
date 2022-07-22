import { Module } from '@nestjs/common';
import { FilesModule } from 'src/files/files.module';
import { PrivateFilesModule } from 'src/privateFiles/privateFiles.module';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';


@Module({
  imports: [FilesModule,PrivateFilesModule],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
  exports: [UserService]
})
export class UserModule {
}
