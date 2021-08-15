import { NextFunction, Request, Response } from "express";
import { tokenIsAlreadyActive } from '../services/auth/auth.service';
import { verifyJWT } from '../services/jwt/jwt.service';

export async function auth(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization as string;
    const unauthorizedMessage = {
        message: 'Unauthorized'
    }
    if ( !authorization ) {
        return res.status( 401 ).json( unauthorizedMessage )
    }
    const token = authorization.split( " " );
    const authenticatedUser = verifyJWT( token[1] );
    if ( token[1] && !authenticatedUser ) {
        return res.status( 401 ).json( unauthorizedMessage )
    }
    const canContinue = await tokenIsAlreadyActive( token[ 1 ] );
    if ( !canContinue ) {
        return res.status( 401 ).json( unauthorizedMessage )
    }
    return next();
}