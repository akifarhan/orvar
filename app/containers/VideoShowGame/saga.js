import { takeLatest, call, put } from 'redux-saga/effects';
import { staticErrorResponse, apiRequest } from 'globalUtils';

import {
    GET_LOTTIE_JSON,
} from './constants';
import {
    getLottieJsonSuccess,
    getLottieJsonFailed,
} from './actions';

export function* getLottieJsonaWorker(action) {
    let err;
    try {
        // path, type = 'get', body, baseUrl, headerParams
        const response = yield call(apiRequest, '', 'get', null, action.params.url);
        if (response && response.ok !== false) {
            yield put(getLottieJsonSuccess(response.data));
        } else if (response && response.ok === false) {
            yield put(getLottieJsonFailed(response.data));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        console.log('error: ', e);
        yield put(getLottieJsonFailed(e));
    }
}

// Individual exports for testing
export default function* videoShowGameSaga() {
    yield takeLatest(GET_LOTTIE_JSON, getLottieJsonaWorker);
}
