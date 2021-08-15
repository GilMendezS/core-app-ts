
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator'

class RequestValidator {
    handleValidationError( req: Request, res: Response, next: NextFunction ) {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( 400 )
            .json( {
                errors: errors.array().map( error => error.msg )
            } );
        }
        return next();
    }
}
export default new RequestValidator();