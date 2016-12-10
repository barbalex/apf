import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const Ap = ({ onClick }) =>
  <ContextMenu id="ap" >
    <div className="react-contextmenu-title">Art</div>
    <MenuItem
      onClick={onClick}
      data={{
        action: `insert`,
        table: `ap`,
      }}
    >
      neu
    </MenuItem>
    <MenuItem
      onClick={onClick}
      data={{
        action: `delete`,
        table: `ap`,
      }}
    >
      löschen
    </MenuItem>
  </ContextMenu>

Ap.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Ap
