import { NavLink } from 'react-router-dom';
import { FavoriteToggle } from '../FavoritePage/FavoriteToggle';
import './ProductTiles.css'

// handle broken image links
const handleImageError = (e) => {
    e.target.src = '/sorry-image-not-available.jpg';
}

function ProductTiles({ product }) {
    return (
        <div className='product-tiles'>
            <FavoriteToggle productId={product.id} />
            <NavLink to={`/products/${product.id}`} title={product.name}>
                <img src={product.previewImage} alt={product.name} onError={handleImageError} />
                <div className='price-container'>
                    <p className='product-price'>${product.price}</p>
                </div>
            </NavLink>
        </div>
    )
}

export default ProductTiles;
