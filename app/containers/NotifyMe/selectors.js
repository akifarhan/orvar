import { createSelector } from 'reselect';

/**
 * Direct selector to the notifyMe state domain
 */
const selectNotifyMeDomain = (state) => state.get('notifyMe');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NotifyMe
 */

const makeSelectNotifyMe = () => createSelector(
    selectNotifyMeDomain,
    (substate) => substate.toJS()
);

export default makeSelectNotifyMe;
export {
    selectNotifyMeDomain,
};
