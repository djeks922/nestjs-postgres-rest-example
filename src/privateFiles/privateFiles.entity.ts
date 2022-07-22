import { Column, Table, DataType, ForeignKey, BelongsTo, Model} from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

 
@Table
class PrivateFile extends Model<PrivateFile>{
 
  @Column({
    type: DataType.STRING
  })
  public key: string;
 
  @ForeignKey(() => User)
  @Column({type:DataType.NUMBER})
  userId: number

  @BelongsTo(() => User)
  user: User
}
 
export default PrivateFile;