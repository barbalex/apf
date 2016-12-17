import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import Popover from 'material-ui/Popover'
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'

@observer
class InfoWithPopover extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  }

  constructor() {
    super()
    this.state = {
      popupOpen: false,
      popupAnchorEl: null,
    }
  }

  render() {
    const {
      popupOpen,
      popupAnchorEl,
    } = this.state

    // DONT use styled because popupAnchorEl then seems to be at 0 0!!!!

    return (
      <div style={{ marginTop: `37px` }}>
        <FontIcon
          id="iconEl"
          className="material-icons"
          onClick={(event) => {
            event.preventDefault()
            // TODO: this popup opens at 0 0!!!
            // console.log(`event.currentTarget:`, event.currentTarget)
            this.setState({
              popupOpen: !popupOpen,
              popupAnchorEl: event.currentTarget,
            })
          }}
          style={{
            cursor: `pointer`,
            pointerEvents: `auto`,
          }}
        >
          info_outline
        </FontIcon>
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

export default InfoWithPopover
