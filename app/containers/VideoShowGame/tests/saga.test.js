/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { videoShowGameSaga } from '../saga';
import videoShowGameSaga, { defaultWorker } from '../saga';

// const generator = videoShowGameSaga();

describe('videoShowGameSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = videoShowGameSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
