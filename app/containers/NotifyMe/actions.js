/*
 *
 * NotifyMe actions
 *
 */

import {
    GET_PRODUCT_DATA,
    GET_PRODUCT_DATA_SUCCESS,
    GET_PRODUCT_DATA_FAILED,
    GET_CONFIG_DATA,
    GET_CONFIG_DATA_SUCCESS,
    GET_CONFIG_DATA_FAILED,
    POST_NOTIFY,
    POST_NOTIFY_SUCCESS,
    POST_NOTIFY_FAILED,
} from './constants';

export function getProductData({ productId }) {
    return {
        type: GET_PRODUCT_DATA,
        productId,
    };
}

export function getProductDataSuccess(restockData) {
    return {
        type: GET_PRODUCT_DATA_SUCCESS,
        restockData,
    };
}

export function getProductDataFailed(restockData) {
    return {
        type: GET_PRODUCT_DATA_FAILED,
        restockData,
    };
}

export function getConfigData() {
    return {
        type: GET_CONFIG_DATA,
    };
}
export function getConfigDataSuccess(configData) {
    return {
        type: GET_CONFIG_DATA_SUCCESS,
        configData,
    };
}
export function getConfigDataFailed(configData) {
    return {
        type: GET_CONFIG_DATA_FAILED,
        configData,
    };
}
export function postNotify(payload) {
    return {
        type: POST_NOTIFY,
        payload,
    };
}
export function postNotifySuccess(notifyData) {
    return {
        type: POST_NOTIFY_SUCCESS,
        notifyData,
    };
}
export function postNotifyFailed(notifyData) {
    return {
        type: POST_NOTIFY_FAILED,
        notifyData,
    };
}
