import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductId } from '../../redux/products';
import { fetchAddToCart } from '../../redux/orders'
import { useModal } from '../../context/Modal';
import { AddReviewModal, DeleteReviewModal, EditReviewModal } from '../ReviewFormModal/ReviewFormModal';
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


    // handle on click for add to cart
    const handleAddToCart = (productId) => {
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
                    {product.images.map(image => (
                        <img key={image.id} src={image.url} alt={product.name} />
                    ))}
                </div>
                <div className='product-info'>
                    <p>{product.description}</p>
                    <h3>Price: ${product.price}</h3>
                    <button className='product-details-add' onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                </div>
            </div>
            <div className='product-details-reviews'>
                <h2>Reviews</h2>
                {user && !isSeller && !userReview && (
                    <button onClick={handleAddReview}>Add a Review</button>
                )}
                {product.reviews.map(review => (
                    <div key={review.id} className='product-details-review'>
                        <p>{review.userFirstName}</p>
                        <p>Rating: {review.starRating} stars</p>
                        <p>{review.review}</p>
                        {user && review.userId === user.id && (
                            <>
                                <button onClick={() => handleEditReview(review)}>Edit</button>
                                <button onClick={() => handleDeleteReview(review)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    ) : <Loader />
}

export default ProductDetailsPage;
