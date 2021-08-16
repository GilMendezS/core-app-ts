import { body } from 'express-validator';
import { verifyRfc, findCustomerById } from '../services/customer/customer.service';
import { getUserByUsername } from '../services/customer/user.service'
class CustomerRequestValidator {
    validateCreateCustomer() {
        return [
            body( 'first_name' ).notEmpty()
                .withMessage('The first_name field is required'),
            body( 'primary_last_name' ).notEmpty()
                .withMessage('The primary_last_name field is required'),
            body( 'second_last_name' ).notEmpty()
                .withMessage('The second_last_name field is required'),
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
                .withMessage('The address.country field is required')
        ]
    }
    validateCreateUser() {
        return [
            body( 'customer_id' ).notEmpty()
                .withMessage( 'The customer_id field is required' ).bail()
                .custom( async value => {
                    const customer = await findCustomerById( value );
                    if ( !customer ) {
                        return Promise.reject('Invalid customer_id, customer doesnt exists');
                    }
                    const hasUserAccount = await customer.hasUser();
                    if ( hasUserAccount ) {
                        return Promise.reject('The customer already has an user');
                    }
                } ),
            body( 'username' ).notEmpty()
                .withMessage( 'The username field is required' ).bail()
                .isLength({ min:5 })
                .withMessage( 'The username field must be at least 5 characters' )
                .custom( async username => {
                    const user = await getUserByUsername( username );
                    if ( user ) {
                        return Promise.reject('Username already in use');
                    }
                } ),
            body( 'password' ).notEmpty()
                .withMessage( 'The password field is required' ).bail()
                .isLength( { min: 6 } )
                .withMessage( `The password field must be at least 6 characters`),
        ]
    }
    validateUpdateCustomer() {
        return [
            body( 'phone' ).optional( { nullable: true, checkFalsy: true} )
                .matches( '^[0-9]{10}$' )
                .withMessage('The phone field just accepts 10 digits'),
                body( 'adddress' ).optional( { nullable: true, checkFalsy: true} ),
                body( 'address.street' ).optional( { nullable: true, checkFalsy: true} )
                    .isLength( { max: 254 } )
                    .withMessage('The address.street must be alphanumeric'),
                body( 'address.number' ).optional( { nullable: true, checkFalsy: true} )
                    .isLength( { max: 254 } )
                    .withMessage('The address.number must be alphanumeric'),
                body( 'address.neighborhood' ).optional( { nullable: true, checkFalsy: true} )
                    .isLength( { max: 254 } )
                    .withMessage('The address.neighborhood must be alphanumeric'),
                body( 'address.state' ).optional( { nullable: true, checkFalsy: true} )
                    .isLength( { max: 254 } )
                    .withMessage('The address.state must be alphanumeric'),
                body( 'address.municipality' ).optional( { nullable: true, checkFalsy: true} )
                    .isLength( { max: 254 } )
                    .withMessage('The address.municipality must be alphanumeric'),
                body( 'address.country' ).optional( { nullable: true, checkFalsy: true} )
                    .isLength( { max: 254 } )
                    .withMessage('The address.municipality must be alphanumeric')
        ];
    }
};

export default new CustomerRequestValidator();
