import { createSelector } from 'reselect';

/**
 * Direct selector to the productInfo state domain
 */
const selectProductInfoDomain = (state) => state.get('productInfo');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProductInfo
 */

const makeSelectProductInfo = () => createSelector(
    selectProductInfoDomain,
    (substate) => substate.toJS()
);

export default makeSelectProductInfo;
export {
    selectProductInfoDomain,
};
