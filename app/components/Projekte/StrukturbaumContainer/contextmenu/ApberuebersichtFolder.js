import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const ApberuebersichtFolder = ({ onClick }) =>
  <ContextMenu id="apberuebersichtFolder" >
    <MenuItem
      onClick={onClick}
      data={{
        action: `insert`,
        table: `apberuebersicht`,
      }}
    >
      neuer AP-Bericht
    </MenuItem>
  </ContextMenu>

ApberuebersichtFolder.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ApberuebersichtFolder
