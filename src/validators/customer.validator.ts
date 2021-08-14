import { body } from 'express-validator';
import { verifyRfc } from '../services/customer/customer.service';

class CustomerRequestValidator {
    validateCreateCustomer() {
        return [
            body( 'first_name' ).notEmpty()
                .withMessage('The first_name field is required'),
            body( 'primary_last_name' ).notEmpty()
                .withMessage('The primary_last_name field is required'),
            body( 'second_last_name' ).notEmpty()
                .withMessage('The primary_last_name field is required'),
            body( 'phone' ).optional( { nullable: true, checkFalsy: true} )
                .matches( '^[0-9]{10}$' )
                .withMessage('The phone field just accepts 10 digits'),
            body( 'rfc' ).optional( { nullable: true, checkFalsy: true } )
                .custom( async value => {
                    const existsRfc = await verifyRfc( value );
                    if ( existsRfc ) {
                        return Promise.reject('RFC belongs to another user');
                    }
                } ),
            body( 'address.street' ).notEmpty()
                .withMessage('The address.street field is required'),
            body( 'address.number' ).notEmpty()
                .withMessage('The address.number field is required'),
            body( 'address.neighborhood' ).notEmpty()
                .withMessage('The address.neighborhood field is required'),
            body( 'address.state' ).notEmpty()
                .withMessage('The address.state field is required'),
            body( 'address.municipality' ).notEmpty()
                .withMessage('The address.municipality field is required'),
            body( 'address.country' ).notEmpty()
                .withMessage('The address.municipality field is required')
        ]
    }
};

export default new CustomerRequestValidator();
