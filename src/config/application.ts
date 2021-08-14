import { Dialect } from 'sequelize';

import dotenv from 'dotenv';

class ApplicationEnvs {
    productionStage:string = 'production';
    constructor() {
        if ( process.env.NODE_ENV !== this.productionStage ) {
            dotenv.config();
        }
    }
    loadEnvs() {
        return {
            port: process.env.PORT || 3000,
            database: process.env.DATABASE_NAME ?? '',
            db_username: process.env.DATABASE_USERNAME ?? '',
            db_password: process.env.DATABASE_PASSWORD ?? '',
            db_host: process.env.DATABASE_HOST ?? '',
            db_port: process.env.DATABASE_PORT as unknown as number,
            db_dialect: process.env.DATABASE_DIALECT as Dialect
        }
    }

}

export default new ApplicationEnvs;