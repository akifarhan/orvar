
// import { fromJS } from 'immutable';
import notifyMeReducer, { initialState } from '../reducer';

describe('notifyMeReducer', () => {
    it('returns the initial state', () => {
        expect(notifyMeReducer(initialState, {})).toEqual(initialState);
    });
});
