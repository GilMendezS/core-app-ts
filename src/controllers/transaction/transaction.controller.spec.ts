import { Request, Response } from 'express';
import { payment, transfer } from './transaction.controller';

import {  validateAndTryToProcess } from '../../services/transaction/transaction.service';
import { TransactionResponse } from '../../models/interfaces/transaction.interface';

jest.mock( '../../services/transaction/transaction.service' );
describe( 'Test Transaction Controller', () => {
    const request: Partial<Request> = {
        body: {
            "origin_account": 1,
            "amount": 1000.00,
            "destination_account": 8,
            "concept": "some concept",
            "reference": "GMS101"
        },
        headers: {
            authorization: 'Bearer sometoken'
        }
    };
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it( 'Should return a success response with transaction data - transfer', async() => {
        const mockTransactionService = validateAndTryToProcess as jest.Mock;
        const fakeResponseFromService: TransactionResponse = {
            code: 200,
            success: true,
            message: 'Transaction completed.',
            data: {
                id: 101
            }
        }
        mockTransactionService.mockImplementation( () => Promise.resolve( fakeResponseFromService ) );

        let responseObject = {};
    
        const response: Partial<Response> = {
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockImplementation((JSONdata) => {
                    responseObject = JSONdata;
                })
            })
        }
        await transfer( request as Request , response as Response );

        expect( response.status ).toBeCalledWith( 200 );
        
        expect( responseObject ).toHaveProperty( 'message' )
        expect( responseObject ).toHaveProperty( 'data' )
    
    } );
    it( 'Should return an unsuccess response, rejected by non existence origin account', async() => {
        const mockTransactionService = validateAndTryToProcess as jest.Mock;
        const fakeResponseFromService: TransactionResponse = {
            code: 400,
            success: false,
            message: 'Your transaction cannot be completed. Invalid origin account'
        }
        mockTransactionService.mockImplementation( () => Promise.resolve( fakeResponseFromService ) );

        let responseObject = {};
        
        const response: Partial<Response> = {
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockImplementation((JSONdata) => {
                    responseObject = JSONdata;
                })
            })
        }
        await transfer( request as Request , response as Response );
        expect( mockTransactionService ).toBeCalled()
        expect( response.status ).toBeCalledWith( 400 );
        expect( responseObject ).toHaveProperty( 'message' );
        expect( responseObject ).toEqual( {message: fakeResponseFromService.message} )
    } );
    it( 'Should return an unsuccess response, rejected by non existence destination account', async() => {
        const mockTransactionService = validateAndTryToProcess as jest.Mock;
        const fakeResponseFromService: TransactionResponse = {
            code: 400,
            success: false,
            message: 'Your transaction cannot be completed. Invalid destination account'
        }
        mockTransactionService.mockImplementation( () => Promise.resolve( fakeResponseFromService ) );

        let responseObject = {};
        
        const response: Partial<Response> = {
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockImplementation((JSONdata) => {
                    responseObject = JSONdata;
                })
            })
        }
        await transfer( request as Request , response as Response );
        expect( mockTransactionService ).toBeCalled()
        expect( response.status ).toBeCalledWith( 400 );
        expect( responseObject ).toHaveProperty( 'message' );
        expect( responseObject ).toEqual( {message: fakeResponseFromService.message} )
    } );
    it( 'Should return an unsuccess response, Unauthorized request', async() => {
        const mockTransactionService = validateAndTryToProcess as jest.Mock;
        const fakeResponseFromService: TransactionResponse = {
            code: 401,
            success: false,
            message: 'Unauthorized'
        }
        mockTransactionService.mockImplementation( () => Promise.resolve( fakeResponseFromService ) );

        let responseObject = {};
        
        const response: Partial<Response> = {
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockImplementation((JSONdata) => {
                    responseObject = JSONdata;
                })
            })
        }
        await transfer( request as Request , response as Response );
        expect( mockTransactionService ).toBeCalled()
        expect( response.status ).toBeCalledWith( 401 );
        expect( responseObject ).toHaveProperty( 'message' );
        expect( responseObject ).toEqual( {message: fakeResponseFromService.message} )
    } );
} )
