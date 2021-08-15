import { getByCustomerId, getUserByUsername } from './user.service'
import { UserModel } from '../../models/user';

jest.mock( '../../models/user' );
describe( 'Test user service', () => {
    const userMock = UserModel.findOne as jest.Mock;
    it( 'should return an object when searching by id', async () => {
        userMock.mockImplementation( () => Promise.resolve(  { id: 1 } ) );
        
        const result = await getByCustomerId( 1 );
        expect( result ).not.toBeNull();
    } );
    it( 'should throw an error when searching by id and the db raise an error', async () => {
        userMock.mockImplementation( () => Promise.reject(  { } ) );
        await expect( async( ) => {
            await getByCustomerId( 1 );
        } ).rejects.toThrow( 'Error fetching user' );
    } );
} );