import { Module } from "@nestjs/common";
import { filesPrivateProviders } from "./privateFiles.providers";
import { PrivateFilesService } from "./privateFiles.service";



@Module({
    providers: [PrivateFilesService,...filesPrivateProviders],
    exports: [PrivateFilesService]
})
export class PrivateFilesModule{}