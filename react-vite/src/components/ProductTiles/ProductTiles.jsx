import './ProductTiles.css'

function ProductTiles({ product }) {
    return (
        <div className='product-tiles'>
            {/*Using unordered list just to display products as placeholder,
            this will be updated according to our wireframe!*/}
            <ul>
                <li>
                    {product.name}
                    { " --- " }
                    ${product.price}
                </li>
            </ul>
        </div>
    )
}

export default ProductTiles;
