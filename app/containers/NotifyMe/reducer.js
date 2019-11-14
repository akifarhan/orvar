/*
 *
 * NotifyMe reducer
 *
 */

import { fromJS } from 'immutable';
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

export const initialState = fromJS({
    restock: {
        error: false,
        success: false,
        data: null,
    },
    config: {
        error: false,
        success: false,
        data: null,
    },
    notify: {
        loading: false,
        error: false,
        success: false,
        data: null,
    },
    loading: false,
});

function notifyMeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_DATA:
            return state
                .set('loading', true)
                .setIn(['restock', 'error'], false)
                .setIn(['restock', 'success'], false)
                .setIn(['restock', 'data'], null);
        case GET_PRODUCT_DATA_SUCCESS:
            return state
                .set('loading', false)
                .setIn(['restock', 'error'], false)
                .setIn(['restock', 'success'], true)
                .setIn(['restock', 'data'], action.restockData);
        case GET_PRODUCT_DATA_FAILED:
            return state
                .set('loading', false)
                .setIn(['restock', 'success'], false)
                .setIn(['restock', 'error'], true)
                .setIn(['restock', 'data'], action.restockData);
        case GET_CONFIG_DATA:
            return state
                .set('loading', true)
                .setIn(['config', 'success'], false)
                .setIn(['config', 'error'], false);
        case GET_CONFIG_DATA_SUCCESS:
            return state
                .set('loading', false)
                .setIn(['config', 'success'], true)
                .setIn(['config', 'error'], false)
                .setIn(['config', 'data'], action.configData);
        case GET_CONFIG_DATA_FAILED:
            return state
                .set('loading', false)
                .setIn(['config', 'success'], false)
                .setIn(['config', 'error'], true)
                .setIn(['config', 'data'], action.configData);
        case POST_NOTIFY:
            return state
                .setIn(['notify', 'loading'], true)
                .setIn(['notify', 'success'], false)
                .setIn(['notify', 'error'], false);
        case POST_NOTIFY_SUCCESS:
            return state
                .setIn(['notify', 'loading'], false)
                .setIn(['notify', 'success'], true)
                .setIn(['notify', 'error'], false)
                .setIn(['notify', 'data'], action.notifyData);
        case POST_NOTIFY_FAILED:
            return state
                .setIn(['notify', 'loading'], false)
                .setIn(['notify', 'success'], false)
                .setIn(['notify', 'error'], action.notifyData || {
                    messages: [{
                        text: 'ERROR: Please contact system admin...',
                        type: 'error',
                    }],
                });
        default:
            return state;
    }
}

export default notifyMeReducer;
