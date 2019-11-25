/*
 *
 * ProductDescription reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILED,
} from './constants';

export const initialState = fromJS({
    product: {
        loading: false,
        error: false,
        success: false,
        data: null,
    },
});

function productDescriptionReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return state
                .setIn(['product', 'loading'], true)
                .setIn(['product', 'success'], false)
                .setIn(['product', 'error'], false)
                .setIn(['product', 'data'], null);
        case GET_PRODUCT_SUCCESS:
            return state
                .setIn(['product', 'success'], true)
                .setIn(['product', 'loading'], false)
                .setIn(['product', 'error'], false)
                .setIn(['product', 'data'], action.productData);
        case GET_PRODUCT_FAILED:
            return state
                .setIn(['product', 'loading'], false)
                .setIn(['product', 'success'], false)
                .setIn(['product', 'error'], true)
                .setIn(['product', 'data'], action.productData);
        default:
            return state;
    }
}

export default productDescriptionReducer;
