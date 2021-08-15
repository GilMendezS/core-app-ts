import { Request, Response } from 'express';
import customerFixture from '../../jest/fixtures/customer.fixture';
import userFixture from '../../jest/fixtures/user.fixture';
import accountFixture from '../../jest/fixtures/account.fixture'
import { account, addCustomer, createUser } from './customer.controller'
import { createCustomer, addUser, addAccount } from '../../services/customer/customer.service';

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
    } );
    it( 'should return 201 when a new user is created', async () => {
        const mockCreateCustomer = addUser as jest.Mock;
        mockCreateCustomer.mockImplementation( () => Promise.resolve( userFixture ) )
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
            message: 'User created successfully',
            data: userFixture,
        }
        await createUser( request as Request , response as Response );
        expect( response.status ).toBeCalledWith( 201 )
        expect( responseObject ).toHaveProperty( 'message' )
        expect( responseObject ).toHaveProperty( 'data' );
        expect( responseObject ).toHaveProperty( 'data.username' )
        expect( responseObject ).toHaveProperty( 'data.id' )
        expect ( responseObject ).toEqual( expectedResponse );
    } );
    it( 'should return 201 when a new account is created', async () => {
        const mockCreateCustomer = addAccount as jest.Mock;
        mockCreateCustomer.mockImplementation( () => Promise.resolve( accountFixture ) )
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
            message: 'The account was created successfully',
            data: accountFixture,
        }
        await account( request as Request , response as Response );
        expect( response.status ).toBeCalledWith( 201 )
        expect( responseObject ).toHaveProperty( 'message' )

        expect( responseObject ).toHaveProperty( 'data' );

        expect ( responseObject ).toEqual( expectedResponse );
    } );
} )