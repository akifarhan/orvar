import { takeLatest, put, call } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest, setCookie } from 'globalUtils';
import globalScope from 'globalScope';
import {
    GET_TIME_TABLE,
    GET_CHECKOUT_DATA,
    GET_PHONE_PREFIX,
    SEND_OTP,
    SIGNUP_USER,
} from './constants';

import {
    getTimeTableSuccess,
    getTimeTableFail,
    getCheckoutDataSuccess,
    getCheckoutDataFail,
    getPhonePrefixSuccess,
    getPhonePrefixFail,
    sendOTPSuccess,
    sendOTPFail,
    signupUserSuccess,
    signupUserFail,
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

export function* getPhonePrefix() {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, 'app/common', 'get');

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(getPhonePrefixFail(response.data));
        } else if (response && response.ok !== false) {
            yield put(getPhonePrefixSuccess(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getPhonePrefixFail(e));
    }
}


export function* sendOTPWorker(action) {
    let err;
    try { // Trying the HTTP Request
        const { sms_prefix, sms_number } = action.params;
        const response = yield call(apiRequest, '/app/auth/tac', 'post', { sms_prefix, sms_number });

        if (response && (response.ok === false || (response.data && response.data.success === false))) {
            yield put(sendOTPSuccess(response.data));
        } else if (response && response.ok !== false) {
            yield put(sendOTPSuccess(response.data));
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
        const payload = JSON.stringify({
            email: action.params.email,
            password: action.params.password,
            tac: action.params.tac,
            password_confirmation: action.params.password_confirmation,
            sms_number: action.params.sms_number,
            sms_prefix: action.params.sms_prefix,
        });
        const response = yield call(apiRequest, '/register', 'post', payload);
        if (response && response.ok && response.data.success) {
            globalScope.token = response.data.token;
            globalScope.axios.setHeader('hertoken', globalScope.token);
            setCookie(process.env.TOKEN_KEY, globalScope.token);
            yield put(signupUserSuccess(response.data));
        } else {
            yield put(signupUserFail(response.data));
        }
    } catch (error) {
        console.log('error: ', error);
        yield put(sendOTPFail(error));
    }
}

// Individual exports for testing
export default function* formsPageSaga() {
    yield takeLatest(GET_TIME_TABLE, getTimeTableWorker);
    yield takeLatest(GET_CHECKOUT_DATA, getCheckoutDataWorker);
    yield takeLatest(GET_PHONE_PREFIX, getPhonePrefix);
    yield takeLatest(SEND_OTP, sendOTPWorker);
    yield takeLatest(SIGNUP_USER, signUpWorker);
}
