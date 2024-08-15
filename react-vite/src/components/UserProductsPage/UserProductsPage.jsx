import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserProducts } from '../../redux/products';
import { FaStar } from "react-icons/fa";
import { useModal } from '../../context/Modal';
import { DeleteProductModal } from './DeleteProductModal';
import Loader from '../Loader/Loader';
import './UserProductsPage.css'

function UserProductsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent, closeModal } = useModal();
    const [isLoaded, setIsLoaded] = useState(false);

    const products = useSelector(state => Object.values(state.products.myProducts));
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (!user) {
            navigate("/login")
            return;
        }
        dispatch(fetchUserProducts())
            .then(() => {
                setIsLoaded(true)
            })
    }, [dispatch]);


    // handle on click for delete a product
    const handleDeleteProduct = (product_id) => {
        setModalContent(
            <DeleteProductModal
                productId={product_id}
                onClose={closeModal}
            />
        );
    };


    return isLoaded ? (
        <div className='user-products-page'>
            <h1>{user.firstName}&apos;s Products</h1>
            <div className='container'>
                {products.map((product) => (
                    <div key={product.id} className='user-product-tile'>
                            <Link to={`/products/${product.id}`}>
                                <img src={product.previewImage} alt={product.name} className='user-product-image' />
                            </Link>
                            <Link to={`/products/${product.id}`}>
                                <p className='user-product-name'>{product.name}</p>
                            </Link>
                            <div className='user-product-rating'>
                                <span className='user-product-average'>{product.avgRating} <span className='user-product-average-star'><FaStar /></span></span>
                                <span className='user-product-review'>({product.reviewCount})</span>
                            </div>
                            <p className='user-product-price'>${product.price}</p>
                            <div className='user-product-buttons'>
                                <button className='user-product-edit'>Edit</button>
                                <button className='user-product-delete' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    ) : (<Loader />)
}

export default UserProductsPage;
