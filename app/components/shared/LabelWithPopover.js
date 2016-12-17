import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import Popover from 'material-ui/Popover'

@observer
class LabelWithPopover extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
  }

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

    // DONT use styled because popupAnchorEl then seems to be at 0 0!!!!

    return (
      <div
        onClick={(event) => {
          event.preventDefault()
          this.setState({
            popupOpen: !popupOpen,
            popupAnchorEl: event.currentTarget,
          })
        }}
        style={{
          marginTop: `10px`,
          fontSize: `12px`,
          color: `rgba(255, 255, 255, 0.498039)`,
          userSelect: `none`,
          paddingBottom: `8px`,
          cursor: `pointer`,
          pointerEvents: `auto`,
          textDecoration: `underline`,
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

export default LabelWithPopover
