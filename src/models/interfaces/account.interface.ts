export default interface AccountAttributesI {
    id?: number;
    account_number: string;
    product_id:  number;
    balance:  number;
    status:  string;
    nip?:  string;
    customer_id: number;
    external?: boolean;
}