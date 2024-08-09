import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../redux/products';
import ProductTiles from '../ProductTiles';
import './LandingPage.css'

function LandingPage() {
    const dispatch = useDispatch();
    const products = useSelector(state => Object.values(state.products.allProducts));

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

    // sorted by newest item added to oldest; we can change or remove this
    const sortedProducts = products.sort((a, b) => b.id - a.id);

    return (
        <div className='landing-page'>
            <h1>Welcome, user!</h1>
            {sortedProducts.map((product) => (
                <ProductTiles key={product.id} product={product} />
            ))}
        </div>
    )
}

export default LandingPage;
