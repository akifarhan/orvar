/*
 *
 * FormsPage actions
 *
 */

import {
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
} from './constants';

export function getProductList(params) {
    return {
        type: GET_PRODUCT_LIST,
        params,
    };
}

export function getProductListSuccess(data) {
    return {
        type: GET_PRODUCT_LIST_SUCCESS,
        data,
    };
}

export function getProductListFail(payload) {
    return {
        type: GET_PRODUCT_LIST_FAIL,
        payload,
    };
}

export function getProduct(params) {
    return {
        type: GET_PRODUCT,
        params,
    };
}

export function getProductSuccess(data) {
    return {
        type: GET_PRODUCT_SUCCESS,
        data,
    };
}

export function getProductFail(payload) {
    return {
        type: GET_PRODUCT_FAIL,
        payload,
    };
}

export function getConfig() {
    return {
        type: GET_CONFIG,
    };
}

export function getConfigSuccess(data) {
    return {
        type: GET_CONFIG_SUCCESS,
        data,
    };
}

export function getConfigFail(payload) {
    return {
        type: GET_CONFIG_FAIL,
        payload,
    };
}

export function sendOTP(params) {
    return {
        type: SEND_OTP,
        params,
    };
}

export function sendOTPSuccess(data) {
    return {
        type: SEND_OTP_SUCCESS,
        data,
    };
}

export function sendOTPFail(payload) {
    return {
        type: SEND_OTP_FAIL,
        payload,
    };
}

export function signUp(params) {
    return {
        type: SIGN_UP,
        params,
    };
}

export function signUpSuccess(data) {
    return {
        type: SIGN_UP_SUCCESS,
        data,
    };
}

export function signUpFail(payload) {
    return {
        type: SIGN_UP_FAIL,
        payload,
    };
}

export function addAddress(params) {
    return {
        type: ADD_ADDRESS,
        params,
    };
}

export function addAddressSuccess(data) {
    return {
        type: ADD_ADDRESS_SUCCESS,
        data,
    };
}

export function addAddressFail(payload) {
    return {
        type: ADD_ADDRESS_FAIL,
        payload,
    };
}
