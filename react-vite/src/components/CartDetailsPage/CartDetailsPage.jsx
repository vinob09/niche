import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cartItem/cartItem';
import BestSellersBar from '../BestSellersBar';
import { fetchCartItems } from '../../redux/orders';
import { fetchProducts } from '../../redux/products';
import { useModal } from '../../context/Modal'
import PaymentCheckoutModal from '../cartCheckoutModal/cartCheckoutModel';
import Loader from '../Loader/Loader';
import './CartDetailsPage.css';

function CartDetailsPage () {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const navigate = useNavigate()

    const [isLoaded, setIsLoaded] = useState(false);
    const currentUser = useSelector(state => state.session.user)
    const cartItems = useSelector(state => Object.values(state.orders.cartItems))
    const products = useSelector(state => Object.values(state.products.allProducts));

    useEffect(() => {
        if (!currentUser) {
            navigate("/login")
            return;
        }

        dispatch(fetchCartItems(currentUser.id))
        .then(() => {
            dispatch(fetchProducts())
        }).then(() => {
            setIsLoaded(true)
        })
    }, [dispatch, currentUser, navigate])

    //calculates the total for all items in the cart
    const getTotal = () => {
        let total = 0;
        cartItems.forEach(item => {
            let price = item.quantity * item.product_details.price;
            total+= price
        })
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //modal for payment
    const handleCheckout = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        setModalContent(<PaymentCheckoutModal />)
    }

    return  isLoaded && currentUser ? (
        <div className='cart-details-page'>
            <h2>{cartItems.length} items in your cart</h2>
            <div>
                {cartItems.map((item, key) =>
                    <CartItem key={key} data={item}/>
                )}
            </div>
            <div className='cart-info'>
                <h3 style={{fontSize:"20px"}}>Total: ${getTotal()}</h3>
                <p>Before taxes and fees.</p>
            </div>
            <div>
                <button
                    className='checkout-button'
                    onClick={e => handleCheckout(e)}
                    disabled={!cartItems.length}
                >
                    Proceed to checkout
                </button>
            </div>
            <div>
                <h3>Items you may like:</h3>
                <BestSellersBar products={products} />
            </div>
        </div>
    ) : <Loader />

}

export default CartDetailsPage;
