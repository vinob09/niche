import { csrfFetch } from "./csrf";

// define action types
/* name of the action (think url) that we want to use */
const GET_PRODUCTS = 'products/getAll';
// const GET_PRODUCT = 'products/productId';
// const GET_MY_PRODUCTS = 'products/current'
// const CREATE_PRODUCT = 'products/new'
// // const DELETE_PRODUCT = 'products/productId/delete';
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

// const getMyProducts = (products) => ({
//     type: GET_MY_PRODUCTS,
//     payload: products
// })

// const getProduct = (product) => ({
//     type: GET_PRODUCT,
//     payload: product
// })

// const getProductReviews = (reviews) => ({
//     type: GET_PRODUCT_REVIEWS,
//     payload: reviews
// })

// const createProduct = (product) => ({
//     type: CREATE_PRODUCT,
//     payload: product
// })

/* define a thunk
a function that will take in the dispatch, and whatever variable you pass into it to do a thing (call the db)
Once the call to the db for the changes you want is made, the function dispatches an action with the returned info from the db to update the store
*/
export const fetchProducts = () => async (dispatch) => {
    const response = await csrfFetch('/api/products');
    const data = await response.json();
    dispatch(getProducts(data))
    return response
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
        default:
            return state;
    }
};

export default ProductsReducer;
