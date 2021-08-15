import { Request, Response } from 'express';
import { JWTPayload } from '../../models/interfaces/jwt.interface';

import { login, logout } from '../../services/auth/auth.service';
import { verify } from './auth.controller'

jest.mock( '../../services/auth/auth.service' );

describe( 'Test Auth Controller', () => {
    const loginMock = login as jest.Mock;
    const request: Partial<Request> = {
        body: {
            username: "username",
            password: "somePassword",
        },
    };
    beforeEach( () => {
        jest.clearAllMocks();
    } )
    it( 'Should return status 200 and a new token', async () => {
        const fakeToken = { token: 'sometoken', success: true };  
        loginMock.mockImplementation( () => Promise.resolve( fakeToken ) )
        let responseObject = {};
        const response: Partial<Response> = {
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockImplementation((JSONdata) => {
                    responseObject = JSONdata;
                })
            })
        }
        const expectedResponse = {
            token: fakeToken.token
        }
        await verify( request as Request, response as Response );
        expect( response.status ).toBeCalledWith( 200 )
        expect( responseObject ).toHaveProperty( 'token' )
        expect ( responseObject ).toEqual( expectedResponse );
    } );
    it( 'Should return status 401, invalid username', async () => {
        const invalidUsernameResponse = {
            success: false,
            message: 'Invalid credentials'
        } 
        loginMock.mockImplementation( () => Promise.resolve( invalidUsernameResponse ) )
        let responseObject = {};
        const response: Partial<Response> = {
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockImplementation((JSONdata) => {
                    responseObject = JSONdata;
                })
            })
        }
        const expectedResponse = {
            message: invalidUsernameResponse.message
        }
        await verify( request as Request, response as Response );
        expect( response.status ).toBeCalledWith( 401 )
        expect( responseObject ).toHaveProperty( 'message' )
        expect ( responseObject ).toEqual( expectedResponse );
    } );
} )