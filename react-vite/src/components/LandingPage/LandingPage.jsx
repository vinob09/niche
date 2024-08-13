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
        .catch(e => {console.log(e)})
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

            {/*Section for "Gifts under $50" tile will redirect to => "Office" category page products, id 2*/}
            {/*Section for "Gifts for Him" tile will redirect to => "Automative" category page products, id 5*/}
            {/*Section for "Wedding Gifts" tile will redirect to => "Home" category page products, id 1*/}
        </>
    ) : <Loader />;
}

export default LandingPage;
