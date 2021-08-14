import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const message:string = "Not Found";
    response.status( 404 ).json( {
        message,
    } );
}