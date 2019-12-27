/*
 *
 * FormsPage actions
 *
 */

import {
    GET_TIME_TABLE,
    GET_TIME_TABLE_SUCCESS,
    GET_TIME_TABLE_FAIL,
    GET_CHECKOUT_DATA,
    GET_CHECKOUT_DATA_SUCCESS,
    GET_CHECKOUT_DATA_FAIL,
    GET_PHONE_PREFIX,
    GET_PHONE_PREFIX_SUCCESS,
    GET_PHONE_PREFIX_FAIL,
    SEND_OTP,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAIL,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAIL,
} from './constants';

export function getTimeTable(params) {
    return {
        type: GET_TIME_TABLE,
        params,
    };
}

export function getTimeTableSuccess(data) {
    return {
        type: GET_TIME_TABLE_SUCCESS,
        data,
    };
}

export function getTimeTableFail(payload) {
    return {
        type: GET_TIME_TABLE_FAIL,
        payload,
    };
}

export function getCheckoutData(params) {
    return {
        type: GET_CHECKOUT_DATA,
        params,
    };
}

export function getCheckoutDataSuccess(data) {
    return {
        type: GET_CHECKOUT_DATA_SUCCESS,
        data,
    };
}

export function getCheckoutDataFail(payload) {
    return {
        type: GET_CHECKOUT_DATA_FAIL,
        payload,
    };
}

export function getPhonePrefix(params) {
    return {
        type: GET_PHONE_PREFIX,
        params,
    };
}

export function getPhonePrefixSuccess(data) {
    return {
        type: GET_PHONE_PREFIX_SUCCESS,
        data,
    };
}

export function getPhonePrefixFail(payload) {
    return {
        type: GET_PHONE_PREFIX_FAIL,
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

export function signupUser(params) {
    return {
        type: SIGNUP_USER,
        params,
    };
}

export function signupUserSuccess(data) {
    return {
        type: SIGNUP_USER_SUCCESS,
        data,
    };
}

export function signupUserFail(payload) {
    return {
        type: SIGNUP_USER_FAIL,
        payload,
    };
}
