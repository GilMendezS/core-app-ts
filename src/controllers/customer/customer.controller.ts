import { Request, Response } from "express";
import { createCustomer } from '../../services/customer/customer.service';

export async function addCustomer( req: Request, res: Response) {
    const customer = req.body;
    const newCustomer = await createCustomer( customer );
    return res.status( 201 ).json( {
        message: 'Customer created successfully',
        data: newCustomer,
    } )
}