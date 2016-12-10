import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const Ap = ({ onClick }) =>
  <ContextMenu id="ap" >
    <MenuItem
      onClick={onClick}
      data={{
        action: `insert`,
        table: `ap`,
      }}
    >
      neue Art
    </MenuItem>
    <MenuItem
      onClick={onClick}
      data={{
        action: `delete`,
        table: `ap`,
      }}
    >
      Art löschen
    </MenuItem>
  </ContextMenu>

Ap.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Ap
