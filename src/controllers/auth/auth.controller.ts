import { Request, Response } from 'express';
import { login, logout  } from '../../services/auth/auth.service'
import JWTResponse from '../../services/auth/response';
import AuthRequest from '../../models/interfaces/auth.interface'
import { getCustomerIdFromToken } from '../../services/jwt/jwt.service'
export async function verify( req: Request, res: Response ) {
    const credentials: AuthRequest = req.body;
    
    const result:JWTResponse  = await login( credentials.username, credentials.password );
    if (  !result.success ) {
        return res.status( 401 ).json( { message: result.message } );    
    }
    return res.status( 200 ).json( {
        token: result.token
    } );
}
export async function deleteSession( req: Request, res: Response ) : Promise<Response> {
    const user = getCustomerIdFromToken( req.headers.authorization as string );
    await logout( user );    
    return res.status( 204 );
}