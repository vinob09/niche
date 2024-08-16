import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts, fetchFavorites } from '../../redux/products';
import { FaHandHoldingHeart } from "react-icons/fa";
import { FavoriteToggle } from '../FavoritePage/FavoriteToggle';
import ProductTiles from '../ProductTiles';
import BestSellersBar from '../BestSellersBar';
import Loader from '../Loader/Loader';
import './LandingPage.css'

function LandingPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const user = useSelector(state => state.session.user);
    const productsObj = useSelector(state => state.products.allProducts);
    const products = Object.values(productsObj);

    useEffect(() => {
        dispatch(fetchProducts())
        .then(() => setIsLoaded(true))
    }, [dispatch, user]);


    return isLoaded ? (
        <>
            <h1 className='landing-page-title'>
                {user ? (`Welcome, ${user.firstName}`) : (`Welcome, guest!`)}
            </h1>
            <BestSellersBar products={products} />
            <div className='landing-page'>
                <div className='landing-page-text'>
                    <h2>Shop for some of our favorite picks!</h2>
                    <p><FaHandHoldingHeart /></p>
                </div>
                {products.map((product) => (
                    <div key={product.id} className='product-tile'>
                        <FavoriteToggle productId={product.id}/>
                        <ProductTiles product={product} />
                    </div>
                ))}
            </div>
        </>
    ) : <Loader />;
}

export default LandingPage;
