/*
 *
 * VideoShowGame reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_LOTTIE_JSON,
    GET_LOTTIE_JSON_SUCCESS,
    GET_LOTTIE_JSON_FAILED,
} from './constants';

export const initialState = fromJS({});

function videoShowGameReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LOTTIE_JSON:
            return state
                .setIn(['lottieJson', 'loading'], true)
                .setIn(['lottieJson', 'error'], false)
                .setIn(['lottieJson', 'success'], false)
                .setIn(['lottieJson', 'data'], null);
        case GET_LOTTIE_JSON_SUCCESS:
            return state
                .setIn(['lottieJson', 'loading'], false)
                .setIn(['lottieJson', 'error'], false)
                .setIn(['lottieJson', 'success'], true)
                .setIn(['lottieJson', 'data'], action.lottieJsonData);
        case GET_LOTTIE_JSON_FAILED:
            return state
                .setIn(['lottieJson', 'loading'], false)
                .setIn(['lottieJson', 'error'], true)
                .setIn(['lottieJson', 'success'], false)
                .setIn(['lottieJson', 'data'], action.payload);
        default:
            return state;
    }
}

export default videoShowGameReducer;
