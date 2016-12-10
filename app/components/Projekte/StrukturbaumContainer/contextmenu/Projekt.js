import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const Projekt = ({ onClick }) =>
  <ContextMenu id="projekt" >
    <MenuItem
      onClick={onClick}
      data={{
        action: `do something`,
        table: `projekt`,
      }}
    >
      Projektmenu 1
    </MenuItem>
  </ContextMenu>

Projekt.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Projekt
