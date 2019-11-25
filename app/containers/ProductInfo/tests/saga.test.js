/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
// import { take, call, put, select } from 'redux-saga/effects';
// import { productInfoSaga } from '../saga';
import productInfoSaga, { defaultWorker } from '../saga';

// const generator = productInfoSaga();

describe('productInfoSaga', () => {
    it('Expect to have unit tests specified', () => {
        const generator = productInfoSaga();
        expect(generator.next(defaultWorker()).value).toEqual(true);
    });
});
