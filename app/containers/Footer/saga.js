import { takeLatest, call, put } from 'redux-saga/effects';

import { GET_FOOTER_LAYOUT } from './constants';
import {
    getFooterLayoutSuccess,
    getFooterLayoutFail,
} from './actions';

import { staticErrorResponse, apiRequest } from '../../globalUtils';


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

// Individual exports for testing
export default function* footerSaga() {
    yield takeLatest(GET_FOOTER_LAYOUT, footerLayoutQuery);
}
