import Sequelize from 'sequelize';
import { DbConfig } from './config.js';
import dotenv from '../util/dotenv.js';


export const sequelize = new Sequelize(
    DbConfig.database.database,
    DbConfig.database.username,
    DbConfig.database.password,
    {
        host: DbConfig.database.host,
        dialect: process.env.DIALECT,
        'logging': false,
    }
)

