import PublicFile from "src/files/files.entity";
import PrivateFile from "src/privateFiles/privateFiles.entity";

export class UserDto{
    name: string;
    gender: string;
    id: number;
    email: string;
    password: string;
    avatarID?: number;
    files?: PrivateFile[];
    avatar?: PublicFile;
    refreshToken?: string
}