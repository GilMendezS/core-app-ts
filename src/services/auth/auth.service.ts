import { check } from 'express-validator';
import { getUserByUsername, updateUser, checkToken } from '../customer/user.service';
import { comparePassword } from '../hash/hash.service'
import { generateJWT } from '../jwt/jwt.service';
import JWTResponse from './response'

export async function login( username: string, password: string ) {
    const user = await getUserByUsername( username );
    const response: JWTResponse= {
        success: false,
        message: 'Invalid credentials'
    }
    if ( user ) {
        if ( user.active_session ) {
            response.message = 'The user already has an active session';
            return response;
        }
        if ( user.status == 'inactive' ) {
            response.message = 'The account is locked';
            return response;
        }
        const validPassword = comparePassword( password, user.password ); 
        if ( validPassword ) {
            const token = generateJWT( user );
            user.active_session = true;
            user.token = token;
            await user.save()
            response.token = token;
            response.success = true;
            return response;
        }
    }
    return response;
}
export async function logout( customerId: number ) {
    const result = await updateUser( { active_session: false, token: null }, customerId )
    return {
        success: true,
        message: 'Session was deleted',
    }
}
export async function tokenIsAlreadyActive( token: string ) {
    const result = await checkToken( token );
    if ( !result ) {
        return false;
    }
    if ( result.token !== token ) {
        return false;
    }
    return true;
}