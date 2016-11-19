/*
 *
 * ProjekteRedirector
 * changes url when node state changes
 *
 */

import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

const ProjekteRedirector = ({ store, location }) => {
  const activeNode = store.node.activeNode
  let to = null
  if (activeNode) {
    to = `/${activeNode.urlPath.join(`/`)}`
  }
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
