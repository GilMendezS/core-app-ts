import { body } from 'express-validator';
import { findCustomerById } from '../services/customer/customer.service';

class AccountValidator {
    validateCreateAccount() {
        return [
            body( 'account_number' ).notEmpty()
                .withMessage( 'The account_number field is required' )
                .isLength( { min: 17, max: 17 } )
                .withMessage( 'Account number must be 17 digits' ),
            body( 'product_id' ).notEmpty()
                .withMessage( 'The product_id field is required' ).bail()
                .isIn( [ 1, 2, 3] )
                .withMessage( 'Invalid product_id' ).bail(),
            body( 'balance' ).notEmpty()
            .withMessage( 'The account_number field is required' ).bail()
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
            .withMessage( 'The nip field is required' ).bail()
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