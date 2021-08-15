import express, { Router } from 'express';
const router: Router = express.Router();
import { addCustomer, createUser, account, updateCustomer } from '../controllers/customer/customer.controller';
import CustomerRequestValidator from '../validators/customer.validator';
import AccountRequestValidator from '../validators/account.validator';
import { handlerException } from '../middlewares/exception.middleware';
import RequestValidator  from '../middlewares/validator.middleware';
import UpdateCustomerSchema from '../validators/schemas/update-customer.schema';

router.post('/', 
    CustomerRequestValidator.validateCreateCustomer(),
    RequestValidator.handleValidationError,
    handlerException( addCustomer ) );

router.post( '/add-user',
    CustomerRequestValidator.validateCreateUser(),
    RequestValidator.handleValidationError,
    handlerException( createUser ))

router.post( '/add-account',
    AccountRequestValidator.validateCreateAccount(),
    RequestValidator.handleValidationError,
    handlerException( account ) )

router.patch( '/:id', 
    CustomerRequestValidator.validateUpdateCustomer(),
    RequestValidator.handleValidationError,
    handlerException( updateCustomer ),
)

export default router;
