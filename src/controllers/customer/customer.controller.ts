import { Request, Response } from "express";
import AccountAttributesI from "../../models/interfaces/account.interface";
import  UserAttributes from '../../models/interfaces/user.interface';
import { createCustomer, addUser, addAccount } from '../../services/customer/customer.service';

export async function addCustomer( req: Request, res: Response) {
    const customer = req.body;
    const newCustomer = await createCustomer( customer );
    return res.status( 201 ).json( {
        message: 'Customer created successfully',
        data: newCustomer,
    } );
}
export async function createUser(req: Request, res: Response): Promise<Response> {
    const data:UserAttributes = req.body;
    const newUser = await addUser( data );
    return res.status( 201 ).json( {
        message: 'User created successfully',
        data: newUser,
    } );
}
export async function account( req: Request, res: Response ) : Promise<Response> {
    const data:AccountAttributesI = req.body;
    const result = await addAccount( data );
    return res.status( 201 ).json( {
        success: true,
        data: result,
    } )
}