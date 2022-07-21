import { Module } from "@nestjs/common";
import { filesProviders } from "./files.providers";
import { FilesService } from "./files.service";



@Module({
    providers: [FilesService,...filesProviders],
    exports: [FilesService]
})
export class FilesModule{}