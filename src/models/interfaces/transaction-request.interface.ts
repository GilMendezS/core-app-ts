export interface TransactionRequest {
    origin_account: number;
    amount: number;
    destination_account: number;
    concept: string;
    reference: string;
};