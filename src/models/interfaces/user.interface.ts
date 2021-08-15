export default interface UserAttributesI {
    id?: Number;
    username: string;
    password?: string;
    active_session: boolean;
    token: string;
    status: string;
    customer_id: Number;
};