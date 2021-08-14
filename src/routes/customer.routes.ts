import express, { Router } from 'express';
const router: Router = express.Router();
import { addCustomer } from '../controllers/customer/customer.controller';
import CustomerRequestValidator from '../validators/customer.validator';
import { handlerException } from '../middlewares/exception.middleware';
import RequestValidator  from '../middlewares/validator.middleware';

router.post('/', 
    CustomerRequestValidator.validateCreateCustomer(),
    RequestValidator.handleValidationError,
    handlerException( addCustomer ) );

export default router;
