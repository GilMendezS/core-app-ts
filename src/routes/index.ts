import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/v1', ( req: Request, res: Response ) => {
    return res.status( 200 ).json( {
        messsage: 'core app v1',
    } );
});

export default router;

