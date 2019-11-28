/*
 *
 * HomePage actions
 *
 */

import {
    GET_HOME_BANNER,
    GET_HOME_BANNER_SUCCESS,
    GET_HOME_BANNER_FAIL,
    GET_FLAGSHIP,
    GET_FLAGSHIP_SUCCESS,
    GET_FLAGSHIP_FAIL,
} from './constants';

export function getHomeBanner() {
    return {
        type: GET_HOME_BANNER,
    };
}
export function getHomeBannerSuccess(response) {
    return {
        type: GET_HOME_BANNER_SUCCESS,
        response,
    };
}
export function getHomeBannerFail(err) {
    return {
        type: GET_HOME_BANNER_FAIL,
        err,
    };
}
export function getFlagship() {
    return {
        type: GET_FLAGSHIP,
    };
}
export function getFlagshipSuccess(response) {
    return {
        type: GET_FLAGSHIP_SUCCESS,
        response,
    };
}
export function getFlagshipFail(err) {
    return {
        type: GET_FLAGSHIP_FAIL,
        err,
    };
}
