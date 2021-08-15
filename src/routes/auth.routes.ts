import express, { Router } from 'express';
const router: Router = express.Router();
import { verify, deleteSession } from '../controllers/auth/auth.controller'
import { handlerException } from '../middlewares/exception.middleware'
import { auth } from '../middlewares/jwt.middleware';
router.post('/login', handlerException( verify ) );

router.post('/logout', auth, handlerException( deleteSession ) );

export default router;