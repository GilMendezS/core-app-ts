import express, { Router } from 'express';
const router: Router = express.Router();
import { verify, deleteSession } from '../controllers/auth/auth.controller';
import { handlerException } from '../middlewares/exception.middleware';
import { auth } from '../middlewares/jwt.middleware';
import LogiValidator from '../validators/login.validator';
import RequestValidator  from '../middlewares/validator.middleware';

router.post('/login', 
    LogiValidator.validate(),
    RequestValidator.handleValidationError,
    handlerException( verify ) );

router.post('/logout', auth, handlerException( deleteSession ) );

export default router;