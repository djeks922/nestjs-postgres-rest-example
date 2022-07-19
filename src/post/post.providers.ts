import { Post } from './post.entity';
import { POST_REPOSITORY } from '../constants';


export const postProviders = [
    {
        provide: POST_REPOSITORY,
        useValue: Post,
    }
]