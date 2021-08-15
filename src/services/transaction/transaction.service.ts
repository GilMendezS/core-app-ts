import { AccountModel } from '../../models/account';
import { TransactionModel } from '../../models/transaction';
import database from '../../config/database.connection'
import { TransactionAttibutes, TransactionResponse } from '../../models/interfaces/transaction.interface';
import { TransactionRequest } from '../../models/interfaces/transaction-request.interface';

export function getAccountById( id: number ) {
    return AccountModel.findByPk( id )
        .then( result => {
            return result;
        } )
        .catch( err => {
            throw new Error( 'Error fetching origin account' );
        } )
}
export function mustBeRejected( user, origin: AccountModel, destination:AccountModel ) {
    const result: TransactionResponse = {
        code: 400,
        message: '',
        success: true,
        continue: true
    }
    if ( !origin ) {
        result.message = 'Your transaction cannot be completed. Invalid origin account';
        result.continue = false;
        return result;
    }
    if ( !destination ) {
        result.message = 'Your transaction cannot be completed. Invalid destination account';
        result.continue = false;
        return result;
    }
    if ( origin?.customer_id !== user ) {
        result.code =  401,
        result.message = 'Unauthorized';
        result.continue = false;
        return result;
    }
    return result;
}
export async function getOriginAndDestination( originId:number, destinationId: number  ) {
    const [ origin, destination ] = await Promise.all( 
        [ 
            getAccountById( originId ),
            getAccountById( destinationId )
        ] ) as AccountModel[];
    return {
        origin,
        destination
    };
}

export async function validateAndTryToProcess( data: TransactionRequest, user: number, txnType: string ) {
    const accounts = await getOriginAndDestination( data.origin_account, data.destination_account );
    const canBeProcessed = mustBeRejected( user, accounts.origin, accounts.destination);
    if ( !canBeProcessed?.continue ) {
        return canBeProcessed;
    }
    const txn: TransactionAttibutes = {
        customer_id: user,
        origin_account: accounts.origin.id as number,
        destination_account: accounts.destination.id as number,
        type: txnType,
        amount: data.amount,
        concept: data.concept,
        reference: data.reference,
        operation: 'SPEI',
        status: 'aprobado',
        details: ''
    };
    if ( !accounts.origin.hasEnoughBalance( data.amount ) ) {
        txn.status = 'rechazado';
        txn.details = 'Insufficient funds.'
        await createRejectedTransaction( txn );
        const responseError: TransactionResponse = {
            code:400,
            success: false,
            message: 'The transacion can´t be completed. Insufficient funds.'
        }
        return responseError;
    }
    const result = await tryTransaction( txn, accounts.origin, accounts.destination );
    const successR: TransactionResponse = {
        success: true,
        code: 200,
        message: 'Transaction completed.',
        data: result
    }
    return successR;
};
export async function tryTransaction( transaction: TransactionAttibutes, origin: AccountModel, destination: AccountModel ) {
    try {
        const result = await database.transaction(async (t) => {
            await AccountModel.update( { 
                balance: origin.restBalance( transaction.amount )
             }, { where: { id: origin.id }, transaction: t } )
            if ( !destination.external ) {
                await AccountModel.update( { 
                    balance: destination.sumBalance( transaction.amount )
                 }, { where: { id: destination.id }, transaction: t } )
            }
            const completedTransaction = await TransactionModel.create( transaction, { transaction: t } );
            return completedTransaction;
        });
        return result;
      } catch (error) { 
        throw new Error( 'Your transaction cannot be completed' )
      }
}
export async function createRejectedTransaction( transaction: TransactionAttibutes ) {
    try {
        await database.transaction(async (t) => {
            const completedTransaction = await TransactionModel.create( transaction, { transaction: t } );
            return completedTransaction;
        });
      
      } catch (error) {
        throw new Error( 'Your transaction cannot be completed' )
      }
}