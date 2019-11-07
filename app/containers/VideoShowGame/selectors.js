import { createSelector } from 'reselect';

/**
 * Direct selector to the videoShowGame state domain
 */
const selectVideoShowGameDomain = (state) => state.get('videoShowGame');

/**
 * Other specific selectors
 */


/**
 * Default selector used by VideoShowGame
 */

const makeSelectVideoShowGame = () => createSelector(
    selectVideoShowGameDomain,
    (substate) => substate.toJS()
);

export default makeSelectVideoShowGame;
export {
    selectVideoShowGameDomain,
};
