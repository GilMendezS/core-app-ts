import { createCustomer } from './customer.service';
import { CustomerModel } from '../../models/customer';
import { AddressModel } from '../../models/address';
import customerFixture from '../../jest/fixtures/customer.fixture';

jest.mock( '../../models/customer' );
jest.mock( '../../models/address' );

describe( 'Test Customer service', () => {
    it( 'should create a new customer in DB', async() => {
        const cusomerModelMock = CustomerModel.create as jest.Mock;
        const addressModel = AddressModel.create as jest.Mock;
        customerFixture.id = 1001;
        cusomerModelMock.mockImplementation( () => Promise.resolve( customerFixture ) );
        
        addressModel.mockImplementation( () => Promise.resolve( customerFixture.address ) );
        
        const result = await createCustomer( customerFixture );
        
        expect( typeof result ).toEqual( 'object' );

        expect( result ).toHaveProperty( 'id' );
    } )
    it.only( 'should return an error if the service gets some database errors', async () => {
        const cusomerModelMock = CustomerModel.create as jest.Mock;
        
        cusomerModelMock.mockImplementation( () => Promise.reject( {} ) );
        
        await expect( async () => {
            await createCustomer( customerFixture );
        } ).rejects.toThrow( 'Error saving customer.' );
        
    } )
} );