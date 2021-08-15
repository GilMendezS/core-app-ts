import express, { Request, Response, Router } from 'express';
import customerRoutes from './customer.routes';

const router: Router = express.Router();

const basePath = '/api/v1';

router.get( basePath , ( req: Request, res: Response ) => {
    return res.status( 200 ).json( {
        messsage: 'core app v1',
    } );
});

router.use( `${ basePath }/customers`, customerRoutes );

export default router;
