import database from '../../config/database.connection'
import { CustomerModel } from '../../models/customer';
import { AddressModel } from '../../models/address';
import CompleteCustomer from '../../models/interfaces/basecustomer';

export function createCustomer( data ) {
    let newCustomer: CompleteCustomer;
    return database.transaction( (t) =>  {
        return CustomerModel.create( data , { transaction: t, raw: true })
            .then( (customer) => {
                newCustomer = customer;
                return AddressModel.create( { ...data.address, customer_id: customer.id } , { transaction: t });
        });
        }).then((address ) => {
                newCustomer.address = address;
                return newCustomer;
        }).catch(function (err) {
                throw new Error( "Error saving customer." );
        });
}
export function verifyRfc( rfc: string ) {
        return CustomerModel.findOne( { where: { rfc } } )
        .then( result => result )
        .catch( err => {
                throw new Error('Error validating RFC.')
        } );
}