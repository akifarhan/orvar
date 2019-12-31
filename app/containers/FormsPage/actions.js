/*
 *
 * FormsPage actions
 *
 */

import {
    GET_PRODUCT_LIST,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_FAIL,
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
