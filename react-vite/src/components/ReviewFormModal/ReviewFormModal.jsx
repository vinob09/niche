import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCreateReview, fetchEditReview, fetchDeleteReview, fetchProductId } from '../../redux/products';
import './ReviewFormModal.css'

export const AddReviewModal = ({ productId, onClose }) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [starRating, setStarRating] = useState(0);
    const [errors, setErrors] = useState([]);

    const handleSubmit = () => {
        // reset errors
        setErrors([]);

        // validation errors
        const newErrors = [];
        if (!review) newErrors.push("Review cannot be empty.");
        if (review.length > 1000) newErrors.push("Review cannot exceed 1000 characters.");
        if (starRating < 1 || starRating > 5 || isNaN(starRating)) newErrors.push("Star rating must be between 1 and 5.");

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        dispatch(fetchCreateReview({
            product_id: productId,
            review,
            star_rating: starRating
        })).then(() => {
            dispatch(fetchProductId(productId));
            onClose();
        })
        .catch(err => {
            console.error("Error adding review:", err);
            setErrors(["An error occurred while adding the review. Please try again later."])
        });
    };

    return (
        <div className='review-form-modal'>
            <h2>Add a Review</h2>
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                maxLength="1000"
            />
            <input
                type="number"
                value={starRating}
                onChange={(e) => setStarRating(Number(e.target.value))}
                min="1"
                max="5"
            />
            {errors.length > 0 && (
                <div className='review-errors'>
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                </div>
            )}
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
};


export const EditReviewModal = ({ productId, review, onClose }) => {
    const dispatch = useDispatch();
    const [updatedReview, setUpdatedReview] = useState(review.review);
    const [starRating, setStarRating] = useState(review.starRating);
    const [errors, setErrors] = useState([]);

    const handleSubmit = () => {
        // reset errors
        setErrors([]);

        // validation errors
        const newErrors = [];
        if (!updatedReview) newErrors.push("Review cannot be empty.");
        if (updatedReview.length > 1000) newErrors.push("Review cannot exceed 1000 characters.");
        if (starRating < 1 || starRating > 5 || isNaN(starRating)) newErrors.push("Star rating must be between 1 and 5.");

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        dispatch(fetchEditReview({
            product_id: productId,
            review_id: review.id,
            review: updatedReview,
            star_rating: starRating
        })).then(() => {
            dispatch(fetchProductId(productId));
            onClose();
        })
        .catch(err => {
            console.error("Error editing review:", err);
            setErrors(["An error occurred while editing this review. Please try again later."]);
        });
    };

    return (
        <div className="review-form-modal">
            <h2>Edit Review</h2>
            <textarea
                value={updatedReview}
                onChange={(e) => setUpdatedReview(e.target.value)}
                maxLength="1000"
            />
            <input
                type="number"
                value={starRating}
                onChange={(e) => setStarRating(Number(e.target.value))}
                min="1"
                max="5"
            />
            {errors.length > 0 && (
                <div className='review-errors'>
                    {errors.map((error, index) => <p key={index}>{error}</p>)}
                </div>
            )}
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};


export const DeleteReviewModal = ({ productId, review, onClose }) => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(fetchDeleteReview({
            product_id: productId,
            review_id: review.id
        })).then(() => {
            dispatch(fetchProductId(productId));
            onClose();
        })
        .catch(err => console.error("Error deleting review:", err));
    };

    return (
        <div className="review-form-modal">
            <h2>Confirm Delete?</h2>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleSubmit}>Yes, Delete</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};
