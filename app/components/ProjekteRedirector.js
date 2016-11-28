/*
 *
 * ProjekteRedirector
 * changes url when node state changes
 *
 */

import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

import getNodeOfActiveDataset from '../modules/getNodeOfActiveDataset'

const ProjekteRedirector = ({ store, location }) => {
  const { activeDataset } = store
  let to = null
  if (activeDataset) {
    const { url } = getNodeOfActiveDataset(store)
    to = `/${url.join(`/`)}`
  }
  console.log(`ProjekteRedirector: to:`, to)
  const doRedirect = to && location.pathname !== to

  if (doRedirect) {
    return <Redirect to={to} />
  }
  return null
}

ProjekteRedirector.propTypes = {
  store: PropTypes.object,
  location: PropTypes.object,
}

export default inject(`store`)(observer(ProjekteRedirector))
