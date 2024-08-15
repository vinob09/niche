import { useDispatch, useSelector } from 'react-redux';
import { fetchAddFavorite, fetchDeleteFavorite } from '../../redux/products';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useModal } from '../../context/Modal';
import { useEffect, useState } from 'react';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import './FavoriteToggle.css';

export const FavoriteToggle = ({ productId }) => {
    const dispatch = useDispatch();
    const { openModal } = useModal();

    const user = useSelector(state => state.session.user);
    const favoritesObj = useSelector(state => state.products.favorites);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (user && favoritesObj) {
            const favorites = Object.values(favoritesObj);
            setIsFavorite(favorites.some(fav => fav.productId === productId));
        }
    }, [user, favoritesObj, productId]);

    const handleClick = () => {
        if (!user) {
            openModal(<LoginFormModal />);
            return;
        }

        if (isFavorite) {
            dispatch(fetchDeleteFavorite(productId)).then(() => {
                setIsFavorite(false);
            });
        } else {
            dispatch(fetchAddFavorite(productId)).then(() => {
                setIsFavorite(true);
            });
        }
    };

    return (
        <button onClick={handleClick} className='favorite-toggle-button'>
            {isFavorite ? <GoHeartFill /> : < GoHeart />}
        </button>
    )
};
