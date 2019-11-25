import { fromJS } from 'immutable';
import makeSelectProductDescription from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectProductDescription', () => {
    it('Expect makeSelectProductDescription to return state from reducer', () => {
        const selector = makeSelectProductDescription();
        const mock = fromJS({ ProductDescription: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
