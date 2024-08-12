import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductId } from '../../redux/products';
import Loader from '../Loader/Loader';
import './ProductDetailsPage.css'

function ProductDetailsPage() {
    const { product_id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.currProduct);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchProductId(product_id))
        .then(() => {
            setIsLoaded(true);
        })
    }, [dispatch, product_id]);
    

    return isLoaded ? (
        <div className='product-details-page'>
            <h1>Product Details Page</h1>
            <div className='product-details'>
                <div className='product-images'>
                    {product.images.map(image => (
                        <img key={image.id} src={image.url} alt={product.name}/>
                    ))}
                </div>
                <div className='product-info'>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <h3>Price: {product.price}</h3>
                    <button className='product-details-add'>Add to Cart</button>
                </div>
            </div>
            <div className='product-details-reviews'>
                <h2>Reviews</h2>
                {product.reviews.map(review => (
                    <div key={review.id} className='product-details-review'>
                        <p>{review.userFirstName}</p>
                        <p>Rating: {review.starRating} stars</p>
                        <p>{review.review}</p>
                    </div>
                ))}
            </div>
        </div>
    ) : <Loader />
}

export default ProductDetailsPage;
