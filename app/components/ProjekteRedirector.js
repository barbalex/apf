/*
 *
 * ProjekteRedirector
 * changes url when node state changes
 *
 */

import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

import getUrlForNode from '../modules/getUrlForNode'

const ProjekteRedirector = ({ store, location }) => {
  const activeNode = store.data.activeNode
  let to = null
  console.log('ProjekteRedirector, activeNode:', activeNode)
  if (activeNode) {
    to = getUrlForNode(activeNode)
  } else {
    to = '/Projekte'
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

export default inject('store')(observer(ProjekteRedirector))
