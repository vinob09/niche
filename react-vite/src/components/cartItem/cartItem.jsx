import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDeleteCartItem, fetchEditItemQuantity } from "../../redux/orders";
import { FaDollarSign } from "react-icons/fa";
import './cartItem.css'

const CartItem = ({key, data}) => {
    const product = data.product_details
    const dispatch = useDispatch()
    const [editButton, setEditButton] = useState('Update Quantity')
    const [allowEdit, setAllowEdit] = useState(false)

    const handleMinusQuantity = () => {
        dispatch(fetchEditItemQuantity({
            product_id: data.productId,
            quantity: data.quantity - 1
        })).catch(e => console.log)
    }

    const handlePlusQuantity = () => {
        dispatch(fetchEditItemQuantity({
            product_id: data.productId,
            quantity: data.quantity + 1
        })).catch(e => console.log)
    }

    const removeItem = () => {
        dispatch(fetchDeleteCartItem(data.id)).catch(e => console.log)
    }

    const getPrice = (itemPrice, quantity) => {
        let total = quantity * itemPrice
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="cart-item-tile">
            <img src={product.previewImage} className="cart-item-product-images" />
            <h3>{product.name}</h3>
            <p><FaDollarSign/>{getPrice(product.price, data.quantity)}</p>
            <div className="edit-quantity">
                <button className="reduce-quantity" onClick={handleMinusQuantity}>-</button>
                <span>{data.quantity}</span>
                <button className="add-quantity" onClick={handlePlusQuantity}>+</button>
            </div>
            <div className="remove-from-cart">
                <button className="remove-item" onClick={removeItem}>Remove Item</button>
            </div>
        </div>
    )
}

export default CartItem;
