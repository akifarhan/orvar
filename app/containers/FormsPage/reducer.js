/*
 *
 * FormsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_PRODUCT_LIST,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_FAIL,
} from './constants';

export const initialState = fromJS({
    productList: {},
});

function formsPageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_LIST:
            return state
                .setIn(['productList', 'loading'], true)
                .setIn(['productList', 'error'], false)
                .setIn(['productList', 'success'], false)
                .setIn(['productList', 'data'], null);
        case GET_PRODUCT_LIST_SUCCESS:
            return state
                .setIn(['productList', 'loading'], false)
                .setIn(['productList', 'error'], false)
                .setIn(['productList', 'success'], true)
                .setIn(['productList', 'data'], action.data);
        case GET_PRODUCT_LIST_FAIL:
            return state
                .setIn(['productList', 'loading'], false)
                .setIn(['productList', 'error'], true)
                .setIn(['productList', 'success'], false)
                .setIn(['productList', 'data'], action.payload);
        default:
            return state;
    }
}

export default formsPageReducer;
