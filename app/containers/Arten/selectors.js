import { createSelector } from 'reselect'

/**
 * Direct selector to the arten state domain
 */
const selectArtenDomain = () => state => state.get('arten')

/**
 * Other specific selectors
 */


/**
 * Default selector used by Arten
 */

const selectArten = () => createSelector(
  selectArtenDomain(),
  (substate) => substate.toJS()
)

export default selectArten
export {
  selectArtenDomain,
}
