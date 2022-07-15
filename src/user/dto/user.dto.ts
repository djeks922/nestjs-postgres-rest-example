import {IsString,IsNumber} from 'class-validator'

export class UserDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
    
    @IsString()
    lastname: string;

}
