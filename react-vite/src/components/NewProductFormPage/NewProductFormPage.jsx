import { useEffect, useState, useRef } from 'react';
import { fetchCreateProduct, fetchEditProduct, fetchAddImage, fetchProductId } from '../../redux/products';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './NewProductFormPage.css';

function NewProductFormPage() {
    const { productId } = useParams();
    const inputRefs = useRef({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categoriesObj = useSelector(state => state.products.categories);
    const categories = Object.values(categoriesObj);
    const product = useSelector(state => state.products.currProduct);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [imageOne, setImageOne] = useState('');
    const [imageTwo, setImageTwo] = useState('');
    const [imageThree, setImageThree] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    // error validations
    const validationErrors = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required.';
        if (name.length > 50) newErrors.name = 'Name must be less than 50 characters.';
        if (!description) newErrors.description = 'A description is required.';
        if (description.length > 1000) newErrors.description = 'Description must be less than 1000 characters.';
        if (!price) newErrors.price = 'Price is required.';
        if (!productId && !previewImage) newErrors.previewImage = 'A preview image is required.';
        return newErrors;
    }

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductId(productId)).then(() => setIsLoaded(true))
        } else {
            setIsLoaded(true);
        }
    }, [productId, dispatch]);

    useEffect(() => {
        if (product && productId) {
            setName(product.name || "");
            setDescription(product.description || "");
            setPrice(product.price || "");
            setPreviewImage(product.previewImage || "");
            setCategoryId(product.categoryId || "");
        }
    }, [product, productId]);

    // handle errors to clear when input is updated
    const handleInputs = (setter, field) => (e) => {
        setter(e.target.value);
        if (errors[field]) {
            setErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors[field];
                return newErrors;
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasErrors = validationErrors();

        // handle image URL extensions
        const imageUrls = [previewImage, imageOne, imageTwo, imageThree].filter(url => url);
        const invalidUrl = imageUrls.filter(url => {
            const extension = url.split('.').pop().toLowerCase();
            return !['png', 'jpg', 'jpeg'].includes(extension);
        });

        if (invalidUrl.length > 0) {
            setErrors(prevErrors => ({
                ...prevErrors,
                previewImage: 'Image URL needs to end in png, jpg or jpeg'
            }))
            return;
        }

        if (Object.keys(hasErrors).length > 0) {
            setErrors(hasErrors);
            const firstErrorField = Object.keys(hasErrors)[0];
            inputRefs.current[firstErrorField].scrollIntoView({ behavior: 'smooth' })
        } else {
            const productData = {
                name,
                description,
                price: parseFloat(price),
                category_id: categoryId
            };

            try {
                // check form if creation or updating
                if (productId) {
                    await dispatch(fetchEditProduct({ product_id: productId, ...productData }));
                    navigate(`/products/${productId}`)
                } else {
                    const newProduct = await dispatch(fetchCreateProduct(productData))
                    if (newProduct && newProduct.id) {
                        const newProductId = newProduct.id;
                        const imagePromise = imageUrls.map((url) => {
                            return dispatch(fetchAddImage({ product_id: newProductId, url }));
                        })
                        await Promise.all(imagePromise);
                        navigate(`/products/${newProductId}`);
                    } else {
                        setErrors({form: 'Failed to create product. Please try again.'})
                    }
                }
            } catch (res) {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            }
        }
    }

    return isLoaded ? (
        <>
            <h1>{productId ? 'Update Your Product' : 'Create a New Product'}</h1>
            <form onSubmit={handleSubmit} className='product-form'>
                <div>
                    <label htmlFor="name">product name...
                        <input
                            id='name' type='text' value={name}
                            onChange={handleInputs(setName, 'name')}
                            ref={(el) => inputRefs.current.name = el}
                            required maxLength='50'
                        />
                    </label>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor='description'>product description...
                        <input
                            id='description' value={description}
                            onChange={handleInputs(setDescription, 'description')}
                            ref={(el) => inputRefs.current.description = el}
                            required maxLength='1000'
                        />
                    </label>
                    {errors.description && <p>{errors.description}</p>}
                </div>
                <div>
                    <label htmlFor='price'>set a price
                        <input
                            id='price' type='number' value={price}
                            onChange={handleInputs(setPrice, 'price')}
                            ref={(el) => inputRefs.current.price = el}
                            required min='0' step='0.01'
                        />
                    </label>
                    {errors.price && <p>{errors.price}</p>}
                </div>
                <div>
                    <label htmlFor='previewImage'>images...
                        <input
                            id='previewImage' type='url' value={previewImage}
                            onChange={handleInputs(setPreviewImage, 'previewImage')}
                            ref={(el) => inputRefs.current.previewImage = el}
                        />
                        {errors.previewImage && <p>{errors.previewImage}</p>}
                        <input
                            type='url' value={imageOne}
                            onChange={(e) => setImageOne(e.target.value)}
                        />
                        <input
                            type='url'
                            value={imageTwo}
                            onChange={(e) => setImageTwo(e.target.value)}
                        />
                        <input
                            type='url'
                            value={imageThree}
                            onChange={(e) => setImageThree(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='category'>select a category..
                        <select id='category' value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required>
                            <option value=''>select a category for your product</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type='submit'>{productId ? 'Update Product' : 'Create Product'}</button>
            </form>
        </>
    ) : <Loader />;
}

export default NewProductFormPage;
