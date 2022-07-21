import { Request } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/user.entity';

 
interface RequestWithUser extends Request {
  user: Omit<UserDto,'password'>;
}
 
export default RequestWithUser;