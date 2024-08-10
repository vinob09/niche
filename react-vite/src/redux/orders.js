import { FaPause } from "react-icons/fa";
import { csrfFetch } from "./csrf";

//define action types
const GET_CURRENT_CART = '/api/cart/userId';
const ADD_EDIT_CART = '/api/cart/update';
const REMOVE_CART_ITEM = '/api/cart/delete'

//define actions
const getCartItems = (payload) => ({
    type: GET_CURRENT_CART,
    payload
})

const editCart = (payload) => ({
    type: ADD_TO_CART,
    payload
})

const deleteCartItems = (payload) => ({
    type: REMOVE_CART_ITEM,
    payload
})


//helper function to create products object with a key of product id
const toDict = async (payload) => {
    let orderedData = {};
    payload.forEach(item => {
        orderedData[item.id] = item
    });
    return orderedData;
}

//define thunks
export const fetchCartItems = (user_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/cart/${user_id}`);

    if (response.okay) {
        const data = await response.json();
        const orderedData = toDict(data)
        dispatch(getCartItems(orderedData))
        return orderedData;
    }
}

export const fetchAddToCart = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/cart/${payload.product_id}`, {
        method: 'POST',
        body: JSON.stringify(payload.quantity)
    });

    if (response.okay) {
        const data = await response.json();
        dispatch(editCart(data))
        return data;
    }
}

export const fetchEditItemQuantity = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/cart/${payload.product_id}`, {
        method: 'PUT',
        body: JSON.stringify(payload.quantity)
    });

    if (response.okay) {
        const data = await response.json();
        dispatch(editCart(data))
        return data;
    }
}

export const fetchDeleteCartItem = (cart_item_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/cart/${cart_item_id}`, {
        method: 'DELETE',
        body: JSON.stringify(cart_item_id)
    });

    if (response.okay) {
        const data = await response.json();
        dispatch(deleteCartItems(cart_item_id))
        return data;
    }
}

//define route and initial state
const initialState = {
    cartItems: {},
    pastOrders: {}
};

const OrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_CART:
            return {...state, cartItems: action.payload}
        case ADD_EDIT_CART: {
            const newState = {...state};
            newState.cartItems[action.payload.id] = action.payload
            return newState
        }
        case REMOVE_CART_ITEM: {
            const newState = {...state}
            delete newState.cartItems[action.payload]
            return newState
        }
        default:
            return state;
    }
};

export default OrdersReducer;
