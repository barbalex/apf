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

const ProjekteRedirector = class ProjekteRedirector extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { store, location } = this.props
    const activeNode = store.data.activeNode
    let to = null
    if (activeNode) {
      to = getUrlForNode(activeNode)
    } else {
      to = '/Projekte'
    }
    const doRedirect = activeNode && to && location.pathname !== to

    if (doRedirect) {
      return <Redirect to={to} />
    }
    return null
  }
}

ProjekteRedirector.propTypes = {
  store: PropTypes.object,
  location: PropTypes.object,
}

export default inject('store')(observer(ProjekteRedirector))
