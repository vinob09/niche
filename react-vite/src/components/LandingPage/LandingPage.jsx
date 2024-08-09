import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../redux/products';
import ProductTiles from '../ProductTiles';
import Loader from '../Loader/Loader';
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
    ) : <Loader />;
}

export default LandingPage;
