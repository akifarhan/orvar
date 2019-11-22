import { fromJS } from 'immutable';
import makeSelectProductInfo from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProductInfo', () => {
    it('Expect makeSelectProductInfo to return state from reducer', () => {
        const selector = makeSelectProductInfo();
        const mock = fromJS({ ProductInfo: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
