import { Request, Response } from "express";
import BaseCustomer from '../../models/interfaces/basecustomer';
import AccountAttributesI from "../../models/interfaces/account.interface";
import CustomerAttributesI from "../../models/interfaces/customer.interface";
import  UserAttributes from '../../models/interfaces/user.interface';
import { createCustomer,
    addUser, addAccount,
    updateCustomerById,
    updateAddress } from '../../services/customer/customer.service';
import { deactivateByUserId } from '../../services/customer/user.service'

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
        message: 'The account was created successfully',
        data: result,
    } )
}
export async function updateCustomer( req:Request, res:Response ): Promise<Response> {
    const userId = req.params.id as unknown as number;
    const update: BaseCustomer = req.body;
    const updates: Promise<boolean> []=  [];
    if ( update.phone ) {
        updates.push( updateCustomerById( userId, { phone: update.phone } as CustomerAttributesI ) )
    }
    if ( update.address ) {
        updates.push( updateAddress( userId, update.address ) )
    }
    await Promise.allSettled( updates );
    
    return res.status( 200 ).json( {
        message: 'The customer was updated successfully',
    } );
}   

export async function deactivateUser( req: Request, res: Response ) {
    const userId = req.params.id;
    await deactivateByUserId( userId );
    return res.status( 200 ).json( {
        message: 'The user status was updated'
    } )
}