import ProductTiles from '../ProductTiles'
import './BestSellersBar.css'

function BestSellersBar({ products }) {
    const bestSellers = products.slice(4, 10);

    return (
        <div className='best-sellers-bar'>
            <h2>Best Sellers</h2>
            <div className='best-sellers-content'>
                {bestSellers.map(product => (
                    <ProductTiles key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default BestSellersBar;
