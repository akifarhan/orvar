/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { formsPageSaga } from '../saga';
import formsPageSaga, { defaultWorker } from '../saga';

// const generator = formsPageSaga();

describe('formsPageSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = formsPageSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
