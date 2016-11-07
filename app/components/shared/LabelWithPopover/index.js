import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import Popover from 'material-ui/Popover'
import styles from './styles.css'

const LabelWithPopover = class LabelWithPopover extends Component {

  constructor() {
    super()
    this.state = {
      popupOpen: false,
      popupAnchorEl: null,
    }
  }

  render() {
    const { label } = this.props
    const {
      popupOpen,
      popupAnchorEl,
    } = this.state
    return (
      <div
        className={styles.labelWithPopover}
        onClick={(event) => {
          event.preventDefault()
          this.setState({
            popupOpen: !popupOpen,
            popupAnchorEl: event.currentTarget,
          })
        }}
      >
        {label}
        <Popover
          open={popupOpen}
          anchorEl={popupAnchorEl}
          anchorOrigin={{ horizontal: `left`, vertical: `top` }}
          targetOrigin={{ horizontal: `left`, vertical: `bottom` }}
          animated
          autoCloseWhenOffScreen
          canAutoPosition
          onRequestClose={() => {
            this.setState({ popupOpen: false })
          }}
          style={{
            borderRadius: `4px`,
          }}
        >
          {this.props.children}
        </Popover>
      </div>
    )
  }
}

LabelWithPopover.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
}

export default observer(LabelWithPopover)
