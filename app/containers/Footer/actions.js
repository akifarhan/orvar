/*
 *
 * Footer actions
 *
 */

import {
    GET_FOOTER_LAYOUT,
    GET_FOOTER_LAYOUT_SUCCESS,
    GET_FOOTER_LAYOUT_FAIL,
} from './constants';

export function getFooterLayout() {
    return {
        type: GET_FOOTER_LAYOUT,
    };
}
export function getFooterLayoutSuccess(response) {
    return {
        type: GET_FOOTER_LAYOUT_SUCCESS,
        response,
    };
}
export function getFooterLayoutFail(err) {
    return {
        type: GET_FOOTER_LAYOUT_FAIL,
        err,
    };
}
