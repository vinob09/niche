import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { fetchUserProducts } from '../../redux/products';
import { FaStar, FaPlusCircle } from "react-icons/fa";
import { useModal } from '../../context/Modal';
import { DeleteProductModal } from './DeleteProductModal';
import Loader from '../Loader/Loader';
import './UserProductsPage.css'

function UserProductsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent, closeModal } = useModal();
    const [isLoaded, setIsLoaded] = useState(false);

    const productsObj = useSelector(state => state.products.myProducts);
    const products = Object.values(productsObj);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (!user) {
            setIsLoaded(false);
            navigate("/");
            return;
        }
        dispatch(fetchUserProducts())
            .then(() => {
                setIsLoaded(true)
            })
    }, [dispatch, navigate, user]);


    // handle broken image links
    const handleImageError = (e) => {
        e.target.src = '/sorry-image-not-available.jpg';
    }

    // handle on click for edit a prodcut
    const handleEditProduct = (productId) => {
        navigate(`/products/new-product/${productId}`)
    }

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
            <h1>{user ? (`${user.firstName}'s Products`) : <Loader />}</h1>
            <Link to={`/products/new-product`} className="new-product-link"><FaPlusCircle/>Add a New Product</Link>
            {products.length > 0 ? (
                <div className='container'>
                    {products.map((product) => (
                        <div key={product.id} className='user-product-tile'>
                            <NavLink to={`/products/${product.id}`}>
                                <img src={product.previewImage} alt={product.name} className='user-product-image' onError={handleImageError} />
                            </NavLink>
                            <NavLink to={`/products/${product.id}`}>
                                <p className='user-product-name'>{product.name}</p>
                            </NavLink>
                            <div className='user-product-rating'>
                                <span className='user-product-average'>{product.avgRating} <span className='user-product-average-star'><FaStar /></span></span>
                                <span className='user-product-review'>({product.reviewCount})</span>
                            </div>
                            <p className='user-product-price'>${product.price}</p>
                            <div className='user-product-buttons'>
                                <button className='user-product-edit' onClick={() => handleEditProduct(product.id)}>Edit</button>
                                <button className='user-product-delete' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products listed for sale.</p>
            )}
        </div>
    ) : (<Loader />)
}

export default UserProductsPage;
