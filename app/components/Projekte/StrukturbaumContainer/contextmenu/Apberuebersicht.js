import React, { PropTypes } from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const Apberuebersicht = ({ onClick }) =>
  <ContextMenu id="apberuebersicht" >
    <MenuItem
      onClick={onClick}
      data={{
        action: `insert`,
        table: `apberuebersicht`,
      }}
    >
      neuer AP-Bericht
    </MenuItem>
    <MenuItem
      onClick={onClick}
      data={{
        action: `delete`,
        table: `apberuebersicht`,
      }}
    >
      AP-Bericht löschen
    </MenuItem>
  </ContextMenu>

Apberuebersicht.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Apberuebersicht
