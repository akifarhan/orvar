import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';

import {
    GET_PRODUCT_DATA,
    GET_CONFIG_DATA,
    POST_NOTIFY,
} from './constants';
import {
    getProductDataSuccess,
    getProductDataFailed,
    getConfigDataSuccess,
    getConfigDataFailed,
    postNotifySuccess,
    postNotifyFailed,
} from './actions';

export function* getProductDataWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/restock-notification/${action.productId}`);
        if (response && response.ok !== false) {
            yield put(getProductDataSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getProductDataFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getProductDataFailed(e));
    }
}

export function* configDataQuery() {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/app/common', 'get');
        if (response && response.ok !== false) {
            yield put(getConfigDataSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getConfigDataFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getConfigDataFailed(e));
    }
}
export function* postNotifyQuery(action) {
    let err;
    const payload = JSON.stringify({ ...action.payload });
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `restock-notification/${action.payload.id}`, 'post', payload);
        if (response && response.ok !== false) {
            yield put(postNotifySuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(postNotifyFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(postNotifyFailed(e));
    }
}
// Individual exports for testing
export default function* notifyMeSaga() {
    yield takeLatest(GET_PRODUCT_DATA, getProductDataWorker);
    yield takeLatest(GET_CONFIG_DATA, configDataQuery);
    yield takeLatest(POST_NOTIFY, postNotifyQuery);
}
