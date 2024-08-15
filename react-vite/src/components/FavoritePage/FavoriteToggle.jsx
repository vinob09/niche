import { useDispatch, useSelector } from 'react-redux';
import { fetchAddFavorite, fetchDeleteFavorite } from '../../redux/products';
import { GoHeartFill, GoHeart } from "react-icons/go";

import './FavoriteToggle.css';

export const FavoriteToggle = ({productId}) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.products.favorites);
    const isFavorite = Object.values(favorites).some(fav => fav.productId === productId);

    const handleClick = () => {
        if (isFavorite) {
            dispatch(fetchDeleteFavorite(productId))
        } else {
            dispatch(fetchAddFavorite(productId))
        }
    };

    return (
        <button onClick={handleClick} className='favorite-toggle-button'>
            {isFavorite ? <GoHeartFill /> : < GoHeart />}
        </button>
    )
};
