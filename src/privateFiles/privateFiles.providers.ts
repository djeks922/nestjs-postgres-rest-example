import { FILE_PRIVATE_REPOSITORY } from '../constants';
import PrivateFile from './privateFiles.entity';

export const filesPrivateProviders = [{
    provide: FILE_PRIVATE_REPOSITORY,
    useValue: PrivateFile,
}];