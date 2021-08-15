import { Request, Response } from "express";
import { validateAndTryToProcess } from '../../services/transaction/transaction.service'
import { getCustomerIdFromToken } from '../../services/jwt/jwt.service';
import { TransactionRequest } from "../../models/interfaces/transaction-request.interface";
import { TransactionModel } from "../../models/transaction";
import { TransactionResponse } from "../../models/interfaces/transaction.interface";

export async function transfer( req: Request, res: Response ): Promise<Response>{ 
    const data:TransactionRequest  = req.body;
    const token = req.headers.authorization as string;
    const user = getCustomerIdFromToken( token );
    const result: TransactionResponse = await validateAndTryToProcess( data, user, TransactionModel.TRANSFER_TYPE );
    if ( result.success ) {
        return res.status( result.code ).json( {
            message: result.message,
            data: result.data
        } );    
    }
    return res.status( result.code ).json( {
        message: result.message
    } );
    
}
export async function payment( req: Request, res: Response ): Promise<Response>{ 
    const data:TransactionRequest  = req.body;
    const token = req.headers.authorization as string;
    const user = getCustomerIdFromToken( token );
    const result = await validateAndTryToProcess( data, user, TransactionModel.PAYMENT_TYPE );
    if ( result.success ) {
        return res.status( result.code ).json( {
            message: result.message,
            data: result.data
        } );
    }
    return res.status( result.code ).json( {
        message: result.message
    } );
}