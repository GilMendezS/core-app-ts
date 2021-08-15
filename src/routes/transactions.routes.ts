import express, { Router } from 'express';

const router: Router = express.Router();

import { transfer, payment } from '../controllers/transaction/transaction.controller'

import { handlerException } from '../middlewares/exception.middleware';

import { auth } from '../middlewares/jwt.middleware';

router.post('/transfer', auth, handlerException( transfer ) );

router.post('/payment', auth, handlerException( payment ) );

export default router;