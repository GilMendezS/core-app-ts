import { Request, Response } from 'express';
import customerFixture from '../../jest/fixtures/customer.fixture';
import userFixture from '../../jest/fixtures/user.fixture';
import accountFixture from '../../jest/fixtures/account.fixture'
import { account, addCustomer, createUser, updateCustomer } from './customer.controller'
import { createCustomer, addUser, addAccount, updateCustomerById, updateAddress } from '../../services/customer/customer.service';

jest.mock( '../../services/customer/customer.service');

describe( 'Customer Controller', () => {
    beforeEach( () => {
        jest.clearAllMocks();
    } )
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
    it( 'should return 200 and update just the phone', async () => {
        const mockUpdateCustomer = updateCustomerById as jest.Mock;
        mockUpdateCustomer.mockImplementation( () => Promise.resolve( true ) )
        let responseObject = {};
        const request: Partial<Request> = {
            params: {
                id: "101"
            },
            body: {
                phone: "3321231230"
            }
        };
        const response: Partial<Response> = {
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockImplementation((JSONdata) => {
                    responseObject = JSONdata;
                })
            })
        }
        const expectedResponse = {
            message: 'The customer was updated successfully'
        }
        await updateCustomer( request as Request , response as Response );
        expect( response.status ).toBeCalledWith( 200 )
        expect( responseObject ).toHaveProperty( 'message' )
        expect( mockUpdateCustomer ).toBeCalled();
        expect ( responseObject ).toEqual( expectedResponse );
    } );
    it( 'should return 200 and update just the address', async () => {
        const mockUpdateCustomer = updateCustomerById as jest.Mock;
        const mockUpdateAddress = updateAddress as jest.Mock;
        mockUpdateCustomer.mockImplementation( () => Promise.resolve( true ) )
        mockUpdateAddress.mockImplementation( () => Promise.resolve( true ) )
        let responseObject = {};
        const request: Partial<Request> = {
            params: {
                id: "101"
            },
            body: {
                address: {
                    street: "new street from test"
                }
            }
        };
        const response: Partial<Response> = {
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockImplementation((JSONdata) => {
                    responseObject = JSONdata;
                })
            })
        }
        const expectedResponse = {
            message: 'The customer was updated successfully'
        }
        await updateCustomer( request as Request, response as Response );
        expect( response.status ).toBeCalledWith( 200 );
        expect( mockUpdateCustomer ).not.toBeCalled();
        expect( mockUpdateAddress ).toBeCalled();
        expect( responseObject ).toHaveProperty( 'message' )
        expect ( responseObject ).toEqual( expectedResponse );
    } );
    it( 'should return 200 and update the address and phone of customer', async () => {
        const mockUpdateCustomer = updateCustomerById as jest.Mock;
        const mockUpdateAddress = updateAddress as jest.Mock;
        mockUpdateCustomer.mockImplementation( () => Promise.resolve( true ) )
        mockUpdateAddress.mockImplementation( () => Promise.resolve( true ) )
        let responseObject = {};
        const request: Partial<Request> = {
            params: {
                id: "101"
            },
            body: {
                phone: "3329019011",
                address: {
                    street: "new street from test"
                }
            }
        };
        const response: Partial<Response> = {
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockImplementation((JSONdata) => {
                    responseObject = JSONdata;
                })
            })
        }
        const expectedResponse = {
            message: 'The customer was updated successfully'
        }
        await updateCustomer( request as Request, response as Response );
        expect( response.status ).toBeCalledWith( 200 );
        expect( mockUpdateCustomer ).toBeCalled();
        expect( mockUpdateAddress ).toBeCalled();
        expect( responseObject ).toHaveProperty( 'message' )
        expect ( responseObject ).toEqual( expectedResponse );
    } );
} )