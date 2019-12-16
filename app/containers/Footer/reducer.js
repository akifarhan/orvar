/*
 *
 * Footer reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_FOOTER_LAYOUT,
    GET_FOOTER_LAYOUT_SUCCESS,
    GET_FOOTER_LAYOUT_FAIL,
} from './constants';

export const initialState = fromJS({
    layout: {
        data: null,
        loading: false,
        error: false,
    },
});

function footerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FOOTER_LAYOUT:
            return state
                .setIn(['layout', 'loading'], true)
                .setIn(['layout', 'error'], false);
        case GET_FOOTER_LAYOUT_SUCCESS:
            return state
                .setIn(['layout', 'loading'], false)
                .setIn(['layout', 'error'], false)
                .setIn(['layout', 'data'], action.response);
        case GET_FOOTER_LAYOUT_FAIL:
            return state
                .setIn(['layout', 'loading'], false)
                .setIn(['layout', 'error'], true)
                .setIn(['layout', 'data'], action.err);
        default:
            return state;
    }
}

export default footerReducer;
