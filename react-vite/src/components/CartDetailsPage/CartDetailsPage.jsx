import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CartItem from '../cartItem/cartItem';
import { fetchCartItems, fetchEditItemQuantity, fetchDeleteCartItem } from '../../redux/orders';
import Loader from '../Loader/Loader';
import './CartDetailsPage.css';

function CartDetailsPage () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const currentUser = useSelector(state => state.session.user)
    const cartItems = useSelector(state => Object.values(state.orders.cartItems))

    if (!currentUser) {
        return (
            <h1>Must be logged in to view cart</h1>
        )
    }

    useEffect(() => {
        dispatch(fetchCartItems(currentUser.id))
        .then(() => {
            setIsLoaded(true)
        })
    }, [dispatch, currentUser])

    return  isLoaded ? (
        <div className='cart-details-page'>
            <h2>Shopping Cart</h2>
            <div>
                {cartItems.map((item, key) =>
                    <CartItem key={key} data={item}/>
                )}
            </div>
            <div className='cart-buttons'>
                <button>Checkout</button>
            </div>
        </div>
    ) : <Loader />

}

export default CartDetailsPage;
