export interface JWTPayload {
    username: string;
    customer_id: number;
    iat: number;
}