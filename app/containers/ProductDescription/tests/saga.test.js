/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { productDescriptionSaga } from '../saga';
import productDescriptionSaga, { defaultWorker } from '../saga';

// const generator = productDescriptionSaga();

describe('productDescriptionSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = productDescriptionSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
