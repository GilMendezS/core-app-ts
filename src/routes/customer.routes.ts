import express, { Router } from 'express';
const router: Router = express.Router();
import { addCustomer } from '../controllers/customer/customer.controller';
import { handlerException } from '../middlewares/exception.middleware';

router.post('/', handlerException( addCustomer ) );

export default router;
