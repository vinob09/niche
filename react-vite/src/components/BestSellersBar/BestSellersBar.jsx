import ProductTiles from '../ProductTiles'
import './BestSellersBar.css'

function BestSellersBar({ products }) {
    const bestSellers = products.slice(4, 10);

    return (
        <div className='best-sellers-wrapper'>
            <h2 className='best-sellers-title'>Best Sellers</h2>
            <div className='best-sellers-bar'>
                <div className='best-sellers-content'>
                    {bestSellers.map(product => (
                        <ProductTiles key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BestSellersBar;
