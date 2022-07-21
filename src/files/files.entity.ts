import { Table, Column, Model, DataType } from 'sequelize-typescript';


@Table
export default class PublicFile extends Model<PublicFile> {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public url: string;
   
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public key: string;
}