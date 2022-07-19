import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';


@Module({
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
  exports: [UserService]
})
export class UserModule {
}
