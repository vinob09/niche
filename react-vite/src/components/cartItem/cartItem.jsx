import { useDispatch } from "react-redux";
import { fetchDeleteCartItem, fetchEditItemQuantity } from "../../redux/orders";
import { FaDollarSign } from "react-icons/fa";
import './cartItem.css'

const CartItem = ({data}) => {
    const product = data.product_details
    const dispatch = useDispatch()

    const handleMinusQuantity = () => {
        dispatch(fetchEditItemQuantity({
            product_id: data.productId,
            quantity: data.quantity - 1
        }))
    }

    const handlePlusQuantity = () => {
        dispatch(fetchEditItemQuantity({
            product_id: data.productId,
            quantity: data.quantity + 1
        }))
    }

    const removeItem = () => {
        dispatch(fetchDeleteCartItem(data.id))
    }

    const getPrice = (itemPrice, quantity) => {
        let total = quantity * itemPrice
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="cart-item-tile">
            <img src={product.previewImage} className="cart-item-product-images" />
            <h3 className="product-tile-name-sc">{product.name}</h3>
            <p><FaDollarSign/>{getPrice(product.price, data.quantity)}</p>
            <div className="edit-quantity">
                <button onClick={handleMinusQuantity}>-</button>
                <span>{data.quantity}</span>
                <button onClick={handlePlusQuantity}>+</button>
            </div>
            <div className="remove-from-cart">
                <button className="remove-item" onClick={removeItem}>Remove Item</button>
            </div>
        </div>
    )
}

export default CartItem;
