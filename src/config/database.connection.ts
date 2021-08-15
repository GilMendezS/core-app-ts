import { Sequelize } from 'sequelize';
import AppConfig from './application';

const db: Sequelize = new Sequelize(
    AppConfig.loadEnvs().database,
    AppConfig.loadEnvs().db_username,
    AppConfig.loadEnvs().db_password,
    {
        host: AppConfig.loadEnvs().db_host,
        port: AppConfig.loadEnvs().db_port,
        dialect: AppConfig.loadEnvs().db_dialect,
        logging: false
    },
);

export default db;