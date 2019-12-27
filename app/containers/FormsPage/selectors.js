import { createSelector } from 'reselect';

/**
 * Direct selector to the formsPage state domain
 */
const selectFormsPageDomain = (state) => state.get('formsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FormsPage
 */

const makeSelectFormsPage = () => createSelector(
    selectFormsPageDomain,
    (substate) => substate.toJS()
);

export default makeSelectFormsPage;
export {
    selectFormsPageDomain,
};
