import { Request } from 'express';
import { UserDto } from 'src/user/dto/user.dto';

 
export interface RequestWithUser extends Request {
  user: Omit<UserDto,'password'>;
}
 