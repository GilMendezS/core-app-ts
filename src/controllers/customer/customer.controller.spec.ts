import { Request, Response } from 'express';
import customerFixture from '../../jest/fixtures/customer.fixture';
import { addCustomer } from './customer.controller'
import { createCustomer } from '../../services/customer/customer.service';

jest.mock( '../../services/customer/customer.service');

describe( 'Customer Controller', () => {
    it( 'Should return 201 and customer data', async () => {
        const mockCreateCustomer = createCustomer as jest.Mock;
        mockCreateCustomer.mockImplementation( () => Promise.resolve( customerFixture ) )
        let responseObject = {};
        const request = {};
        const response: Partial<Response> = {
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockImplementation((JSONdata) => {
                    responseObject = JSONdata;
                })
            })
        }
        const expectedResponse = {
            message: 'Customer created successfully',
            data: customerFixture,
        }
        await addCustomer( request as Request , response as Response );
        expect( response.status ).toBeCalledWith( 201 )
        expect( responseObject ).toHaveProperty( 'message' )
        expect( responseObject ).toHaveProperty( 'data' );
        expect ( responseObject ).toEqual( expectedResponse );
    } )
} )