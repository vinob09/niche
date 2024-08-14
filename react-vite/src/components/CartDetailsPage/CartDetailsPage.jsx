import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CartItem from '../cartItem/cartItem';
import BestSellersBar from '../BestSellersBar';
import { fetchCartItems } from '../../redux/orders';
import { fetchProducts } from '../../redux/products';
import Loader from '../Loader/Loader';
import './CartDetailsPage.css';


function CartDetailsPage () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const currentUser = useSelector(state => state.session.user)
    const cartItems = useSelector(state => Object.values(state.orders.cartItems))
    const products = useSelector(state => Object.values(state.products.allProducts));

    if (!currentUser) {
        return (
            <h1>Must be logged in to view cart</h1>
        )
    }

    const getTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            let price = item.quantity * item.product_details.price;
            total+= price
        })
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        dispatch(fetchCartItems(currentUser.id))
        .then(() => {
            dispatch(fetchProducts())
        }).then(() => {
            setIsLoaded(true)
        })
    }, [dispatch, currentUser])

    return  isLoaded ? (
        <div className='cart-details-page'>
            <h2>{cartItems.length} items in your cart</h2>
            <div>
                {cartItems.map((item, key) =>
                    <CartItem key={key} data={item}/>
                )}
            </div>
            <div className='cart-info'>
                <h3>Item(s) Total: ${getTotal()}</h3>
            </div>
            <div>
                <button>Proceed to checkout</button>
            </div>
            <div>
                <h3>Items you may like:</h3>
                <BestSellersBar products={products} />
            </div>
        </div>
    ) : <Loader />

}

export default CartDetailsPage;
