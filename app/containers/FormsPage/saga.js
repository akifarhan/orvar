import { takeLatest, put, call } from 'redux-saga/effects';

import { staticErrorResponse, apiRequest /* setCookie */} from 'globalUtils';


import {
    GET_PRODUCT_LIST,
} from './constants';

import {
    getProductListSuccess,
    getProductListFail,
} from './actions';

export function* defaultWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/promotion/${action.params.id}`, 'get');
        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(getProductListFail(response.data));
        } else if (response && response.ok !== false) {
            yield put(getProductListSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(getProductListFail(error));
    }
}

// Individual exports for testing
export default function* formsPageSaga() {
    yield takeLatest(GET_PRODUCT_LIST, defaultWorker);
}
