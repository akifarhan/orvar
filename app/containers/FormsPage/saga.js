import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest, setCookie } from 'globalUtils';
import { notifySuccess, notifyError } from 'containers/Notify';
import globalScope from 'globalScope';

import {
    GET_PRODUCT_LIST,
    GET_PRODUCT,
    GET_CONFIG,
    SEND_OTP,
    SIGN_UP,
    ADD_ADDRESS,
    ADD_TO_CART,
    CHECKOUT,
    POST_CHECKOUT,
} from './constants';

import {
    getProductListSuccess,
    getProductListFail,
    getProductSuccess,
    getProductFail,
    getConfigSuccess,
    getConfigFail,
    sendOTPSuccess,
    sendOTPFail,
    signUpSuccess,
    signUpFail,
    addAddressSuccess,
    addAddressFail,
    addToCartSuccess,
    addToCartFail,
    checkoutSuccess,
    checkoutFail,
    postCheckoutSuccess,
    postCheckoutFail,
} from './actions';

export function* getProductListWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, action.params.url, 'get');
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

export function* getProductWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/mall/${action.params.id}`, 'get');
        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(getProductFail(response.data));
        } else if (response && response.ok !== false) {
            yield put(getProductSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(getProductFail(error));
    }
}

export function* getConfigWorker() {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, 'app/common', 'get');
        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(getConfigFail(response.data));
        } else if (response && response.ok !== false) {
            yield put(getConfigSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(getConfigFail(error));
    }
}

export function* sendOTPWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/auth/tac', 'post', JSON.stringify({ ...action.params }));

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(sendOTPFail(response.data));
            notifyError(response.data.messages[0].text);
        } else if (response && response.ok !== false) {
            yield put(sendOTPSuccess(response.data));
            notifySuccess(response.data.messages[0].text);
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(sendOTPFail(e));
    }
}

export function* signUpWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/register', 'post', JSON.stringify({ ...action.params }));

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(signUpFail(response.data));
            response.data.messages.map((message) => notifyError(message.text));
        } else if (response && response.ok !== false) {
            globalScope.token = response.data.token;
            globalScope.axios.setHeader('hertoken', globalScope.token);
            setCookie(process.env.TOKEN_KEY, globalScope.token);
            // call reset password api
            yield call(apiRequest, '/password/reset', 'post', JSON.stringify({ action: 'reset', email: action.params.email }));
            yield put(signUpSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(signUpFail(e));
    }
}

export function* addAddressWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/address', 'post', JSON.stringify({ ...action.params }));

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(addAddressFail(response.data));
            response.data.messages.map((message) => notifyError(message.text));
        } else if (response && response.ok !== false) {
            yield put(addAddressSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(addAddressFail(e));
    }
}

export function* addToCartWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/cart/mall', 'post', JSON.stringify({ ...action.params }));

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(addToCartFail(response.data));
            response.data.messages.map((message) => notifyError(message.text));
        } else if (response && response.ok !== false) {
            yield put(addToCartSuccess(response.data, action.cart));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(addToCartFail(e));
    }
}

export function* checkoutWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/checkout', action.method, action.params && JSON.stringify({ ...action.params }));

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(checkoutFail(response.data));
            response.data.messages.map((message) => notifyError(message.text));
        } else if (response && response.ok !== false) {
            yield put(checkoutSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(checkoutFail(e));
    }
}

export function* postCheckoutWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/checkout', 'post', JSON.stringify({ ...action.params }));

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(postCheckoutFail(response.data));
            response.data.messages.map((message) => notifyError(message.text));
        } else if (response && response.ok !== false) {
            yield put(postCheckoutSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(postCheckoutFail(e));
    }
}
// Individual exports for testing
export default function* formsPageSaga() {
    yield takeLatest(GET_PRODUCT_LIST, getProductListWorker);
    yield takeLatest(GET_PRODUCT, getProductWorker);
    yield takeLatest(GET_CONFIG, getConfigWorker);
    yield takeLatest(SEND_OTP, sendOTPWorker);
    yield takeLatest(SIGN_UP, signUpWorker);
    yield takeLatest(ADD_ADDRESS, addAddressWorker);
    yield takeLatest(ADD_TO_CART, addToCartWorker);
    yield takeLatest(CHECKOUT, checkoutWorker);
    yield takeLatest(POST_CHECKOUT, postCheckoutWorker);
}
