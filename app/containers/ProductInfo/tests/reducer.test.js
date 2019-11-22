
// import { fromJS } from 'immutable';
import productInfoReducer, { initialState } from '../reducer';

describe('productInfoReducer', () => {
    it('returns the initial state', () => {
        expect(productInfoReducer(initialState, {})).toEqual(initialState);
    });
});
