import express, { Router } from 'express';
const router: Router = express.Router();
import { addExternalAccount } from '../controllers/account/account.controller'
import { handlerException } from '../middlewares/exception.middleware';
import { auth } from '../middlewares/jwt.middleware';

router.post('/external', auth, handlerException( addExternalAccount ) );

export default router;