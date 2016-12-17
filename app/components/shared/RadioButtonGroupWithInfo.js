import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import RadioButtonGroup from './RadioButtonGroup'
import InfoWithPopover from './InfoWithPopover'

@observer
class radioButtonGroupWithInfo extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    updatePropertyInDb: PropTypes.func.isRequired,
    popover: PropTypes.element,
  }

  render() {
    const {
      fieldName,
      value,
      dataSource,
      updatePropertyInDb,
      popover,
    } = this.props
    const Container = styled.div`
      display: flex;
      justify-content: space-between;
    `
    const ButtonGroup = styled.div`
      flex-grow: 1;
    `

    return (
      <Container>
        <ButtonGroup>
          <RadioButtonGroup
            fieldName={fieldName}
            value={value}
            dataSource={dataSource}
            updatePropertyInDb={updatePropertyInDb}
          />
        </ButtonGroup>
        <InfoWithPopover>
          {popover}
        </InfoWithPopover>
      </Container>
    )
  }
}

export default radioButtonGroupWithInfo
