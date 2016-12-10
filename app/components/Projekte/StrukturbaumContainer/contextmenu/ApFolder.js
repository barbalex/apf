import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const Apfolder = ({ onClick }) =>
  <ContextMenu id="apFolder" >
    <MenuItem
      onClick={onClick}
      data={{
        action: `insert`,
        table: `ap`,
      }}
    >
      neue Art
    </MenuItem>
  </ContextMenu>

Apfolder.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Apfolder
