import { Link } from 'react-router-dom';
import { FavoriteToggle } from '../FavoritePage/FavoriteToggle';
import './ProductTiles.css'

function ProductTiles({ product }) {
    return (
        <div className='product-tiles'>
            <FavoriteToggle productId={product.id} />
            <Link to={`/products/${product.id}`} title={product.name}>
                <img src={product.previewImage} alt={product.name} />
                <div className='price-container'>
                    <p className='product-price'>${product.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default ProductTiles;
