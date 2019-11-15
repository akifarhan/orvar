import { takeLatest, call, put } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';
import {
    GET_RESULT,
    GET_GAME_INFO,
    GET_GAME_TOKEN,
    GET_MEMBER_INFO,
} from './constants';
import {
    getResultSuccess,
    getResultFailed,
    getGameInfoSuccess,
    getGameInfoFailed,
    getGameTokenSuccess,
    getGameTokenFailed,
    getMemberInfoSuccess,
    getMemberInfoFailed,
} from './actions';

export function* getResultQuery(action) {
    let err;
    try {
        const response = yield call(apiRequest, '/game/result', 'post', JSON.stringify(action.payload), process.env.GAMI_API_URL);
        if (response && response.ok !== false) {
            yield put(getResultSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getResultFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getResultFailed(e));
    }
}


export function* getGameInfo(action) {
    let err;
    try {
        const response = yield call(apiRequest, `/game/${action.gameParams.id}`, 'get', null, process.env.GAMI_API_URL);
        if (response && response.ok !== false) {
            yield put(getGameInfoSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getGameInfoFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getGameInfoFailed(e));
    }
}

export function* getGameTokenQuery(action) {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/game/play', 'post', { game_setup_id: action.gameParams.id }, process.env.GAMI_API_URL);
        if (response && response.ok !== false) {
            yield put(getGameTokenSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getGameTokenFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getGameTokenFailed(e));
    }
}

export function* getMemberInfoQuery() {
    let err;
    try { // Trying the HTTP Request
        const response = yield call(apiRequest, '/members', 'get', null, process.env.GAMI_API_URL);
        if (response && response.ok !== false) {
            yield put(getMemberInfoSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getMemberInfoFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getMemberInfoFailed(e));
    }
}


// Individual exports for testing
export default function* gamesPageSaga() {
    yield takeLatest(GET_RESULT, getResultQuery);
    yield takeLatest(GET_GAME_INFO, getGameInfo);
    yield takeLatest(GET_GAME_TOKEN, getGameTokenQuery);
    yield takeLatest(GET_MEMBER_INFO, getMemberInfoQuery);
}
