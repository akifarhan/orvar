
// import { fromJS } from 'immutable';
import productDescriptionReducer, { initialState } from '../reducer';

describe('productDescriptionReducer', () => {
    it('returns the initial state', () => {
        expect(productDescriptionReducer(initialState, {})).toEqual(initialState);
    });
});
