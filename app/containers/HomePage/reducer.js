/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_HOME_BANNER,
    GET_HOME_BANNER_SUCCESS,
    GET_HOME_BANNER_FAIL,
    GET_FLAGSHIP,
    GET_FLAGSHIP_SUCCESS,
    GET_FLAGSHIP_FAIL,
} from './constants';

export const initialState = fromJS({
    homeBanner: {
        data: null,
        loading: false,
        error: false,
    },
    flagship: {
        data: null,
        loading: false,
        error: false,
    },
});

function homePageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HOME_BANNER:
            return state
                .setIn(['homeBanner', 'loading'], true)
                .setIn(['homeBanner', 'error'], false);
        case GET_HOME_BANNER_SUCCESS:
            return state
                .setIn(['homeBanner', 'loading'], false)
                .setIn(['homeBanner', 'error'], false)
                .setIn(['homeBanner', 'data'], action.response);
        case GET_HOME_BANNER_FAIL:
            return state
                .setIn(['homeBanner', 'loading'], false)
                .setIn(['homeBanner', 'error'], true)
                .setIn(['homeBanner', 'data'], action.err);
        case GET_FLAGSHIP:
            return state
                .setIn(['flagship', 'loading'], true)
                .setIn(['flagship', 'error'], false);
        case GET_FLAGSHIP_SUCCESS:
            return state
                .setIn(['flagship', 'loading'], false)
                .setIn(['flagship', 'error'], false)
                .setIn(['flagship', 'data'], action.response);
        case GET_FLAGSHIP_FAIL:
            return state
                .setIn(['flagship', 'loading'], false)
                .setIn(['flagship', 'error'], true)
                .setIn(['flagship', 'data'], action.err);
        default:
            return state;
    }
}

export default homePageReducer;
