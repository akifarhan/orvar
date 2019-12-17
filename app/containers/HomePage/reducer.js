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
    twoh: {
        data: null,
        loading: false,
        error: false,
    },
    newArrival: {
        data: null,
        loading: false,
        error: false,
    },
    trending: {
        data: null,
        loading: false,
        error: false,
    },
    sponsored: {
        data: null,
        loading: false,
        error: false,
    },
    extension: {
        data: null,
        loading: false,
        error: false,
    },
    personalisation: {
        data: null,
        loading: false,
        error: false,
    },
    review: {
        data: null,
        loading: false,
        error: false,
    },
    footerLayout: {
        data: null,
        loading: false,
        error: false,
    },
    footerImage: {
        data: null,
        loading: false,
        error: false,
    },
    footerPartner: {
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
        case GET_TWOH:
            return state
                .setIn(['twoh', 'loading'], true)
                .setIn(['twoh', 'error'], false);
        case GET_TWOH_SUCCESS:
            return state
                .setIn(['twoh', 'loading'], false)
                .setIn(['twoh', 'error'], false)
                .setIn(['twoh', 'data'], action.response);
        case GET_TWOH_FAIL:
            return state
                .setIn(['twoh', 'loading'], false)
                .setIn(['twoh', 'error'], true)
                .setIn(['twoh', 'data'], action.err);
        case GET_NEW_ARRIVAL:
            return state
                .setIn(['newArrival', 'loading'], true)
                .setIn(['newArrival', 'error'], false);
        case GET_NEW_ARRIVAL_SUCCESS:
            return state
                .setIn(['newArrival', 'loading'], false)
                .setIn(['newArrival', 'error'], false)
                .setIn(['newArrival', 'data'], action.response);
        case GET_NEW_ARRIVAL_FAIL:
            return state
                .setIn(['trending', 'loading'], false)
                .setIn(['trending', 'error'], true)
                .setIn(['trending', 'data'], action.err);
        case GET_TRENDING:
            return state
                .setIn(['trending', 'loading'], true)
                .setIn(['trending', 'error'], false);
        case GET_TRENDING_SUCCESS:
            return state
                .setIn(['trending', 'loading'], false)
                .setIn(['trending', 'error'], false)
                .setIn(['trending', 'data'], action.response);
        case GET_TRENDING_FAIL:
            return state
                .setIn(['trending', 'loading'], false)
                .setIn(['trending', 'error'], true)
                .setIn(['trending', 'data'], action.err);
        case GET_SPONSORED:
            return state
                .setIn(['sponsored', 'loading'], true)
                .setIn(['sponsored', 'error'], false);
        case GET_SPONSORED_SUCCESS:
            return state
                .setIn(['sponsored', 'loading'], false)
                .setIn(['sponsored', 'error'], false)
                .setIn(['sponsored', 'data'], action.response);
        case GET_SPONSORED_FAIL:
            return state
                .setIn(['sponsored', 'loading'], false)
                .setIn(['sponsored', 'error'], true)
                .setIn(['sponsored', 'data'], action.err);
        case GET_EXTENSION:
            return state
                .setIn(['extension', 'loading'], true)
                .setIn(['extension', 'error'], false);
        case GET_EXTENSION_SUCCESS:
            return state
                .setIn(['extension', 'loading'], false)
                .setIn(['extension', 'error'], false)
                .setIn(['extension', 'data'], action.response);
        case GET_EXTENSION_FAIL:
            return state
                .setIn(['extension', 'loading'], false)
                .setIn(['extension', 'error'], true)
                .setIn(['extension', 'data'], action.err);
        case GET_PERSONALISATION:
            return state
                .setIn(['personalisation', 'loading'], true)
                .setIn(['personalisation', 'error'], false);
        case GET_PERSONALISATION_SUCCESS:
            return state
                .setIn(['personalisation', 'loading'], false)
                .setIn(['personalisation', 'error'], false)
                .setIn(['personalisation', 'data'], action.response);
        case GET_PERSONALISATION_FAIL:
            return state
                .setIn(['personalisation', 'loading'], false)
                .setIn(['personalisation', 'error'], true)
                .setIn(['personalisation', 'data'], action.err);
        case GET_REVIEW:
            return state
                .setIn(['review', 'loading'], true)
                .setIn(['review', 'error'], false);
        case GET_REVIEW_SUCCESS:
            return state
                .setIn(['review', 'loading'], false)
                .setIn(['review', 'error'], false)
                .setIn(['review', 'data'], action.response);
        case GET_REVIEW_FAIL:
            return state
                .setIn(['review', 'loading'], false)
                .setIn(['review', 'error'], true)
                .setIn(['review', 'data'], action.err);
        case GET_FOOTER_LAYOUT:
            return state
                .setIn(['footerLayout', 'loading'], true)
                .setIn(['footerLayout', 'error'], false);
        case GET_FOOTER_LAYOUT_SUCCESS:
            return state
                .setIn(['footerLayout', 'loading'], false)
                .setIn(['footerLayout', 'error'], false)
                .setIn(['footerLayout', 'data'], action.response);
        case GET_FOOTER_LAYOUT_FAIL:
            return state
                .setIn(['footerLayout', 'loading'], false)
                .setIn(['footerLayout', 'error'], true)
                .setIn(['footerLayout', 'data'], action.err);
        case GET_FOOTER_IMAGE:
            return state
                .setIn(['footerImage', 'loading'], true)
                .setIn(['footerImage', 'error'], false);
        case GET_FOOTER_IMAGE_SUCCESS:
            return state
                .setIn(['footerImage', 'loading'], false)
                .setIn(['footerImage', 'error'], false)
                .setIn(['footerImage', 'data'], action.response);
        case GET_FOOTER_IMAGE_FAIL:
            return state
                .setIn(['footerImage', 'loading'], false)
                .setIn(['footerImage', 'error'], true)
                .setIn(['footerImage', 'data'], action.err);
        case GET_FOOTER_PARTNER:
            return state
                .setIn(['footerPartner', 'loading'], true)
                .setIn(['footerPartner', 'error'], false);
        case GET_FOOTER_PARTNER_SUCCESS:
            return state
                .setIn(['footerPartner', 'loading'], false)
                .setIn(['footerPartner', 'error'], false)
                .setIn(['footerPartner', 'data'], action.response);
        case GET_FOOTER_PARTNER_FAIL:
            return state
                .setIn(['footerPartner', 'loading'], false)
                .setIn(['footerPartner', 'error'], true)
                .setIn(['footerPartner', 'data'], action.err);
        default:
            return state;
    }
}

export default homePageReducer;
