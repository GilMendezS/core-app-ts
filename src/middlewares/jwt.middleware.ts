import { NextFunction, Request, Response } from "express";
import { tokenIsAlreadyActive } from '../services/auth/auth.service';
import { verifyJWT } from '../services/jwt/jwt.service';

export async function auth(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization as string;
    const unauthorizedMessage = {
        message: 'Unauthorized'
    }
    if ( !authorization ) {
        res.statusCode = 401;
        return res.json( unauthorizedMessage )
    }
    const token = authorization.split( " " );
    const authenticatedUser = verifyJWT( token[1] );
    if ( !token[1] || !authenticatedUser ) {
        res.statusCode = 401;
        return res.json( unauthorizedMessage )
    }
    const canContinue = await tokenIsAlreadyActive( token[ 1 ] );
    if ( !canContinue ) {
        res.statusCode = 401;
        return res.json( unauthorizedMessage )
    }
    return next();
}