import { Request, Response } from 'express';
import AccountAttributesI from '../../models/interfaces/account.interface';
import { addAccount } from '../../services/customer/customer.service';

export async function addExternalAccount( req: Request, res: Response ) : Promise<Response> {
    const account:AccountAttributesI = req.body as AccountAttributesI;
    account.external = true;
    const result = await addAccount( account, account.external );
    return res.status( 201 ).json( {
        message: 'The account was created successfully',
        data: result,
    } )
}