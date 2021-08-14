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
        }
    }

}

export default new ApplicationEnvs;