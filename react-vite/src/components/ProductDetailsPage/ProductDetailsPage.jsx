import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductId } from '../../redux/products';
import { fetchAddToCart } from '../../redux/orders'
import { FaPlusCircle, FaStar, FaRegComment } from 'react-icons/fa';
import { useModal } from '../../context/Modal';
import { AddReviewModal, DeleteReviewModal, EditReviewModal } from '../ReviewFormModal/ReviewFormModal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import Loader from '../Loader/Loader';
import './ProductDetailsPage.css'

function ProductDetailsPage() {
    const { product_id } = useParams();
    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();

    const product = useSelector(state => state.products.currProduct);
    const user = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchProductId(product_id))
            .then(() => {
                setIsLoaded(true);
            })
    }, [dispatch, product_id]);


    // handle broken image links
    const handleImageError = (e) => {
        e.target.src = '/sorry-image-not-available.jpg';
    }

    // handle on click for add to cart
    const handleAddToCart = (productId) => {
        if (!user) {
            setModalContent(<LoginFormModal />);
            return;
        }
        dispatch(fetchAddToCart({
            product_id: productId,
            quantity: 1
        }))
    };

    // handle on click for add a review
    const handleAddReview = () => {
        setModalContent(
            <AddReviewModal
                productId={product_id}
                onClose={closeModal}
            />
        )
    };

    // handle on click for edit a review
    const handleEditReview = (review) => {
        setModalContent(
            <EditReviewModal
                productId={product_id}
                review={review}
                onClose={closeModal}
            />
        )
    };

    // handle on click for delete a review
    const handleDeleteReview = (review) => {
        setModalContent(
            <DeleteReviewModal
                productId={product_id}
                review={review}
                onClose={closeModal}
            />
        );
    };

    // check if seller of product
    const isSeller = user && user.id === product.sellerId;
    // check if owner of review
    const userReview = (Array.isArray(product.reviews) && user)
        ? product.reviews.find(review => review.userId === user.id)
        : null;

    return isLoaded ? (
        <div className='product-details-page'>
            <h1>{product.name}</h1>
            <div className='product-details'>
                <div className='product-images'>
                    <img className='product-image-main' src={product.images[0]?.url} alt={product.name} onError={handleImageError} />
                    <div className='product-image-thumbnails'>
                        {product.images.slice(1, 5).map(image => (
                            <img key={image.id} src={image.url} alt={product.name} onError={handleImageError} />
                        ))}
                    </div>
                </div>
                <div className='product-info'>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price-d-page"><h3>Price: ${product.price}</h3><p>+tx</p></div>
                    {user ? (
                        !isSeller && (
                            <button
                                className='product-details-add'
                                onClick={() => handleAddToCart(product.id)}
                            >
                                Add to Cart
                            </button>
                        )
                    ) : (
                        <OpenModalButton
                            className='product-details-add'
                            buttonText='Log in to add to cart'
                            modalComponent={<LoginFormModal />}
                        />
                    )}
                </div>
            </div>
            <div className='product-details-reviews'>
                <div className="review-head"><h2>Reviews</h2><FaRegComment /></div>
                {isSeller && 'You own this product.'}
                {user && !isSeller && !userReview && (
                    <button onClick={handleAddReview}><FaPlusCircle/>Add a Review</button>
                )}
                {product.reviews.map(review => (
                    <div key={review.id} className='product-details-review'>
                        <h5>{review.userFirstName}</h5>
                        <div className="avg-star"><p>{review.starRating} </p><FaStar/></div>
                        <p className="review-text">{review.review}</p>
                        {user && review.userId === user.id && (
                            <div className="review-edit-delete">
                                <button onClick={() => handleEditReview(review)}>Edit</button>
                                <button onClick={() => handleDeleteReview(review)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    ) : <Loader />
}

export default ProductDetailsPage;
