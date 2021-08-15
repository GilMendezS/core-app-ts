import { ProductModel  } from '../../models/product';
import { getProductById } from './product.service';
jest.mock( '../../models/product' );
describe( 'Test product service', () => {
    it( 'should create find a product in DB', async() => {
        const productModelMock = ProductModel.findByPk as jest.Mock;
        const product = {
            id: 1,
            name: 'credito',
            status: 1
        };
        productModelMock.mockImplementation( () => Promise.resolve( product ) );
        
        const result = await getProductById( 1 );
        
        expect( typeof result ).toEqual( 'object' );

        expect( result ).toHaveProperty( 'id' );

        expect( productModelMock ).toHaveBeenCalled( )
    } );
    it( 'Should throw an error if the db raise an error', async () => {
        
        const productModelMock = ProductModel.findByPk as jest.Mock;
        productModelMock.mockImplementation( () => Promise.reject( {} ) );
        await expect( async () => await getProductById( 1 ) )
        .rejects.toThrow( 'Error validating the product' )
    } )
} )