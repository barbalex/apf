import { createSelector } from 'reselect'

/**
 * Direct selector to the exporte state domain
 */
const selectExporteDomain = () => state => state.get('exporte')

/**
 * Other specific selectors
 */


/**
 * Default selector used by Exporte
 */

const selectExporte = () => createSelector(
  selectExporteDomain(),
  (substate) => substate.toJS()
)

export default selectExporte
export {
  selectExporteDomain,
}
