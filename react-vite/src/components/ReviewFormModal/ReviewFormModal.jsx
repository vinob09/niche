import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCreateReview, fetchEditReview, fetchDeleteReview } from '../../redux/products';
import './ReviewFormModal.css'

export const AddReviewModal = ({ productId, onClose }) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [starRating, setStarRating] = useState(0);

    const handleSubmit = () => {
        dispatch(fetchCreateReview({
            product_id: productId,
            review,
            star_rating: starRating
        })).then(() => onClose());
    };

    return (
        <div className='review-form-modal'>
            <h2>Add a Review</h2>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} />
            <input
                type="number"
                value={starRating}
                onChange={(e) => setStarRating(e.target.value)}
                min="1" max="5"
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
};


export const EditReviewModal = ({ productId, review, onClose }) => {
    const dispatch = useDispatch();
    const [updatedReview, setUpdatedReview] = useState(review.review);
    const [starRating, setStarRating] = useState(review.starRating);

    const handleSubmit = () => {
        dispatch(fetchEditReview({
            product_id: productId,
            review_id: review.id,
            review: updatedReview,
            star_rating: starRating
        })).then(() => onClose());
    };

    return (
        <div className="review-form-modal">
            <h2>Edit Review</h2>
            <textarea value={updatedReview} onChange={(e) => setUpdatedReview(e.target.value)} />
            <input
                type="number"
                value={starRating}
                onChange={(e) => setStarRating(e.target.value)}
                min="1" max="5"
            />
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
        })).then(() => onClose());
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
