import { Link } from 'react-router-dom';
import './ProductTiles.css'

function ProductTiles({ product }) {
    return (
        <Link to={`/products/${product.id}`} title={product.name}>
            <div className='product-tiles'>
                <img src={product.previewImage} alt={product.name} />
                <div className='price-container'>
                    <p className='product-price'>${product.price}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductTiles;
