
import { NextFunction, Request, Response } from 'express';
import { auth } from './jwt.middleware';
import { verifyJWT } from '../services/jwt/jwt.service';
import { tokenIsAlreadyActive } from '../services/auth/auth.service';


jest.mock( '../services/jwt/jwt.service' )
jest.mock( '../services/auth/auth.service' );

describe('JWT Authorization middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
        }
        jest.clearAllMocks()
    });

    test('should return 401, request without authorization header', async () => {
        const expectedResponse = {
            "message": "Unauthorized"
        };
        mockRequest = {
            headers: {
            }
        }
        await auth(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.statusCode).toBe( 401 );
        expect( mockResponse.json ).toBeCalledWith( expectedResponse );
    });
    test('Should return 401, with invalid "authorization" header', async () => {
        const expectedResponse = {
            "message": "Unauthorized"
        };
        mockRequest = {
            headers: {
                authorization: 'Bearer xyz'
            }
        }
        await auth(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.statusCode).toBe( 401 );
        expect( mockResponse.json ).toBeCalledWith( expectedResponse );
    });
    it( "Should continue the request if token is valid", async () => {
        const mockVerification = verifyJWT as jest.Mock;
        const mockVerifcationInDb = tokenIsAlreadyActive as jest.Mock;
        mockVerification.mockImplementation( () => true )
        mockVerifcationInDb.mockImplementation( () => Promise.resolve( true ) )
        mockRequest = {
            headers: {
                authorization: 'Bearer validtoken'
            }
        }
        await auth(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledTimes(1);
    } )
});