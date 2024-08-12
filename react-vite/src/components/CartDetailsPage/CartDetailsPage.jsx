import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCartItems } from '../../redux/orders';
import Loader from '../Loader/Loader';
import './CartDetailsPage.css';

function CartDetailsPage () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const cartItems = useSelector(state => Object.values(state.orders.cartItems))
    const currentUser = useSelector(state => state.user.id)

    useEffect(() => {
        dispatch(fetchCartItems(currentUser))
        .then(() => {
            setIsLoaded(true)
        })
    }, [dispatch, currentUser])

    return isLoaded ? (
        <div className='cart-details-page'>
            <h1>Cart Details Page</h1>
            <div className='cart-list'>
                <ul>
                    {cartItems.map(item => {
                        return <li key={item.id}>cartItems.product</li>
                    })}
                </ul>
            </div>
        </div>
    ) : <Loader />
}


export default CartDetailsPage;
