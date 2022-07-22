import { Sequelize } from 'sequelize-typescript';
import PublicFile from 'src/files/files.entity';
import { Post } from 'src/post/post.entity';
import PrivateFile from 'src/privateFiles/privateFiles.entity';
import { User } from 'src/user/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { IDatabaseConfigAttributes } from './interfaces/dbConfig.interface';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config: IDatabaseConfigAttributes;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.options.logging = Boolean(process.env.DB_LOGGING)
        sequelize.addModels([User,Post,PublicFile,PrivateFile]);
        await sequelize.sync();
        return sequelize;
    },
}];