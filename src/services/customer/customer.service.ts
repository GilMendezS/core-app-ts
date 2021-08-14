import database from '../../config/database.connection'
import { CustomerModel } from '../../models/customer';
import { AddressModel } from '../../models/address';
import { UserModel } from '../../models/user';
import CompleteCustomer from '../../models/interfaces/basecustomer';
import { hashPassword }  from '../password/password.service'


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
                console.log(err);
                throw new Error( "Error saving customer." );
        });
};
export function verifyRfc( rfc: string ) {
        return CustomerModel.findOne( { where: { rfc } } )
        .then( result => result )
        .catch( err => {
                throw new Error('Error validating RFC.')
        } );
};
export async function addUser( data ) {
    const hashedPassword = hashPassword( data.password );
    return database.transaction( (t) =>  {
        return UserModel.create( { ...data, password: hashedPassword } , { transaction: t })
            .then( (user) => {
                    return user;
                });
            })
            .catch(function (err) {
                console.log( err )
                throw new Error( "Error saving user." );
            });
}
export function findCustomerById( id: number ) {
    return CustomerModel.findByPk( id, {
            include: ['User']
    } )
        .then( result => result )
        .catch( err => {
                console.log( err )
                throw new Error( "Error fetching user." );
        } )
}