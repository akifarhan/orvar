import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest, setCookie } from 'globalUtils';
import { notifySuccess, notifyError } from 'containers/Notify';
import globalScope from 'globalScope';
import {
    GET_TIME_TABLE,
    GET_CHECKOUT_DATA,
    GET_CONFIG,
    SEND_OTP,
    SIGNUP_USER,
    ADD_ADDRESS,
    ADD_TO_CART,
} from './constants';

import {
    getTimeTableSuccess,
    getTimeTableFail,
    getCheckoutDataSuccess,
    getCheckoutDataFail,
    getConfigSuccess,
    getConfigFail,
    sendOTPSuccess,
    sendOTPFail,
    signupUserSuccess,
    signupUserFail,
    addAddressSuccess,
    addAddressFail,
    addToCartSuccess,
    addToCartFail,
} from './actions';

export function* getTimeTableWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, `/promotion/${action.params.id}`, 'get');

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(getTimeTableFail(response.data));
        } else if (response && response.ok !== false) {
            yield put(getTimeTableSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getTimeTableFail(e));
    }
}

export function* getCheckoutDataWorker() {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, 'checkout', 'get');

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(getCheckoutDataFail(response.data));
        } else if (response && response.ok !== false) {
            yield put(getCheckoutDataSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getCheckoutDataFail(e));
    }
}

export function* configWorker() {
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
    } catch (e) {
        console.log('error: ', e);
        yield put(getConfigFail(e));
    }
}


export function* sendOTPWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const { sms_prefix, sms_number } = action.params;
        const response = yield call(apiRequest, '/auth/tac', 'post', { sms_prefix, sms_number });

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
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/register', 'post', JSON.stringify({ ...action.params }));
        if (response && response.ok && response.data.success) {
            globalScope.token = response.data.token;
            globalScope.axios.setHeader('hertoken', globalScope.token);
            setCookie(process.env.TOKEN_KEY, globalScope.token);
            yield put(signupUserSuccess(response.data));
        } else {
            yield put(signupUserFail(response.data));
            response.data.messages.map((message) => notifyError(message.text));
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(signupUserFail(error));
    }
}

export function* addAddressWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/address', 'post', JSON.stringify({ ...action.params }));
        const messages = response.data.messages.map((message) => message.text);
        const messageList = messages.join(' ');

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(addAddressFail(response.data));
            notifyError(messageList);
        } else if (response && response.ok !== false) {
            yield put(addAddressSuccess(response.data));
            notifySuccess(messageList);
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
        } else if (response && response.ok !== false) {
            yield put(addToCartSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(addToCartFail(e));
    }
}

// Individual exports for testing
export default function* formsPageSaga() {
    yield takeLatest(GET_TIME_TABLE, getTimeTableWorker);
    yield takeLatest(GET_CHECKOUT_DATA, getCheckoutDataWorker);
    yield takeLatest(GET_CONFIG, configWorker);
    yield takeLatest(SEND_OTP, sendOTPWorker);
    yield takeLatest(SIGNUP_USER, signUpWorker);
    yield takeLatest(ADD_ADDRESS, addAddressWorker);
    yield takeLatest(ADD_TO_CART, addToCartWorker);
}
