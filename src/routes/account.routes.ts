import express, { Router } from 'express';
const router: Router = express.Router();
import { addExternalAccount } from '../controllers/account/account.controller'
import { handlerException } from '../middlewares/exception.middleware';
import { auth } from '../middlewares/jwt.middleware';
import AccountValidator from '../validators/account.validator';
import RequestValidator  from '../middlewares/validator.middleware';


router.post('/external', auth, 
    AccountValidator.validateExternalAccount(),
    RequestValidator.handleValidationError,
    handlerException( addExternalAccount ) );

export default router;