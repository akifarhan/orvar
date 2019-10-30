/*
 *
 * LoginForm actions
 *
 */

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
    GET_IMAGE_LINK,
    GET_IMAGE_LINK_SUCCESS,
    GET_IMAGE_LINK_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from './constants';

export function doLogin(loginData) {
    return {
        type: AUTH_LOGIN,
        loginData,
    };
}
export function loginSuccess(response) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        response,
    };
}
export function loginFailed(response) {
    return {
        type: AUTH_LOGIN_FAILED,
        payload: response,
    };
}
export function getImageLink() {
    return {
        type: GET_IMAGE_LINK,
    };
}
export function getImageLinkSuccess(imageLink) {
    return {
        type: GET_IMAGE_LINK_SUCCESS,
        imageLink,
    };
}
export function getImageLinkFailed() {
    return {
        type: GET_IMAGE_LINK_FAILED,
    };
}
export function resetPassword(resetData) {
    return {
        type: RESET_PASSWORD,
        resetData,
    };
}
export function resetPasswordSuccess(resetResponse) {
    return {
        type: RESET_PASSWORD_SUCCESS,
        resetResponse,
    };
}
export function resetPasswordFailed(resetResponse) {
    return {
        type: RESET_PASSWORD_FAILED,
        resetResponse,
    };
}
