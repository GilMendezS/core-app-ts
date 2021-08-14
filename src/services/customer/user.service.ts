import { UserModel } from '../../models/user';

export function getUserByUsername( username: string ) {
    return UserModel.findOne( { where: { username } } )
        .then( result => {
            return result;
        } )
        .catch( err => {
            throw new Error( 'Error fetching user' );
        } )
};