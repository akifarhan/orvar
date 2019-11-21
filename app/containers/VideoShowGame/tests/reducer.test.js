
// import { fromJS } from 'immutable';
import videoShowGameReducer, { initialState } from '../reducer';

describe('videoShowGameReducer', () => {
    it('returns the initial state', () => {
        expect(videoShowGameReducer(initialState, {})).toEqual(initialState);
    });
});
