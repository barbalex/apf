import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import Popover from 'material-ui/Popover'
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

const enhance = compose(
  withState(`popupOpen`, `changePopupOpen`, false),
  withState(`popupAnchorEl`, `changePopupAnchorEl`, null),
  withHandlers({
    onClickFontIcon: props => (event) => {
      event.preventDefault()
      props.changePopupOpen(!props.popupOpen)
      props.changePopupAnchorEl(event.currentTarget)
    },
    onRequestClosePopover: props => () =>
      props.changePopupOpen(false)
    ,
  }),
  observer
)

const InfoWithPopover = ({
  popupOpen,
  popupAnchorEl,
  onRequestClosePopover,
  onClickFontIcon,
}) =>
  <div>
    <FontIcon
      id="iconEl"
      className="material-icons"
      onClick={onClickFontIcon}
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
      onRequestClose={onRequestClosePopover}
      style={{
        borderRadius: `4px`,
      }}
    >
      {this.props.children}
    </Popover>
  </div>

InfoWithPopover.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  popupOpen: PropTypes.bool.isRequired,
  changePopupOpen: PropTypes.func.isRequired,
  popupAnchorEl: PropTypes.object,
  changePopupAnchorEl: PropTypes.func.isRequired,
  onClickFontIcon: PropTypes.func.isRequired,
  onRequestClosePopover: PropTypes.func.isRequired,
}

InfoWithPopover.defaultProps = {
  popupAnchorEl: null,
}

export default enhance(InfoWithPopover)
