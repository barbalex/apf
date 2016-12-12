import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const Tpop = ({ onClick }) =>
  <ContextMenu id="tpop" >
    <div className="react-contextmenu-title">Teil-Population</div>
    <MenuItem
      onClick={onClick}
      data={{
        action: `insert`,
        table: `tpop`,
      }}
    >
      neu
    </MenuItem>
    <MenuItem
      onClick={onClick}
      data={{
        action: `delete`,
        table: `tpop`,
      }}
    >
      löschen
    </MenuItem>
    <MenuItem
      onClick={onClick}
      data={{
        action: `karte`,
        table: `tpop`,
      }}
      disabled
    >
      auf Karte zeigen
    </MenuItem>
  </ContextMenu>

Tpop.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Tpop
