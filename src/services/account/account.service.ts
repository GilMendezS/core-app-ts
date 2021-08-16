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
export function getAccountByNumber( account: string ) {
    return AccountModel.findOne({ where: { account_number: account } } )
        .then( result => {
            return result;
        } )
        .catch( err => {
            throw new Error( 'Error fetching account' );
        } )
}