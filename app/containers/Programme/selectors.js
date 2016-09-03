import { createSelector } from 'reselect';

/**
 * Direct selector to the programme state domain
 */
const selectProgrammeDomain = () => state => state.get('programme');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Programme
 */

const selectProgramme = () => createSelector(
  selectProgrammeDomain(),
  (substate) => substate.toJS()
);

export default selectProgramme;
export {
  selectProgrammeDomain,
};
