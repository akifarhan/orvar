import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_PRODUCT } from './constants';
import {
    getProductSuccess,
    getProductFailed,
} from './actions';
import { staticErrorResponse, apiRequest } from '../../globalUtils';

export function* productWorker(action) {
    let err;

    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/mall/${action.productId}`, 'get');
        if (response && response.ok !== false) {
            yield put(getProductSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getProductFailed(response.data.message[0].text));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getProductFailed(e));
    }
}

// Individual exports for testing
export default function* productInfoSaga() {
    yield takeLatest(GET_PRODUCT, productWorker);
}
