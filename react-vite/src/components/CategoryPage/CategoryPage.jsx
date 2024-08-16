import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProductsByCategory, fetchCategories } from '../../redux/products';
import { FavoriteToggle } from '../FavoritePage/FavoriteToggle';
import { useParams } from 'react-router-dom';
import ProductTiles from '../ProductTiles';
import Loader from '../Loader/Loader';
import './CategoryPage.css'

function CategoryPage() {
    const { category_id } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const productsObj = useSelector(state => state.products.productsByCategory);
    const products = Object.values(productsObj);
    const categories = useSelector(state => state.products.categories);

    // pull current category being displayed
    const currentCategory = categories[category_id];

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchProductsByCategory(category_id))
            .then(() => {
                setIsLoaded(true)
            })
    }, [dispatch, category_id]);

    return isLoaded ? (
        <>
            <h1 className='category-page-title'>{currentCategory.categoryName}</h1>
            <div className='category-page'>
                {products.map((product) => (
                    <div key={product.id} className='product-tile'>
                        <FavoriteToggle productId={product.id} />
                        <ProductTiles product={product} />
                    </div>
                ))}
            </div>
        </>
    ) : (<Loader />)
}

export default CategoryPage;
