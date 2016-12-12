import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const TpopFolder = ({ onClick }) =>
  <ContextMenu id="tpopFolder" >
    <div className="react-contextmenu-title">Teil-Populationen</div>
    <MenuItem
      onClick={onClick}
      data={{
        action: `insert`,
        table: `tpop`,
      }}
    >
      neu
    </MenuItem>
  </ContextMenu>

TpopFolder.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default TpopFolder
