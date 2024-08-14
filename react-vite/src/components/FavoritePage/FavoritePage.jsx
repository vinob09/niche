import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFavorites } from '../../redux/products';
import Loader from '../Loader/Loader';
import './FavoritePage.css'

function FavoritePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    const user = useSelector(state => state.session.user);
    const favorites = useSelector(state => state.products.favorites);
    // console.log(favorites)

    if (!user) {
        navigate("/login")
        return
    }

    useEffect(() => {
        dispatch(fetchFavorites())
        .then(() => {
            setIsLoaded(true)
        })
    }, [dispatch]);


    return isLoaded ? (
        <div className='favorite-page'>
            <h1>Favorites Page</h1>
        </div>
    ) : (<Loader />)
}

export default FavoritePage;
