import express, { Request, Response, Router } from 'express';
import customerRoutes from './customer.routes';
import authRoutes from './auth.routes';
import accountRoutes from './account.routes';
import transactionRoutes from './transactions.routes';

const router: Router = express.Router();

const basePath = '/api/v1';

router.get( basePath , ( req: Request, res: Response ) => {
    return res.status( 200 ).json( {
        messsage: 'core app v1',
    } );
});

router.use( `${ basePath }/customers`, customerRoutes );
router.use( `${ basePath }/auth`, authRoutes );
router.use( `${ basePath }/accounts`, accountRoutes );
router.use( `${ basePath }/transactions`, transactionRoutes );

export default router;

