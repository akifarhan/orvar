import { fromJS } from 'immutable';
import makeSelectVideoShowGame from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectVideoShowGame', () => {
    it('Expect makeSelectVideoShowGame to return state from reducer', () => {
        const selector = makeSelectVideoShowGame();
        const mock = fromJS({ VideoShowGame: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});
