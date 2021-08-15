import database from '../../config/database.connection'
import { CustomerModel } from '../../models/customer';
import { AddressModel } from '../../models/address';
import { UserModel } from '../../models/user';
import CompleteCustomer from '../../models/interfaces/basecustomer';
import { generateHash }  from '../hash/hash.service';
import { AccountModel } from '../../models/account';
import AccountAttributesI from '../../models/interfaces/account.interface';
import { updateCustomer } from '../../controllers/customer/customer.controller';
import AddressAttributesI from '../../models/interfaces/address.interface';

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
};
export function verifyRfc( rfc: string ) {
        return CustomerModel.findOne( { where: { rfc } } )
        .then( result => result )
        .catch( err => {
                throw new Error('Error validating RFC.')
        } );
};
export async function addUser( data ) {
    const hashedPassword = generateHash( data.password );
    return database.transaction( (t) =>  {
        return UserModel.create( { ...data, password: hashedPassword } , { transaction: t })
            .then( (user) => {
                    return user;
                });
            })
            .catch(function (err) {
                throw new Error( "Error saving user." );
            });
}
export function findCustomerById( id: number ) {
    return CustomerModel.findByPk( id )
        .then( result => result )
        .catch( err => {
                throw new Error( "Error fetching customer." );
        } )
}
export function addAccount( data: AccountAttributesI, external = false ) {
    if ( !external ) {
        data.nip = generateHash( data.nip as string ) as string;
    }
    return database.transaction( (t) =>  {
        return AccountModel.create( data , { transaction: t })
            .then( (account) => {
                return account;
        })
    })
    .catch(function (err) {
        throw new Error( "Error saving account." );
    });
}
export function updateCustomerById(id: number, data: CompleteCustomer) {
    return database.transaction( ( t ) => {
        return CustomerModel.update( data, { where: { id }, transaction: t, returning: true } )
            .then( ( updated ) => {
                return true;
            } );
        } )
        .catch( err => {
            throw new Error( 'Error updating customer' );
        } )
}
export function updateAddress( customer_id: number, address: AddressAttributesI ) {
    return database.transaction( ( t ) => {
        return AddressModel.update( address , { where: { customer_id }, transaction: t, returning: true } )
            .then( ( updated ) => {
                return true;
            } );
        } )
        .catch( err => {
            throw new Error( 'Error updating address' );
        } )
}