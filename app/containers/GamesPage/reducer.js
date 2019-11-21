/*
 *
 * GamesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_RESULT,
    GET_RESULT_SUCCESS,
    GET_RESULT_FAILED,
    GET_GAME_INFO,
    GET_GAME_INFO_SUCCESS,
    GET_GAME_INFO_FAILED,
    GET_GAME_TOKEN,
    GET_GAME_TOKEN_SUCCESS,
    GET_GAME_TOKEN_FAILED,
    GET_MEMBER_INFO,
    GET_MEMBER_INFO_SUCCESS,
    GET_MEMBER_INFO_FAILED,
} from './constants';

export const initialState = fromJS({
    result: {
        loading: false,
        error: false,
        success: false,
        data: null,
    },
    gameToken: {
        loading: false,
        error: false,
        success: false,
        data: null,
    },
    memberInfo: {
        loading: false,
        error: false,
        success: false,
        data: null,
    },
});

function gamesPageReducer(state = initialState, action) {
    switch (action.type) {
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
                .setIn(['gameToken', 'data'], action.payload);
        case GET_MEMBER_INFO:
            return state
                .setIn(['memberInfo', 'loading'], true)
                .setIn(['memberInfo', 'error'], false)
                .setIn(['memberInfo', 'success'], false)
                .setIn(['memberInfo', 'data'], null);
        case GET_MEMBER_INFO_SUCCESS:
            return state
                .setIn(['memberInfo', 'loading'], false)
                .setIn(['memberInfo', 'error'], false)
                .setIn(['memberInfo', 'success'], true)
                .setIn(['memberInfo', 'data'], action.payload);
        case GET_MEMBER_INFO_FAILED:
            return state
                .setIn(['memberInfo', 'loading'], false)
                .setIn(['memberInfo', 'error'], true)
                .setIn(['memberInfo', 'success'], false)
                .setIn(['memberInfo', 'data'], action.payload);
        default:
            return state;
    }
}

export default gamesPageReducer;
