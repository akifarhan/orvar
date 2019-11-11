/*
 *
 * GamesPage actions
 *
 */

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
} from './constants';

export function getResult(payload) {
    return {
        type: GET_RESULT,
        payload,
    };
}
export function getResultSuccess(resultData) {
    return {
        type: GET_RESULT_SUCCESS,
        resultData,
    };
}
export function getResultFailed(payload) {
    return {
        type: GET_RESULT_FAILED,
        payload,
    };
}


export function getGameInfo(gameParams) {
    return {
        type: GET_GAME_INFO,
        gameParams,
    };
}
export function getGameInfoSuccess(gameInfoData) {
    return {
        type: GET_GAME_INFO_SUCCESS,
        gameInfoData,
    };
}
export function getGameInfoFailed(payload) {
    return {
        type: GET_GAME_INFO_FAILED,
        payload,
    };
}


export function getGameToken(gameParams) {
    return {
        type: GET_GAME_TOKEN,
        gameParams,
    };
}
export function getGameTokenSuccess(gameTokenData) {
    return {
        type: GET_GAME_TOKEN_SUCCESS,
        gameTokenData,
    };
}
export function getGameTokenFailed(gameTokenData) {
    return {
        type: GET_GAME_TOKEN_FAILED,
        payload: gameTokenData,
    };
}

