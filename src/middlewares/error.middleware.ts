import { Request, Response, NextFunction } from 'express';
import HttpException from '../common/http-exception';

export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    const status = error.statusCode || error.status || 500;
    const message = error.message || 'something went wrong';
    response.status( status ).send( {
        message
    } );
}