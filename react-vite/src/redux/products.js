import { csrfFetch } from "./csrf";

// define action types
/* name of the action (think url) that we want to use */
const GET_PRODUCTS = 'products/getAll';
const GET_PRODUCT = 'products/productId';
const GET_MY_PRODUCTS = 'products/current';
const CREATE_PRODUCT = 'products/new';
// const GET_PRODUCT_REVIEWS = 'products/productId/reviews'
// const CREATE_REVIEW = 'products/productId/createReviews'
// const DELETE_REVIEW = 'reviews/reviewId'

/*uncommented out the above and functions below to bypass linter warning of unused variables*/

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

// const getProductReviews = (reviews) => ({
//     type: GET_PRODUCT_REVIEWS,
//     payload: reviews
// })

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

export const fetchDeleteProduct = (spotId) => async () => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    return Promise.all([
        dispatch(fetchProducts()),
        dispatch(fetchUserProducts())
    ]);
}


/* define a default state
this will be the initial state of the store */
const initialState = {
    allProducts: {},
    currProduct: null,
    myProducts: {},
    reviews: {},
    images: {}
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
        case CREATE_PRODUCT:
            const newState = {...state};
            newState.allProducts[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
};

export default ProductsReducer;
