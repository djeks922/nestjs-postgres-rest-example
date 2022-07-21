import { FILE_REPOSITORY } from '../constants';
import PublicFile from './files.entity';

export const filesProviders = [{
    provide: FILE_REPOSITORY,
    useValue: PublicFile,
}];