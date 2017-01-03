import React from 'react'
import { Map } from 'react-leaflet'

import BingAerialLayer from './layers/BingAerial'

class Karte extends React.Component {
  render() {
    const position = [47.295, 8.58]

    return (
      <Map
        center={position}
        zoom={13}
      >
        <BingAerial />
      </Map>
    )
  }
}

export default Karte
