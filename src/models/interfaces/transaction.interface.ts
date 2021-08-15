export interface TransactionAttibutes {
    id?: number;
    customer_id: number;
    amount: number;
    origin_account: number;
    destination_account: number;
    type: string;
    concept: string;
    reference: string;
    operation: string;
    status: string;
    details: string,
}
export interface TransactionResponse {
    success: boolean;
    message: string;
    code: number;
    continue?: boolean;
    data?: object
}