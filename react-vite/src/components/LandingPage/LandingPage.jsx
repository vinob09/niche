import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../redux/products';
import ProductTiles from '../ProductTiles';
import './LandingPage.css'

function LandingPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const products = useSelector(state => Object.values(state.products.allProducts));

    useEffect(() => {
        dispatch(fetchProducts())
        .then(() => {
            setIsLoaded(true)
        })
    }, [dispatch]);

    return isLoaded ? (
        <div className='landing-page'>
            <h1>Welcome, user!</h1>
            {products.map((product) => (
                <ProductTiles key={product.id} product={product} />
            ))}
        </div>
    ) : (<section className="loader">
        <div style={{ '--i': 0 }} className="slider"></div>
        <div style={{ '--i': 1 }} className="slider"></div>
        <div style={{ '--i': 2 }} className="slider"></div>
        <div style={{ '--i': 3 }} className="slider"></div>
        <div style={{ '--i': 4 }} className="slider"></div>
    </section>)
}

export default LandingPage;
