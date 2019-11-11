/*
 *
 * GamesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
    GET_RESULT,
    GET_RESULT_SUCCESS,
    GET_RESULT_FAILED,
    GET_GAME_INFO,
    GET_GAME_INFO_SUCCESS,
    GET_GAME_INFO_FAILED,
    GET_GAME_TOKEN,
    GET_GAME_TOKEN_SUCCESS,
    GET_GAME_TOKEN_FAILED,
} from './constants';

export const initialState = fromJS({
    login: {
        loading: false,
        error: false,
        success: false,
    },
    result: {
        loading: false,
        error: false,
        success: false,
    },
    gameToken: {
        loading: false,
        error: false,
        success: false,
    },
});

function gamesPageReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return state
                .setIn(['login', 'loading'], true)
                .setIn(['login', 'error'], false)
                .setIn(['login', 'success'], false)
                .setIn(['login', 'data'], null);
        case AUTH_LOGIN_SUCCESS:
            return state
                .setIn(['login', 'loading'], false)
                .setIn(['login', 'error'], false)
                .setIn(['login', 'success'], true)
                .setIn(['login', 'data'], action.data);
        case AUTH_LOGIN_FAILED:
            return state
                .setIn(['login', 'loading'], false)
                .setIn(['login', 'error'], true)
                .setIn(['login', 'success'], false)
                .setIn(['login', 'data'], action.payload);
        case GET_RESULT:
            return state
                .setIn(['result', 'loading'], true)
                .setIn(['result', 'error'], false)
                .setIn(['result', 'success'], false)
                .setIn(['result', 'data'], null);
        case GET_RESULT_SUCCESS:
            return state
                .setIn(['result', 'loading'], false)
                .setIn(['result', 'error'], false)
                .setIn(['result', 'success'], true)
                .setIn(['result', 'data'], action.resultData);
        case GET_RESULT_FAILED:
            return state
                .setIn(['result', 'loading'], false)
                .setIn(['result', 'error'], true)
                .setIn(['result', 'success'], false)
                .setIn(['result', 'data'], action.payload);
        case GET_GAME_INFO:
            return state
                .setIn(['gameInfo', 'loading'], true)
                .setIn(['gameInfo', 'error'], false)
                .setIn(['gameInfo', 'success'], false)
                .setIn(['gameInfo', 'data'], null);
        case GET_GAME_INFO_SUCCESS:
            return state
                .setIn(['gameInfo', 'loading'], false)
                .setIn(['gameInfo', 'error'], false)
                .setIn(['gameInfo', 'success'], true)
                .setIn(['gameInfo', 'data'], action.gameInfoData);
        case GET_GAME_INFO_FAILED:
            return state
                .setIn(['gameInfo', 'loading'], false)
                .setIn(['gameInfo', 'error'], true)
                .setIn(['gameInfo', 'success'], false)
                .setIn(['gameInfo', 'data'], action.payload);
        case GET_GAME_TOKEN:
            return state
                .setIn(['gameToken', 'loading'], true)
                .setIn(['gameToken', 'error'], false)
                .setIn(['gameToken', 'success'], false)
                .setIn(['gameToken', 'data'], null);
        case GET_GAME_TOKEN_SUCCESS:
            return state
                .setIn(['gameToken', 'loading'], false)
                .setIn(['gameToken', 'error'], false)
                .setIn(['gameToken', 'success'], true)
                .setIn(['gameToken', 'data'], action.gameTokenData);
        case GET_GAME_TOKEN_FAILED:
            return state
                .setIn(['gameToken', 'loading'], false)
                .setIn(['gameToken', 'error'], true)
                .setIn(['gameToken', 'success'], false)
                .setIn(['gameToken', 'data'], action.gameTokenData);
        default:
            return state;
    }
}

export default gamesPageReducer;
