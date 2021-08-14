import express, { Application } from 'express';
import morgan from 'morgan';
import cors  from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import routes from './routes/index';

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
        this.errorHandlers();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use( cors() );

    }
    private errorHandlers() {
        this.app.use( errorHandler );
        this.app.use( notFoundHandler );
    }
    private routes() {
        this.app.use( routes )
    }
    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}