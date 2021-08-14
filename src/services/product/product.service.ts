import { ProductModel } from '../../models/product'
export function getProductById( id:number ) {
    return ProductModel.findByPk( id )
        .then( result => result )
        .catch( err => {
            throw new Error( 'Error validatin the produc' );
        } );
}