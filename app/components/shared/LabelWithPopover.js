import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import Popover from 'material-ui/Popover'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'

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

const StyledDiv = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.498039);
  user-select: none;
  padding-bottom: 8px;
  cursor: pointer;
  pointer-events: auto;
  text-decoration: underline;
`
const StyledPopover = styled(Popover)`
  border-radius: 4px;
`

const LabelWithPopover = ({
  label,
  popupOpen,
  popupAnchorEl,
  children,
  onClickDiv,
  onRequestClosePopover,
}) =>
  <StyledDiv
    onClick={onClickDiv}
  >
    {label}
    <StyledPopover
      open={popupOpen}
      anchorEl={popupAnchorEl}
      anchorOrigin={{ horizontal: `left`, vertical: `top` }}
      targetOrigin={{ horizontal: `left`, vertical: `bottom` }}
      animated
      autoCloseWhenOffScreen
      canAutoPosition
      onRequestClose={onRequestClosePopover}
    >
      {children}
    </StyledPopover>
  </StyledDiv>

LabelWithPopover.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
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
