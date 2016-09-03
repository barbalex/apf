import { createSelector } from 'reselect';

/**
 * Direct selector to the benutzer state domain
 */
const selectBenutzerDomain = () => state => state.get('benutzer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Benutzer
 */

const selectBenutzer = () => createSelector(
  selectBenutzerDomain(),
  (substate) => substate.toJS()
);

export default selectBenutzer;
export {
  selectBenutzerDomain,
};
