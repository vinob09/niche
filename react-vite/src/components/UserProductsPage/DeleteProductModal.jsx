import { useDispatch } from "react-redux";
import { fetchDeleteProduct } from "../../redux/products";
import './DeleteProductModal.css';


export const DeleteProductModal = ({ productId, onClose }) => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(fetchDeleteProduct(productId))
            .then(() => onClose())
            .catch(err => console.error("Error deleting review:", err));
    };

    return (
        <div className="delete-product-modal">
            <h2>Confirm Delete?</h2>
            <p>Are you sure you want to delete this product?</p>
            <button onClick={handleSubmit}>Yes, Delete</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};
