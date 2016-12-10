import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const Projekt = ({ onClick }) =>
  <ContextMenu id="projekt" >
    <MenuItem
      onClick={onClick}
      data={{
        action: `karte`,
        table: `projekt`,
      }}
      disabled
    >
      auf Karte zeigen
    </MenuItem>
  </ContextMenu>

Projekt.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Projekt
