import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

@observer
class Label extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  render() {
    const { label } = this.props
    const StyledLabel = styled.div`
      margin-top: 10px;
      cursor: text;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.498039);
      pointer-events: none;
      user-select: none;
      padding-bottom: 8px;
    `

    return (
      <StyledLabel>
        {label}
      </StyledLabel>
    )
  }
}

export default Label
