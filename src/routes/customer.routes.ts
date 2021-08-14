import express, { Router } from 'express';
const router: Router = express.Router();
import { addCustomer, createUser } from '../controllers/customer/customer.controller';
import CustomerRequestValidator from '../validators/customer.validator';
import { handlerException } from '../middlewares/exception.middleware';
import RequestValidator  from '../middlewares/validator.middleware';

router.post('/', 
    CustomerRequestValidator.validateCreateCustomer(),
    RequestValidator.handleValidationError,
    handlerException( addCustomer ) );

router.post( '/add-user',
    handlerException( createUser ))

export default router;
