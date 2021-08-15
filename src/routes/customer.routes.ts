import express, { Router } from 'express';
const router: Router = express.Router();
import { addCustomer,
    createUser,
    account,
    updateCustomer,
    deactivateUser } from '../controllers/customer/customer.controller';
import CustomerRequestValidator from '../validators/customer.validator';
import AccountRequestValidator from '../validators/account.validator';
import { handlerException } from '../middlewares/exception.middleware';
import RequestValidator  from '../middlewares/validator.middleware';
import { auth } from '../middlewares/jwt.middleware';

router.post('/',
    auth,
    CustomerRequestValidator.validateCreateCustomer(),
    RequestValidator.handleValidationError,
    handlerException( addCustomer ) );

router.post( '/add-user',
    auth,
    CustomerRequestValidator.validateCreateUser(),
    RequestValidator.handleValidationError,
    handlerException( createUser ))

router.post( '/add-account',
    auth,
    AccountRequestValidator.validateCreateAccount(),
    RequestValidator.handleValidationError,
    handlerException( account ) )

router.patch( '/:id', 
    auth,
    CustomerRequestValidator.validateUpdateCustomer(),
    RequestValidator.handleValidationError,
    handlerException( updateCustomer ),
)
router.patch( '/:id/lock',
    auth,
    handlerException( deactivateUser  ) );

export default router;
