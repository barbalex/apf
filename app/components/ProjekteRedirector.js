/*
 *
 * Projekte
 *
 */

import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

import getUrlForNode from '../modules/getUrlForNode'

const Projekte = class Projekte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { store, location, params } = this.props
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

Projekte.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Projekte))
