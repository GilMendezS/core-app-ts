import { addUser, createCustomer } from './customer.service';
import { CustomerModel } from '../../models/customer';
import { UserModel } from '../../models/user';
import { AddressModel } from '../../models/address';
import customerFixture from '../../jest/fixtures/customer.fixture';
import userFixture from '../../jest/fixtures/user.fixture';
import UserAttributesI from '../../models/interfaces/user.interface';

jest.mock( '../../models/customer' );
jest.mock( '../../models/user' );
jest.mock( '../../models/address' );

describe( 'Test Customer service', () => {
    beforeEach( () => {
        jest.clearAllMocks();
    } )
    it( 'should create a new customer in DB', async() => {
        const customerModelMock = CustomerModel.create as jest.Mock;
        const addressModel = AddressModel.create as jest.Mock;
        customerFixture.id = 1001;
        customerModelMock.mockImplementation( () => Promise.resolve( customerFixture ) );
        
        addressModel.mockImplementation( () => Promise.resolve( customerFixture.address ) );
        
        const result = await createCustomer( customerFixture );
        
        expect( typeof result ).toEqual( 'object' );

        expect( result ).toHaveProperty( 'id' );
    } )
    it( 'should return an error if the service gets some database errors', async () => {
        const customerModelMock = CustomerModel.create as jest.Mock;
        customerModelMock.mockImplementation( () => Promise.reject( {} ) );
        await expect( async () => {
            await createCustomer( customerFixture );
        } ).rejects.toThrow( 'Error saving customer.' );
        
    } );
    it( 'Should create a new user and return a valid object', async () => {
        const userMock = UserModel.create as jest.Mock;
        userMock.mockImplementation( () => Promise.resolve( {} ) )
        const input = { password: 'secret' };
        const result:UserAttributesI = await addUser( input );
        expect( result ).not.toBeNull();
        expect( result.password ).not.toEqual( input.password  );
        expect( typeof result ).toEqual( 'object' )
    } )
    /*
    
    
    it( 'should return an error if the service can not save the user', async () => {
        const userMock = UserModel.create as jest.Mock;
        userMock.mockImplementation( () => Promise.reject( {} ) );
        
        await expect( async () => {
            await addUser( { username: 'someuser', 'password': "123123", "customer_id": 101 } );
        } ).rejects.toThrow( 'Error saving user.' );
        
    } )
    */
} );