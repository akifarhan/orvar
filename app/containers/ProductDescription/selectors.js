import { createSelector } from 'reselect';

/**
 * Direct selector to the productDescription state domain
 */
const selectProductDescriptionDomain = (state) => state.get('productDescription');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProductDescription
 */

const makeSelectProductDescription = () => createSelector(
    selectProductDescriptionDomain,
    (substate) => substate.toJS()
);

export default makeSelectProductDescription;
export {
    selectProductDescriptionDomain,
};
