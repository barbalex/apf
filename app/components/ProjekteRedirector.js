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
      console.log('ProjekteRedirector: redirect to:', to)
    } else {
      to = '/Projekte'
    }
    console.log('ProjekteRedirector: activeNode:', activeNode)
    console.log('ProjekteRedirector: location:', location)
    console.log('ProjekteRedirector: params:', params)
    console.log('ProjekteRedirector: location.pathname:', location.pathname)
    console.log('ProjekteRedirector: to:', to)
    const doRedirect = activeNode && to && location.pathname !== to
    console.log('ProjekteRedirector: doRedirect:', doRedirect)

    return (
      <div>
        {
          doRedirect
          && <Redirect to={to} />
        }
      </div>
    )
  }
}

Projekte.propTypes = {
  store: PropTypes.object,
}

export default inject('store')(observer(Projekte))
