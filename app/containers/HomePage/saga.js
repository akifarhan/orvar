import { takeLatest, call, put } from 'redux-saga/effects';
import globalScope from 'globalScope';
import {
    GET_HOME_BANNER,
    GET_FLAGSHIP,
    GET_TWOH,
    GET_NEW_ARRIVAL,
    GET_TRENDING,
    GET_SPONSORED,
    GET_EXTENSION,
    GET_PERSONALISATION,
    GET_REVIEW,
    GET_FOOTER_LAYOUT,
    GET_FOOTER_IMAGE,
    GET_FOOTER_PARTNER,
} from './constants';
import {
    getHomeBannerSuccess,
    getHomeBannerFail,
    getFlagshipSuccess,
    getFlagshipFail,
    getTwohSuccess,
    getTwohFail,
    getNewArrivalSuccess,
    getNewArrivalFail,
    getTrendingSuccess,
    getTrendingFail,
    getSponsoredSuccess,
    getSponsoredFail,
    getExtensionSuccess,
    getExtensionFail,
    getPersonalisationSuccess,
    getPersonalisationFail,
    getReviewSuccess,
    getReviewFail,
    getFooterLayoutSuccess,
    getFooterLayoutFail,
    getFooterImageSuccess,
    getFooterImageFail,
    getFooterPartnerSuccess,
    getFooterPartnerFail,
} from './actions';
import { staticErrorResponse, apiRequest } from '../../globalUtils';

export function* homeBannerQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/home/home-banner');
        if (response && response.ok !== false) {
            yield put(getHomeBannerSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getHomeBannerFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getHomeBannerFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* flagshipQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/flagship');
        if (response && response.ok !== false) {
            yield put(getFlagshipSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getFlagshipFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getFlagshipFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* twohQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/home/feature-banner');
        if (response && response.ok !== false) {
            yield put(getTwohSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getTwohFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getTwohFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* newArrivalQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/home/new-arrival');
        if (response && response.ok !== false) {
            yield put(getNewArrivalSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getNewArrivalFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getNewArrivalFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* trendingQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/mall/list?sort=trending.asc');
        if (response && response.ok !== false) {
            yield put(getTrendingSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getTrendingFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getTrendingFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* sponsoredQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/home/sponsored');
        if (response && response.ok !== false) {
            yield put(getSponsoredSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getSponsoredFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getSponsoredFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* extensionQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/view/135');
        if (response && response.ok !== false) {
            yield put(getExtensionSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getExtensionFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getExtensionFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* personalisationQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/v2/personalisation', 'get', {}, globalScope.reco);
        if (response && response.ok !== false) {
            yield put(getPersonalisationSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getPersonalisationFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getPersonalisationFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* reviewQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/home/beauty-wall');
        if (response && response.ok !== false) {
            yield put(getReviewSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getReviewFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getReviewFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* footerLayoutQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/layout/footer');
        if (response && response.ok !== false) {
            yield put(getFooterLayoutSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getFooterLayoutFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getFooterLayoutFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* footerImageQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/image?code=hershop-footer');
        if (response && response.ok !== false) {
            yield put(getFooterImageSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getFooterImageFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getFooterImageFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

export function* footerPartnerQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/image?code=footer-partner-logo');
        if (response && response.ok !== false) {
            yield put(getFooterPartnerSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getFooterPartnerFail(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getFooterPartnerFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

// Individual exports for testing
export default function* homePageSaga() {
    yield takeLatest(GET_HOME_BANNER, homeBannerQuery);
    yield takeLatest(GET_FLAGSHIP, flagshipQuery);
    yield takeLatest(GET_TWOH, twohQuery);
    yield takeLatest(GET_NEW_ARRIVAL, newArrivalQuery);
    yield takeLatest(GET_TRENDING, trendingQuery);
    yield takeLatest(GET_SPONSORED, sponsoredQuery);
    yield takeLatest(GET_EXTENSION, extensionQuery);
    yield takeLatest(GET_PERSONALISATION, personalisationQuery);
    yield takeLatest(GET_REVIEW, reviewQuery);
    yield takeLatest(GET_FOOTER_LAYOUT, footerLayoutQuery);
    yield takeLatest(GET_FOOTER_IMAGE, footerImageQuery);
    yield takeLatest(GET_FOOTER_PARTNER, footerPartnerQuery);
}
