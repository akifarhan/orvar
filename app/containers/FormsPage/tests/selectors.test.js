import { fromJS } from 'immutable';
import makeSelectFormsPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectFormsPage', () => {
    it('Expect makeSelectFormsPage to return state from reducer', () => {
        const selector = makeSelectFormsPage();
        const mock = fromJS({ FormsPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
