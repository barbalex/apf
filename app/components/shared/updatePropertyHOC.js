import React, { Component, PropTypes } from 'react'

const updatePropertyHOC = function updatePropertyHOC(MyComponent) {
  const Form = class Form extends Component {
    constructor(props) {
      super(props)
      this.updateProperty = this.updateProperty.bind(this)
    }

    updateProperty(key, value) {
      const { store } = this.props
      store.data.activeDataset.row[key] = value
    }

    render() {
      return <MyComponent {...this.props} updateProperty={this.updateProperty} />
    }
  }

  Form.propTypes = {
    store: PropTypes.object.isRequired,
  }

  return Form
}

export default updatePropertyHOC
