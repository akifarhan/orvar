import { fromJS } from 'immutable';
import makeSelectNotifyMe from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectNotifyMe', () => {
    it('Expect makeSelectNotifyMe to return state from reducer', () => {
        const selector = makeSelectNotifyMe();
        const mock = fromJS({ NotifyMe: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
