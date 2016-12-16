import React, { Component, PropTypes } from 'react'

class TabTemplate extends React.Component {
  render() {
    if (!this.props.selected) {
      return null
    }

    return this.props.children
  }
}

export default TabTemplate
