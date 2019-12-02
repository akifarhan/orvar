import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_HOME_BANNER, GET_FLAGSHIP } from './constants';
import { getHomeBannerSuccess, getHomeBannerFail, getFlagshipSuccess, getFlagshipFail } from './actions';
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
        yield put(getHomeBannerFail(e));
    }
    // yield call, yield put and etc, whatever you like
    yield true;
}

// Individual exports for testing
export default function* homePageSaga() {
    yield takeLatest(GET_HOME_BANNER, homeBannerQuery);
    yield takeLatest(GET_FLAGSHIP, flagshipQuery);
}
