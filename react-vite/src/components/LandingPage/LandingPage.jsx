import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../redux/products';
import { FaHandHoldingHeart } from "react-icons/fa";
import ProductTiles from '../ProductTiles';
import BestSellersBar from '../BestSellersBar';
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
        <>
            <h1 className='landing-page-title'>Welcome, user!</h1>
            <BestSellersBar products={products} />
            <div className='landing-page'>
                <div className='landing-page-text'>
                    <h2>Shop for some of our favorite picks!</h2>
                    <p><FaHandHoldingHeart /></p>
                </div>
                {products.map((product) => (
                    <ProductTiles key={product.id} product={product} />
                ))}
            </div>
        </>
    ) : (<h1>Loading...</h1>)
        <div className='landing-page'>
            <h1>Welcome, user!</h1>
            {products.map((product) => (
                <ProductTiles key={product.id} product={product} />
            ))}
        </div>
    ) : <Loader />;
}

export default LandingPage;
