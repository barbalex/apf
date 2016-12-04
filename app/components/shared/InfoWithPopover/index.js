import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import Popover from 'material-ui/Popover'
import FontIcon from 'material-ui/FontIcon'
import styles from './styles.css'

@observer
class InfoWithPopover extends Component {

  static propTypes = {
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
    const {
      popupOpen,
      popupAnchorEl,
    } = this.state
    return (
      <div className={styles.container}>
        <FontIcon
          id="iconEl"
          className={[`material-icons`, styles.icon].join(` `)}
          onClick={(event) => {
            event.preventDefault()
            this.setState({
              popupOpen: !popupOpen,
              popupAnchorEl: event.currentTarget,
            })
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
