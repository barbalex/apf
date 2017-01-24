import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import Popover from 'material-ui/Popover'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

const enhance = compose(
  withState(`popupOpen`, `changePopupOpen`, false),
  withState(`popupAnchorEl`, `changePopupAnchorEl`, null),
  withHandlers({
    onClickDiv: props => (event) => {
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

// DONT use styled because popupAnchorEl then seems to be at 0 0!!!!
const LabelWithPopover = ({
  label,
  popupOpen,
  popupAnchorEl,
  children,
  onClickDiv,
  onRequestClosePopover,
}) =>
  <div
    onClick={onClickDiv}
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
      onRequestClose={onRequestClosePopover}
      style={{
        borderRadius: `4px`,
      }}
    >
      {children}
    </Popover>
  </div>

LabelWithPopover.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  popupOpen: PropTypes.bool.isRequired,
  changePopupOpen: PropTypes.func.isRequired,
  popupAnchorEl: PropTypes.object,
  changePopupAnchorEl: PropTypes.func.isRequired,
  onClickDiv: PropTypes.func.isRequired,
  onRequestClosePopover: PropTypes.func.isRequired,
}

LabelWithPopover.defaultProps = {
  popupAnchorEl: null,
}

export default enhance(LabelWithPopover)
