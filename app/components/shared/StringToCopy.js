import React, { Component, PropTypes } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components'

class StringToCopy extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      copied: false,
    }
    this.state.copied = false
    this.onCopy = this.onCopy.bind(this)
  }

  onCopy() {
    this.setState({ copied: true })
    const that = this
    setTimeout(() => {
      that.setState({ copied: false })
    }, 10000)
  }

  render() {
    const { text } = this.props
    const { copied } = this.state
    const Container = styled.div`
      display: flex;
      justify-content: space-between;
    `
    const GuidContainer = styled.div`
      flex-grow: 1;
    `
    const CopyButtonContainer = styled.div`
      margin-top: -7px;
    `

    return (
      <Container>
        <GuidContainer>
          {text}
        </GuidContainer>
        <CopyButtonContainer>
          <CopyToClipboard
            text={text}
            onCopy={this.onCopy}
          >
            <FlatButton
              label={copied ? `kopiert` : `kopieren`}
            />
          </CopyToClipboard>
        </CopyButtonContainer>
      </Container>
    )
  }
}

export default StringToCopy
