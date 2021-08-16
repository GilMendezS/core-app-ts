import { body } from 'express-validator';
import { findCustomerById } from '../services/customer/customer.service';
import { getAccountByNumber } from '../services/account/account.service'

class AccountValidator {
    validateCreateAccount() {
        return [
            body( 'account_number' ).notEmpty()
                .withMessage( 'The account_number field is required' ).bail()
                .isLength( { min: 17, max: 17 } )
                .withMessage( 'Account number must be 17 digits' ).bail()
                .custom( async ( account ) => {
                    const taken = await getAccountByNumber( account );
                    if ( taken ) {
                        return Promise.reject( "Account number already in use." )
                    }
                } ),
            body( 'product_id' ).notEmpty()
                .withMessage( 'The product_id field is required' ).bail()
                .isIn( [ 1, 2, 3] )
                .withMessage( 'Invalid product_id' ).bail(),
            body( 'balance' ).notEmpty()
            .withMessage( 'The balance field is required' ).bail()
            .isDecimal(  ).withMessage( 'Th¿e field balance has an invalid format' ),
            body( 'status' ).notEmpty( )
                .withMessage( 'The status field is required' ).bail()
                .isIn( [ 'active', 'inactive'] )
                .withMessage( 'Invalid status' ),
            body( 'nip' ).exists()
                .withMessage( 'The nip field is required' ).bail()
                .isLength( {min: 3, max: 4 } )
                .withMessage( 'The nip field has an invalid lenght' ),
            body( 'customer_id' ).exists()
            .withMessage( 'The customer_id field is required' ).bail()
            .custom( async customer_id => {
                const customer = await findCustomerById( customer_id );
                if ( !customer ) {
                    return Promise.reject( 'The customer doesnt exists' )
                }
            } )
        ]
    }
    validateExternalAccount() {
        return [
            body( 'account_number' ).notEmpty()
                .withMessage( 'The account_number field is required' ).bail()
                .isLength( { min: 17, max: 17 } )
                .withMessage( 'Account number must be 17 digits' ).bail()
                .custom( async ( account ) => {
                    const taken = await getAccountByNumber( account );
                    if ( taken ) {
                        return Promise.reject( "Account number already in use." )
                    }
                } ),
            body( 'product_id' ).notEmpty()
                .withMessage( 'The product_id field is required' ).bail()
                .isIn( [ 1, 2, 3] )
                .withMessage( 'Invalid product_id' ).bail(),
            body( 'status' ).notEmpty( )
                .withMessage( 'The status field is required' ).bail()
                .isIn( [ 'active', 'inactive'] )
                .withMessage( 'Invalid status' ),
            body( 'customer_id' ).exists()
            .withMessage( 'The customer_id field is required' ).bail()
            .custom( async customer_id => {
                const customer = await findCustomerById( customer_id );
                if ( !customer ) {
                    return Promise.reject( 'The customer doesnt exists' )
                }
            } )
        ]
    }
}
export default new AccountValidator;