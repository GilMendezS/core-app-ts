import { UserModel } from '../../models/user';

export function getUserByUsername( username: string ) {
    return UserModel.findOne( { where: { username } } )
        .then( result => {
            return result;
        } )
        .catch( err => {
            console.log( err )
            throw new Error( 'Error fetching user' );
        } )
};
export function getByCustomerId( customer_id?: number ) {
    return UserModel.findOne( { where: { customer_id } } )
        .then( result => {
            return result;
        } )
        .catch( err => {
            throw new Error( 'Error fetching user' );
        } )
}  
export function updateUser( data, customerId ) {
    return UserModel.update( data, { where: { customer_id: customerId } } )
    .then( updatedUser => {
        return updatedUser;
    } )
    .catch( err => {
        console.log('getUserByUsername: ', err)
        throw new Error('Error updating user');
    } )
}
export function checkToken( token: string ) {
    return UserModel.findOne( { where: { token } } )
        .then( result => {
            return result;
        } )
        .catch( err => {
            throw new Error( 'Error fetching user' );
        } )
}
export function deactivateByUserId( userId ) {
    return UserModel.update( { status: 'inactive' }, { where: { id: userId } } )
    .then( updatedUser => {
        return updatedUser;
    } )
    .catch( err => {
        throw new Error('Error updaeting user');
    } )
}