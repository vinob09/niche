import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CartItem from '../cartItem/cartItem';
import { fetchCartItems, fetchEditItemQuantity, fetchDeleteCartItem } from '../../redux/orders';
import Loader from '../Loader/Loader';
import { FaDollarSign } from "react-icons/fa";
import './CartDetailsPage.css';

function CartDetailsPage () {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const currentUser = useParams()
    const cartItems = useSelector(state => Object.values(state.orders.cartItems))

    useEffect(() => {
        dispatch(fetchCartItems(currentUser))
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

    // if (!currentUser) {
    //     return (
    //         <h1>Must be logged in to view cart</h1>
    //     )
    // }



    // const onClick = (type) => {
    //     if (type === 'edit') {
    //         if (!allowEdit) {
    //             setAllowEdit(true)
    //             setEditButton('Save')
    //         } else {
    //             setAllowEdit(false)
    //             setEditButton('Edit Quantity')
    //         }
    //     }

    //     if (type === 'remove') {
    //         console.log('removed')
    //     }

    // }

    // const getPrice = (itemPrice) => {
    //     let total = quantity * itemPrice
    //     return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    // return isLoaded ? (
    //     <div className='cart-details-page'>
    //         <h1>Cart Details Page</h1>
    //         <div className='cart-list'>
    //         {cartItems.map(item => (
    //             <div key={item.id} className='cart-items'>
    //                 <img src={item.product_details.previewImage}></img>
    //                 <div className='cart-product-details'>
    //                     <Link to={`/products/${item.product_details.id}`}>
    //                         {item.product_details.name}
    //                     </Link>
    //                     <p>Quantity:</p>
    //                     {allowEdit ?
    //                     <input
    //                         type='number'
    //                         value={item.quantity}
    //                         onChange={(e) => setEditButton(e.target.value)}
    //                         min={1}
    //                     /> : <p>{quantity}</p>
    //                     }
    //                 </div>
    //                 <div className='cart-item-price'>
    //                     <FaDollarSign/><p>{getPrice(item.product_details.price)}</p>
    //                 </div>
    //                 <div>
    //                     <button onClick={() => onClick('edit', item.productId, quantity)}>{editButton}</button>
    //                     <button onClick={() => onClick('remove')}>Remove</button>
    //                 </div>
    //             </div>
    //         ))}
    //         </div>
    //     </div>
    // ) : <Loader />
}

export default CartDetailsPage;
