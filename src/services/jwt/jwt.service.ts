import jwt, { JwtPayload } from 'jsonwebtoken';

import AppEnvs from '../../config/application';

import { JWTPayload } from '../../models/interfaces/jwt.interface'
export function generateJWT( data ): string {
    const token = jwt.sign( {
        username: data.username,
        customer_id: data.customer_id,
    }, AppEnvs.loadEnvs().secret_jwt_hash );
    return token;
};
export function verifyJWT( token: string ): JwtPayload | boolean {
    try {
        const verified =  jwt.verify( token, AppEnvs.loadEnvs().secret_jwt_hash ) as JwtPayload;
        return verified;
    } catch {
         return false;
     }
}
export function getCustomerIdFromToken( token: string ) {
    const data = verifyJWT( token.split(" ")[1] ) as JWTPayload;
    return data.customer_id;
}