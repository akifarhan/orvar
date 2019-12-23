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
    GET_TWOH,
    GET_TWOH_SUCCESS,
    GET_TWOH_FAIL,
    GET_NEW_ARRIVAL,
    GET_NEW_ARRIVAL_SUCCESS,
    GET_NEW_ARRIVAL_FAIL,
    GET_TRENDING,
    GET_TRENDING_SUCCESS,
    GET_TRENDING_FAIL,
    GET_SPONSORED,
    GET_SPONSORED_SUCCESS,
    GET_SPONSORED_FAIL,
    GET_EXTENSION,
    GET_EXTENSION_SUCCESS,
    GET_EXTENSION_FAIL,
    GET_PERSONALISATION,
    GET_PERSONALISATION_SUCCESS,
    GET_PERSONALISATION_FAIL,
    GET_REVIEW,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAIL,
    GET_FOOTER_LAYOUT,
    GET_FOOTER_LAYOUT_SUCCESS,
    GET_FOOTER_LAYOUT_FAIL,
    GET_FOOTER_IMAGE,
    GET_FOOTER_IMAGE_SUCCESS,
    GET_FOOTER_IMAGE_FAIL,
    GET_FOOTER_PARTNER,
    GET_FOOTER_PARTNER_SUCCESS,
    GET_FOOTER_PARTNER_FAIL,
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
export function getTwoh() {
    return {
        type: GET_TWOH,
    };
}
export function getTwohSuccess(response) {
    return {
        type: GET_TWOH_SUCCESS,
        response,
    };
}
export function getTwohFail(err) {
    return {
        type: GET_TWOH_FAIL,
        err,
    };
}
export function getNewArrival() {
    return {
        type: GET_NEW_ARRIVAL,
    };
}
export function getNewArrivalSuccess(response) {
    return {
        type: GET_NEW_ARRIVAL_SUCCESS,
        response,
    };
}
export function getNewArrivalFail(err) {
    return {
        type: GET_NEW_ARRIVAL_FAIL,
        err,
    };
}
export function getTrending() {
    return {
        type: GET_TRENDING,
    };
}
export function getTrendingSuccess(response) {
    return {
        type: GET_TRENDING_SUCCESS,
        response,
    };
}
export function getTrendingFail(err) {
    return {
        type: GET_TRENDING_FAIL,
        err,
    };
}
export function getSponsored() {
    return {
        type: GET_SPONSORED,
    };
}
export function getSponsoredSuccess(response) {
    return {
        type: GET_SPONSORED_SUCCESS,
        response,
    };
}
export function getSponsoredFail(err) {
    return {
        type: GET_SPONSORED_FAIL,
        err,
    };
}
export function getExtension() {
    return {
        type: GET_EXTENSION,
    };
}
export function getExtensionSuccess(response) {
    return {
        type: GET_EXTENSION_SUCCESS,
        response,
    };
}
export function getExtensionFail(err) {
    return {
        type: GET_EXTENSION_FAIL,
        err,
    };
}
export function getPersonalisation() {
    return {
        type: GET_PERSONALISATION,
    };
}
export function getPersonalisationSuccess(response) {
    return {
        type: GET_PERSONALISATION_SUCCESS,
        response,
    };
}
export function getPersonalisationFail(err) {
    return {
        type: GET_PERSONALISATION_FAIL,
        err,
    };
}
export function getReview() {
    return {
        type: GET_REVIEW,
    };
}
export function getReviewSuccess(response) {
    return {
        type: GET_REVIEW_SUCCESS,
        response,
    };
}
export function getReviewFail(err) {
    return {
        type: GET_REVIEW_FAIL,
        err,
    };
}
export function getFooterLayout() {
    return {
        type: GET_FOOTER_LAYOUT,
    };
}
export function getFooterLayoutSuccess(response) {
    return {
        type: GET_FOOTER_LAYOUT_SUCCESS,
        response,
    };
}
export function getFooterLayoutFail(err) {
    return {
        type: GET_FOOTER_LAYOUT_FAIL,
        err,
    };
}
export function getFooterImage() {
    return {
        type: GET_FOOTER_IMAGE,
    };
}
export function getFooterImageSuccess(response) {
    return {
        type: GET_FOOTER_IMAGE_SUCCESS,
        response,
    };
}
export function getFooterImageFail(err) {
    return {
        type: GET_FOOTER_IMAGE_FAIL,
        err,
    };
}
export function getFooterPartner() {
    return {
        type: GET_FOOTER_PARTNER,
    };
}
export function getFooterPartnerSuccess(response) {
    return {
        type: GET_FOOTER_PARTNER_SUCCESS,
        response,
    };
}
export function getFooterPartnerFail(err) {
    return {
        type: GET_FOOTER_PARTNER_FAIL,
        err,
    };
}
