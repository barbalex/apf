import React, { Component, PropTypes } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import FlatButton from 'material-ui/FlatButton'
import styles from './styles.css'

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

    return (
      <div className={styles.container}>
        <div className={styles.guid}>
          {text}
        </div>
        <div className={styles.copyButton}>
          <CopyToClipboard
            text={text}
            onCopy={this.onCopy}
          >
            <FlatButton
              label={copied ? `kopiert` : `kopieren`}
            />
          </CopyToClipboard>
        </div>
      </div>
    )
  }
}

export default StringToCopy
