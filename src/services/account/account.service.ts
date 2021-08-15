import { AccountModel } from "../../models/account";

export function getAccountById( id: number ) {
    return AccountModel.findByPk( id )
        .then( result => {
            return result;
        } )
        .catch( err => {
            throw new Error( 'Error fetching account' );
        } )
}