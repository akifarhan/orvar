/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { notifyMeSaga } from '../saga';
import notifyMeSaga, { defaultWorker } from '../saga';

// const generator = notifyMeSaga();

describe('notifyMeSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = notifyMeSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
