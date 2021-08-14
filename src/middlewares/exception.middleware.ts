import { NextFunction, Request, Response } from "express";

export const handlerException = fn => ( req: Request, res: Response, next: NextFunction ) => {
    fn( req, res ).catch( (error: Error) => next( error ) );
};