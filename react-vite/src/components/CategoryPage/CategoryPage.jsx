import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProductsByCategory, fetchCategories } from '../../redux/products';
import { useParams } from 'react-router-dom';
import ProductTiles from '../ProductTiles';
import Loader from '../Loader/Loader';
import './CategoryPage.css'

function CategoryPage() {
    const { category_id } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const products = useSelector(state => Object.values(state.products.productsByCategory));
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
                    <ProductTiles key={product.id} product={product} />
                ))}
            </div>
        </>
    ) : (<Loader />)
}

export default CategoryPage;
