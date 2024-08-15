import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { fetchFavorites, fetchProducts } from '../../redux/products';
import { fetchAddToCart } from '../../redux/orders';
import { FavoriteToggle } from './FavoriteToggle';
import { FaStar } from 'react-icons/fa';
import Loader from '../Loader/Loader';
import './FavoritePage.css'

function FavoritePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    const user = useSelector(state => state.session.user);
    const favorites = useSelector(state => state.products.favorites);
    const productsObj = useSelector(state => state.products.allProducts);
    const products = Object.values(productsObj);


    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate]);

    useEffect(() => {
        Promise.all([dispatch(fetchProducts()), dispatch(fetchFavorites())])
            .then(() => {
                setIsLoaded(true)
            })
    }, [dispatch, user]);


    // check products against favorites array
    let favoriteProducts;
    if (isLoaded) {
        favoriteProducts = products.filter(product =>
            favorites.some(favorite => favorite.productId === product.id)
        );
    }


    // handle on click for add to cart
    const handleAddToCart = (productId) => {
        dispatch(fetchAddToCart({
            product_id: productId,
            quantity: 1
        })).then(() => navigate('/shopping-cart'))
    };


    return isLoaded ? (
        <div className='favorite-page'>
            <h1>{user ? (`${user.firstName}'s Favorites`) : <Loader />}</h1>
            {favoriteProducts.length > 0 ? (
                <div className='container'>
                    {favoriteProducts.map(product => (
                        <div key={product.id} className='favorite-tile'>
                            <FavoriteToggle productId={product.id} />
                            <NavLink to={`/products/${product.id}`}>
                                <img src={product.previewImage} alt={product.name} className='favorite-image' />
                            </NavLink>
                            <NavLink to={`/products/${product.id}`}>
                                <p className='favorite-name'>{product.name}</p>
                            </NavLink>
                            <div className='favorite-rating'>
                                <span className='favorite-average'>{product.avgRating} <span className='favorite-average-star'><FaStar /></span></span>
                                <span className='favorite-review'>({product.reviewCount})</span>
                            </div>
                            <p className='favorite-price'>${product.price}</p>
                            <button className='favorite-button' onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have not liked any products.</p>
            )}
        </div>
    ) : (<Loader />)
}

export default FavoritePage;
