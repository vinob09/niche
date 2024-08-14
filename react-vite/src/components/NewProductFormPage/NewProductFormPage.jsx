import './NewProductFormPage.css';
import {useEffect, useState} from 'react';
import { fetchCreateProduct } from '../../redux/products';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

function NewProductFormPage () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState('false');

    useEffect(() => {
        const fetchCategories = async() => {
            const res = await fetch('api/categories');
            const data = await res.json();
            setCategories(data.categories);
        };
        fetchCategories();
    }, []);
    useEffect(() => {
        dispatch(fetchCreateProduct())
            .then(() => {
                setIsLoaded(true)
            })
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    

        const newProduct = {
            name,
            description,
            price: parseFloat(price),
            category_id: categoryId
        };

        try {
            const createdProduct = await dispatch(fetchCreateProduct(newProduct));
            navigate(`/products/${createdProduct.id}`);

        } catch (error) {
            const errorObj = await error.json();
            setErrors(errorObj.errors)
        }
    }

    return isLoaded ? (
        <form onSubmit={handleSubmit} className = 'product-form'>
            <ul>
                {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <div>
                <label htmlFor="name">product name...</label>
                <input
                id='name' type='text' value={name}
                onChange={(e) => setName(e.target.value)}
                required maxLength='50
                '/>
            </div>
            <div>
                <label htmlFor='description'>product description...</label>
                <input
                id='description' value={description}
                onChange={(e) => setDescription(e.target.value)}
                required maxLength='1000'
                />
            </div>
            <div>
                <label htmlFor='price'>set a price</label>
                <input id='price' type='number' value={price}
                onChange={(e) => setPrice(e.target.value)}
                required min='0' step='0.01'
                />
            </div>
            <div>
                <label htmlFor='category'>select a category..</label>
                <select id='category' value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required>
                   <option value=''>select a category for your product</option>
                   {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                   ))}
                </select>
            </div>
            <button type='submit'>create product</button>
        </form>
    ) : <Loader/>;
}

export default NewProductFormPage;
