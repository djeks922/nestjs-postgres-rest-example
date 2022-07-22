import { Table, Column, Model, DataType, HasOne, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import PublicFile from 'src/files/files.entity';
import PrivateFile from 'src/privateFiles/privateFiles.entity';

@Table
export class User extends Model<User> {
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
}