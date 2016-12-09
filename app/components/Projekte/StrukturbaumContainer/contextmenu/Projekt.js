import React from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'

const Projekt = ({ store }) => {
  const handleClick = (e, data, element) => {
    console.log(`click, data:`, data)
    console.log(`click, id:`, element.firstElementChild.getAttribute(`data-id`))
  }
  return (
    <ContextMenu id="projekt" >
      <MenuItem
        onClick={handleClick}
        data={{ item: `item 1` }}
      >
        Projektmenu 1
      </MenuItem>
    </ContextMenu>
  )
}

export default Projekt
