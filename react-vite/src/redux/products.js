import { csrfFetch } from "./csrf";

// define action types
/* name of the action (think url) that we want to use */
const GET_PRODUCTS = 'products/getAll';
const GET_PRODUCT = 'products/productId';
const GET_MY_PRODUCTS = 'products/current';
const CREATE_PRODUCT = 'products/new';
// edit uses the get product to reload the product after the edit
// delete uses the get products to reload all products

const GET_CATEGORIES = 'categories/getAll';
const GET_PRODUCTS_BY_CATEGORY = 'products/categories/catId'

const GET_FAVORITES = '/api/favorites'
const POST_FAVORITE = '/api/favorites/favId'
// delete uses the get favs to reload all favs

/* define actions
A function that takes in the change you want to make and sends it to the reducer along with the action type (url) */
const getProducts = (products) => ({
    type: GET_PRODUCTS,
    payload: products
})

const getMyProducts = (products) => ({
    type: GET_MY_PRODUCTS,
    payload: products
})

const getProduct = (product) => ({
    type: GET_PRODUCT,
    payload: product
})

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    payload: product
})

const getCategories = (categories) => ({
    type: GET_CATEGORIES,
    payload: categories
})

const getProductsByCategory = (payload) => ({
    type: GET_PRODUCTS_BY_CATEGORY,
    payload
})

const getUserFavorites = (payload) => ({
    type: GET_FAVORITES,
    payload
})

/* define a thunk
a function that will take in the dispatch, and whatever variable you pass into it to do a thing (call the db)
Once the call to the db for the changes you want is made, the function dispatches an action with the returned info from the db to update the store
*/

//helper function to create products object with a key of product id
const toDict = async (products) => {
    let orderedData = {};
    products.forEach(product => {
        orderedData[product.id] = product
    });
    return orderedData;
}


export const fetchProducts = () => async (dispatch) => {
    const response = await csrfFetch('/api/products');
    const data = await response.json();
    const orderedData = await toDict(data);
    dispatch(getProducts(orderedData));
    return response;
};

export const fetchUserProducts = () => async (dispatch) => {
    const response = await csrfFetch('/api/products/current');
    const data = await response.json();
    const orderedData = await toDict(data);
    dispatch(getMyProducts(orderedData));
    return response;
};

export const fetchProductId = (product_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/${product_id}`);
    const data = await response.json();
    dispatch(getProduct(data));
    return response;
};

export const fetchCreateProduct = (product) => async (dispatch) => {
    const response = await csrfFetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product)
    });
    const data = await response.json();
    dispatch(createProduct(data));
    return data;
};

export const fetchEditProduct = (product) => async (dispatch) => {
    const {product_id, name, description, price, category_id} = product
    const response = await csrfFetch(`/api/products/${product_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            description,
            price,
            category_id
        })
    });

    if (response.okay) {
        const refresh = await Promise.all([
            dispatch(fetchProductId(product_id)),
            dispatch(fetchProducts())
        ]);
        return refresh;
    }
}

export const fetchDeleteProduct = (product_id) => async (dispatch) => {
    await csrfFetch(`/api/products/${product_id}`, {
        method: 'DELETE'
    });
    const refresh = await Promise.all([
        dispatch(fetchProducts()),
        dispatch(fetchUserProducts())
    ]);
    return refresh
}

export const fetchCreateReview = (payload) => async (dispatch) => {
    const { product_id, review, star_rating } = payload
    const response = await csrfFetch(`/api/products/${product_id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review,
            star_rating
        })
    });
    if (response.okay) {
        const refresh = await Promise.all([
        dispatch(fetchProductId(product_id))
        ])
        return refresh
    }
}

export const fetchEditReview = (payload) => async (dispatch) => {
    const { product_id, review_id, review, star_rating } = payload
    const response = await csrfFetch(`/api/reviews/${review_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            review,
            star_rating
        })
    })
    if (response.okay) {
        const refresh = await Promise.all([
            dispatch(fetchProductId(product_id))
        ])
        return refresh
    }
}

export const fetchDeleteReview = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${payload.review_id}`, {
        method: 'DELETE'
    });

    if (response.okay) {
        const refresh = await Promise.all([
        dispatch(fetchProductId(payload.product_id))
        ])
        return refresh
    }
}

export const fetchCategories = () => async (dispatch) => {
    const response = await csrfFetch('/api/categories')
        const data = await response.json();
        const orderedData = await toDict(data);
        dispatch(getCategories(orderedData));
        return response;
}

export const fetchProductsByCategory = (cat_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/categories/${cat_id}`)
        const data = await response.json();
        dispatch(getProductsByCategory(data));
        return response;
}

export const fetchFavorites = () => async (dispatch) => {
    const response = await csrfFetch('/api/favorites')

    if (response.okay) {
        const data = await response.json()
        dispatch(getUserFavorites(data))
    }
}

export const fetchDeleteFavorite = (product_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/products/${product_id}`, {
        method: 'DELETE',
    });

    if (response.okay) {
        const refresh = await Promise.all([
        dispatch(fetchFavorites())
        ])
        return refresh
    }
}

/* define a default state
this will be the initial state of the store */
const initialState = {
    allProducts: {},
    currProduct: {},
    myProducts: {},
    categories: {},
    productsByCategory: {},
    favorites: {}
};

/* define the reducer
this is basically a router that will change the state based on the action type (url) that is passed in to it when called by the thunk */
const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {...state, allProducts: action.payload};
        case GET_MY_PRODUCTS:
            return {...state, myProducts: action.payload};
        case GET_PRODUCT:
            return {...state, currProduct: action.payload}
        case CREATE_PRODUCT: {
            let newState = {...state};
            newState.allProducts[action.payload.id] = action.payload
            return newState
        }
        case GET_CATEGORIES:
            return {...state, categories: action.payload}
        case GET_PRODUCTS_BY_CATEGORY:
            return {...state, productsByCategory: action.payload}
        case GET_FAVORITES:
            return {...state, favorites: action.payload}
        default:
            return state;
    }
};

export default ProductsReducer;
