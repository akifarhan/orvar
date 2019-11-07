import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest, setCookie, staticErrorResponse } from 'globalUtils';
import { notifySuccess, notifyError } from 'containers/Notify';
import globalScope from 'globalScope';
import {
    AUTH_LOGIN,
    GET_IMAGE_LINK,
    RESET_PASSWORD,
} from './constants';
import {
    loginSuccess,
    loginFailed,
    getImageLinkSuccess,
    getImageLinkFailed,
    resetPasswordSuccess,
    resetPasswordFailed,
} from './actions';

export function* loginQuery(action) {
    try {
        const base64 = require('base-64');
        const hash = base64.encode(`${action.loginData.email}:${action.loginData.password}`);
        const response = yield call(apiRequest, 'auth/token', 'post', {}, 'https://api.hermo.my', { headers: { 'Authorization': `Basic ${hash}` } });
        if (response && response.ok) {
            globalScope.token = response.data.token;
            globalScope.axios.setHeader('hertoken', globalScope.token);
            setCookie(process.env.TOKEN_KEY, globalScope.token);
            yield put(loginSuccess(response.data));
        } else {
            yield put(loginFailed(response.data));
        }
    } catch (error) {
        yield put(loginFailed(error));
    }
}
export function* imageLinkQuery() {
    const response = yield call(apiRequest, '/image?code=hershop-login', 'get');
    if (response && response.ok) {
        yield put(getImageLinkSuccess(response.data));
    } else {
        yield put(getImageLinkFailed(response.data));
    }
}

export function* resetWorker(action) {
    let err;
    const params = JSON.stringify({
        action: 'reset',
        email: action.resetData,
    });
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/password/reset', 'post', params);
        if (response && response.ok !== false) {
            yield put(resetPasswordSuccess(response.data));
            notifySuccess(response.data.messages[0].text);
        } else if (response && response.ok === false) {
            yield put(resetPasswordFailed(response.data));
            notifyError(response.data.messages[0].text);
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(resetPasswordFailed(e));
    }
}
// Individual exports for testing
export default function* loginFormSaga() {
    yield takeLatest(AUTH_LOGIN, loginQuery);
    yield takeLatest(GET_IMAGE_LINK, imageLinkQuery);
    yield takeLatest(RESET_PASSWORD, resetWorker);
}
