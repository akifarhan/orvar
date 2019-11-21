/*
 *
 * VideoShowGame actions
 *
 */

import {
    GET_LOTTIE_JSON,
    GET_LOTTIE_JSON_SUCCESS,
    GET_LOTTIE_JSON_FAILED,
} from './constants';

export function getLottieJson(params) {
    return {
        type: GET_LOTTIE_JSON,
        params,
    };
}
export function getLottieJsonSuccess(lottieJsonData) {
    return {
        type: GET_LOTTIE_JSON_SUCCESS,
        lottieJsonData,
    };
}
export function getLottieJsonFailed(payload) {
    return {
        type: GET_LOTTIE_JSON_FAILED,
        payload,
    };
}
