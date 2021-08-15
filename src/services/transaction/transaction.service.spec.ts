import { AccountModel } from '../../models/account';
import { TransactionResponse } from '../../models/interfaces/transaction.interface';
import { TransactionRequest } from '../../models/interfaces/transaction-request.interface';
import { mustBeRejected,
    getOriginAndDestination,
    validateAndTryToProcess } from './transaction.service';

import { getAccountById } from '../../services/account/account.service';
import { TransactionModel } from '../../models/transaction';
jest.mock( '../../services/account/account.service' );
jest.mock( '../../models/account' );
jest.mock( '../../models/transaction' );


describe( 'Test transaction service', () => {
    const dataToProcessATxn: TransactionRequest = {
        "origin_account": 1,
        "amount": 20.00,
        "destination_account": 8,
        "concept": "some concept",
        "reference": "GMS101"
    }
    beforeEach(  () => {
        jest.clearAllMocks();
    } )
    it( 'Should create a new transaction and return a succcess object', async() => {
        const mock = getAccountById as jest.Mock;
        mock.mockImplementation( (  ) => Promise.resolve( 
            { 
                id: 1, 
                customer_id: 1, 
                balance: 100000, 
                hasEnoughBalance: jest.fn().mockImplementation( () => true ),
                restBalance: jest.fn().mockImplementation( () => 100980 ),
                sumBalance: jest.fn().mockImplementation( () => 100020 )
            } ) );
        const accountModelMock = AccountModel.update  as jest.Mock;
        accountModelMock.mockImplementation( () => Promise.resolve( {} ) );
        const transactionModelMock = TransactionModel.create as jest.Mock;
        transactionModelMock.mockImplementation( () => Promise.resolve( {} ) );
        const transaction = await validateAndTryToProcess( dataToProcessATxn, 1, TransactionModel.TRANSFER_TYPE );
        const expected = {
            success: true,
            code: 200,
            message: 'Transaction completed.',
            data: {}
          };
        expect ( transaction ).toEqual( expected )
    } );
    it( 'Should throw an error if the database fails', async() => {
        const dataToProcessATxn: TransactionRequest = {
            "origin_account": 1,
            "amount": 20.00,
            "destination_account": 8,
            "concept": "some concept",
            "reference": "GMS101"
        }
        const mock = getAccountById as jest.Mock;
        mock.mockImplementation( (  ) => Promise.resolve( 
            { 
                id: 1, 
                customer_id: 1, 
                balance: 100000, 
                hasEnoughBalance: jest.fn().mockImplementation( () => true ),
                restBalance: jest.fn().mockImplementation( () => 100980 ),
                sumBalance: jest.fn().mockImplementation( () => 100020 )
            } ) );
        const accountModelMock = AccountModel.update  as jest.Mock;
        accountModelMock.mockImplementation( () => Promise.resolve( {} ) );
        const transactionModelMock = TransactionModel.create as jest.Mock;
        transactionModelMock.mockImplementation( () => Promise.reject( {} ) );
        await expect( async() => {
            await validateAndTryToProcess( dataToProcessATxn, 1, TransactionModel.TRANSFER_TYPE )
        } )
            .rejects.toThrow( 'Your transaction cannot be completed' )
        
    } );
    it( 'Should not reject the transaction, get a success result ', async () => {
        const fakeUser = 101;
        const origin = { id: 101, customer_id: 101 } as AccountModel;
        const destination = { id: 90 } as AccountModel;
        const result = await mustBeRejected( fakeUser, origin, destination );
        const expected: TransactionResponse = {
            code: 200,
            message: '',
            success: true,
            continue: true
        }
        expect( result ).toEqual( expected )
    } )
    it( 'Should reject the transaction - invalid origin account', async () => {
        const fakeUser = 101;
        const origin = {  } as AccountModel;
        const destination = { } as AccountModel;
        const result = await mustBeRejected( fakeUser, origin, destination );
        const expected: TransactionResponse = {
            code: 400,
            message: 'Your transaction cannot be completed. Invalid origin account',
            success: true,
            continue: false
        }
        expect( result ).toEqual( expected )
    } );
    it( 'Should reject the transaction - invalid destination account', async () => {
        const fakeUser = 101;
        const origin = { id: 101 } as AccountModel;
        const destination = { } as AccountModel;
        const result = await mustBeRejected( fakeUser, origin, destination );
        const expected: TransactionResponse = {
            code: 400,
            message: 'Your transaction cannot be completed. Invalid destination account',
            success: true,
            continue: false
        }
        expect( result ).toEqual( expected )
    } );
    it( 'Should reject the transaction - invalid destination account', async () => {
        const fakeUser = 90;
        const origin = { id: 101 } as AccountModel;
        const destination = { id: 100 } as AccountModel;
        const result = await mustBeRejected( fakeUser, origin, destination );
        const expected: TransactionResponse = {
            code: 401,
            message: 'Unauthorized',
            success: true,
            continue: false
        }
        expect( result ).toEqual( expected )
    } );
    it( 'Should return an object with accounts, origin and destination', async () => {
        const mock = getAccountById as jest.Mock;
        mock.mockImplementation( (  ) => Promise.resolve( { id: 1, customer_id: 1 } ) );
        const result = await getOriginAndDestination( 1, 2 );
        expect( typeof result ).toBe( 'object' )
        expect( result ).toHaveProperty( 'origin' );
        expect( result ).toHaveProperty( 'destination' );
    } );

} );