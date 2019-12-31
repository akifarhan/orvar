/*
 *
 * FormsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_TIME_TABLE,
    GET_TIME_TABLE_SUCCESS,
    GET_TIME_TABLE_FAIL,
    GET_CHECKOUT_DATA,
    GET_CHECKOUT_DATA_SUCCESS,
    GET_CHECKOUT_DATA_FAIL,
    GET_CONFIG,
    GET_CONFIG_SUCCESS,
    GET_CONFIG_FAIL,
    SEND_OTP,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAIL,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
    ADD_ADDRESS,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAIL,
    ADD_TO_CART,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
} from './constants';

export const initialState = fromJS({
    timeTable: {},
    checkoutData: {},
    config: {},
    otp: {},
    signup: {},
    addAddress: {},
    addToCart: {},
});

function formsPageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TIME_TABLE:
            return state
                .setIn(['timeTable', 'loading'], true)
                .setIn(['timeTable', 'error'], false)
                .setIn(['timeTable', 'success'], false)
                .setIn(['timeTable', 'data'], null);
        case GET_TIME_TABLE_SUCCESS:
            return state
                .setIn(['timeTable', 'loading'], false)
                .setIn(['timeTable', 'error'], false)
                .setIn(['timeTable', 'success'], true)
                .setIn(['timeTable', 'data'], action.data);
        case GET_TIME_TABLE_FAIL:
            return state
                .setIn(['timeTable', 'loading'], false)
                .setIn(['timeTable', 'error'], true)
                .setIn(['timeTable', 'success'], false)
                .setIn(['timeTable', 'data'], action.payload);
        case GET_CHECKOUT_DATA:
            return state
                .setIn(['checkoutData', 'loading'], true)
                .setIn(['checkoutData', 'error'], false)
                .setIn(['checkoutData', 'success'], false)
                .setIn(['checkoutData', 'data'], null);
        case GET_CHECKOUT_DATA_SUCCESS:
            return state
                .setIn(['checkoutData', 'loading'], false)
                .setIn(['checkoutData', 'error'], false)
                .setIn(['checkoutData', 'success'], true)
                .setIn(['checkoutData', 'data'], action.data);
        case GET_CHECKOUT_DATA_FAIL:
            return state
                .setIn(['checkoutData', 'loading'], false)
                .setIn(['checkoutData', 'error'], true)
                .setIn(['checkoutData', 'success'], false)
                .setIn(['checkoutData', 'data'], action.payload);
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
        case SIGNUP_USER:
            return state
                .setIn(['signup', 'loading'], true)
                .setIn(['signup', 'error'], false)
                .setIn(['signup', 'success'], false)
                .setIn(['signup', 'data'], null);
        case SIGNUP_USER_SUCCESS:
            return state
                .setIn(['signup', 'loading'], false)
                .setIn(['signup', 'error'], false)
                .setIn(['signup', 'success'], true)
                .setIn(['signup', 'data'], action.data);
        case SIGNUP_USER_FAIL:
            return state
                .setIn(['signup', 'loading'], false)
                .setIn(['signup', 'error'], true)
                .setIn(['signup', 'success'], false)
                .setIn(['signup', 'data'], action.payload);
        case ADD_ADDRESS:
            return state
                .setIn(['addAddress', 'loading'], true)
                .setIn(['addAddress', 'error'], false)
                .setIn(['addAddress', 'success'], false)
                .setIn(['addAddress', 'data'], null);
        case ADD_ADDRESS_SUCCESS:
            return state
                .setIn(['addAddress', 'loading'], false)
                .setIn(['addAddress', 'error'], false)
                .setIn(['addAddress', 'success'], true)
                .setIn(['addAddress', 'data'], action.data);
        case ADD_ADDRESS_FAIL:
            return state
                .setIn(['addAddress', 'loading'], false)
                .setIn(['addAddress', 'error'], true)
                .setIn(['addAddress', 'success'], false)
                .setIn(['addAddress', 'data'], action.payload);
        case ADD_TO_CART:
            return state
                .setIn(['addToCart', 'loading'], true)
                .setIn(['addToCart', 'error'], false)
                .setIn(['addToCart', 'success'], false)
                .setIn(['addToCart', 'data'], null);
        case ADD_TO_CART_SUCCESS:
            return state
                .setIn(['addToCart', 'loading'], false)
                .setIn(['addToCart', 'error'], false)
                .setIn(['addToCart', 'success'], true)
                .setIn(['addToCart', 'data'], action.data);
        case ADD_TO_CART_FAIL:
            return state
                .setIn(['addToCart', 'loading'], false)
                .setIn(['addToCart', 'error'], true)
                .setIn(['addToCart', 'success'], false)
                .setIn(['addToCart', 'data'], action.payload);
        default:
            return state;
    }
}

export default formsPageReducer;
