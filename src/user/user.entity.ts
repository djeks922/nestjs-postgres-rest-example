import { Exclude } from 'class-transformer';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import PublicFile from 'src/files/files.entity';
import PrivateFile from 'src/privateFiles/privateFiles.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Table
export class User extends Model<User,CreateUserDto> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
    
    @BelongsTo(()=> PublicFile)
    avatar?: PublicFile;

    @ForeignKey(() => PublicFile)
    @Column({
        type: DataType.INTEGER
    })
    avatarID?: number

    @HasMany(() => PrivateFile)
    files: PrivateFile[]

    @Column({
        type: DataType.ENUM,
        values: ['male', 'female'],
        allowNull: false,
    })
    gender: string;

    @Exclude()
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    refreshToken: string;
}