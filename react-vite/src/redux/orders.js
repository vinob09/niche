import { csrfFetch } from "./csrf";

//define action types
const GET_CURRENT_CART = '/api/cart/userId'

//define actions
const getCartItems = (payload) => ({
    type: GET_CURRENT_CART,
    payload
})

//define thunks
export const fetchCartItems = (user_id) => async (dispatch) => {
    const response = await csrfFetch(`/api/cart/${user_id}`);

    if (response.okay) {
        const data = await response.json();
        dispatch(getCartItems(data))
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
        default:
            return state;
    }
};

export default OrdersReducer;
