/*
 *
 * ProductInfo actions
 *
 */

import {
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILED,
} from './constants';

export function getProduct(productId) {
    return {
        type: GET_PRODUCT,
        productId,
    };
}

export function getProductSuccess(productData) {
    return {
        type: GET_PRODUCT_SUCCESS,
        productData,
    };
}
export function getProductFailed(productData) {
    return {
        type: GET_PRODUCT_FAILED,
        productData,
    };
}
