import { SequelizeOptions } from "sequelize-typescript";
import { Dialect } from "sequelize/types";

export interface IDatabaseConfigAttributes extends SequelizeOptions {
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    port?: number;
    dialect?: Dialect;
    urlDatabase?: string;
}

export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
    test: IDatabaseConfigAttributes;
    production: IDatabaseConfigAttributes;
}