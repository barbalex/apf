import { createSelector } from 'reselect';

/**
 * Direct selector to the menuBar state domain
 */
const selectMenuBarDomain = () => state => state.get('menuBar');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MenuBar
 */

const selectMenuBar = () => createSelector(
  selectMenuBarDomain(),
  // TODO: this breaks
  (substate) => substate.toJS()
);

export default selectMenuBar;
export {
  selectMenuBarDomain,
};
