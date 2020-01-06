/*
 *
 * FormsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    UPDATE_CART,
    GET_PRODUCT_LIST,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_FAIL,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_CONFIG,
    GET_CONFIG_SUCCESS,
    GET_CONFIG_FAIL,
    SEND_OTP,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAIL,
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    ADD_ADDRESS,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAIL,
    ADD_TO_CART,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    CHECKOUT,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAIL,
    POST_CHECKOUT,
    POST_CHECKOUT_SUCCESS,
    POST_CHECKOUT_FAIL,
} from './constants';

export const initialState = fromJS({
    cart: null,
    loading: {
        status: false,
    },
    productList: {},
    product: {},
    config: {},
    otp: {},
    signup: {},
    addAddress: {},
    addToCart: {},
    checkout: {},
    postCheckout: {},
});

function formsPageReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CART:
            return state
                .set('cart', action.data);
        case GET_PRODUCT_LIST:
            return state
                .setIn(['loading', 'status'], true)
                .setIn(['loading', 'message'], null)
                .setIn(['productList', 'error'], false)
                .setIn(['productList', 'success'], false)
                .setIn(['productList', 'data'], null);
        case GET_PRODUCT_LIST_SUCCESS:
            return state
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['productList', 'error'], false)
                .setIn(['productList', 'success'], true)
                .setIn(['productList', 'data'], action.data);
        case GET_PRODUCT_LIST_FAIL:
            return state
                .setIn(['loading', 'status'], true)
                .setIn(['loading', 'message'], null)
                .setIn(['productList', 'error'], true)
                .setIn(['productList', 'success'], false)
                .setIn(['productList', 'data'], action.payload);
        case GET_PRODUCT:
            return state
                .setIn(['loading', 'status'], true)
                .setIn(['loading', 'message'], null)
                .setIn(['product', 'error'], false)
                .setIn(['product', 'success'], false)
                .setIn(['product', 'data'], null);
        case GET_PRODUCT_SUCCESS:
            return state
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['product', 'error'], false)
                .setIn(['product', 'success'], true)
                .setIn(['product', 'data'], action.data);
        case GET_PRODUCT_FAIL:
            return state
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['product', 'error'], true)
                .setIn(['product', 'success'], false)
                .setIn(['product', 'data'], action.payload);
        case GET_CONFIG:
            return state
                .setIn(['config', 'loading'], true)
                .setIn(['config', 'error'], false)
                .setIn(['config', 'success'], false)
                .setIn(['config', 'data'], null);
        case GET_CONFIG_SUCCESS:
            return state
                .setIn(['config', 'loading'], false)
                .setIn(['config', 'error'], false)
                .setIn(['config', 'success'], true)
                .setIn(['config', 'data'], action.data);
        case GET_CONFIG_FAIL:
            return state
                .setIn(['config', 'loading'], false)
                .setIn(['config', 'error'], true)
                .setIn(['config', 'success'], false)
                .setIn(['config', 'data'], action.payload);
        case SEND_OTP:
            return state
                .setIn(['otp', 'loading'], true)
                .setIn(['otp', 'error'], false)
                .setIn(['otp', 'success'], false)
                .setIn(['otp', 'data'], null);
        case SEND_OTP_SUCCESS:
            return state
                .setIn(['otp', 'loading'], false)
                .setIn(['otp', 'error'], false)
                .setIn(['otp', 'success'], true)
                .setIn(['otp', 'data'], action.data);
        case SEND_OTP_FAIL:
            return state
                .setIn(['otp', 'loading'], false)
                .setIn(['otp', 'error'], true)
                .setIn(['otp', 'success'], false)
                .setIn(['otp', 'data'], action.payload);
        case SIGN_UP:
            return state
                .setIn(['signup', 'loading'], true)
                .setIn(['signup', 'error'], false)
                .setIn(['signup', 'success'], false)
                .setIn(['signup', 'data'], null);
        case SIGN_UP_SUCCESS:
            return state
                .setIn(['signup', 'loading'], false)
                .setIn(['signup', 'error'], false)
                .setIn(['signup', 'success'], true)
                .setIn(['signup', 'data'], action.data);
        case SIGN_UP_FAIL:
            return state
                .setIn(['signup', 'loading'], false)
                .setIn(['signup', 'error'], true)
                .setIn(['signup', 'success'], false)
                .setIn(['signup', 'data'], action.payload);
        case ADD_ADDRESS:
            return state
                .setIn(['loading', 'status'], true)
                .setIn(['loading', 'message'], 'Adding address')
                .setIn(['addAddress', 'error'], false)
                .setIn(['addAddress', 'success'], false)
                .setIn(['addAddress', 'data'], null);
        case ADD_ADDRESS_SUCCESS:
            return state
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['addAddress', 'error'], false)
                .setIn(['addAddress', 'success'], true)
                .setIn(['addAddress', 'data'], action.data);
        case ADD_ADDRESS_FAIL:
            return state
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['addAddress', 'error'], true)
                .setIn(['addAddress', 'success'], false)
                .setIn(['addAddress', 'data'], action.payload);
        case ADD_TO_CART:
            return state
                .setIn(['loading', 'status'], true)
                .setIn(['loading', 'message'], 'Adding item into cart')
                .setIn(['addToCart', 'error'], false)
                .setIn(['addToCart', 'success'], false)
                .setIn(['addToCart', 'data'], null);
        case ADD_TO_CART_SUCCESS:
            return state
                .set('cart', action.cart)
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['addToCart', 'error'], false)
                .setIn(['addToCart', 'success'], true)
                .setIn(['addToCart', 'data'], action.data);
        case ADD_TO_CART_FAIL:
            return state
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['addToCart', 'error'], true)
                .setIn(['addToCart', 'success'], false)
                .setIn(['addToCart', 'data'], action.payload);
        case CHECKOUT:
            return state
                .setIn(['loading', 'status'], true)
                .setIn(['loading', 'message'], 'Checking out')
                .setIn(['checkout', 'error'], false)
                .setIn(['checkout', 'success'], false)
                .setIn(['checkout', 'data'], null);
        case CHECKOUT_SUCCESS:
            return state
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['checkout', 'error'], false)
                .setIn(['checkout', 'success'], true)
                .setIn(['checkout', 'data'], action.data);
        case CHECKOUT_FAIL:
            return state
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['checkout', 'error'], true)
                .setIn(['checkout', 'success'], false)
                .setIn(['checkout', 'data'], action.payload);
        case POST_CHECKOUT:
            return state
                .setIn(['loading', 'status'], true)
                .setIn(['loading', 'message'], 'Creating order...')
                .setIn(['postCheckout', 'error'], false)
                .setIn(['postCheckout', 'success'], false)
                .setIn(['postCheckout', 'data'], null);
        case POST_CHECKOUT_SUCCESS:
            return state
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['postCheckout', 'error'], false)
                .setIn(['postCheckout', 'success'], true)
                .setIn(['postCheckout', 'data'], action.data);
        case POST_CHECKOUT_FAIL:
            return state
                .setIn(['loading', 'status'], false)
                .setIn(['loading', 'message'], null)
                .setIn(['postCheckout', 'error'], true)
                .setIn(['postCheckout', 'success'], false)
                .setIn(['postCheckout', 'data'], action.payload);
        default:
            return state;
    }
}

export default formsPageReducer;
