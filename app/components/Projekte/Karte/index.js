/*
 *
 * Karte
 *
 */

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import styles from './styles.css'

const Karte = class Karte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const position = [47.295, 8.58]
    return (
      <div className={styles.container}>
        <Map
          center={position}
          zoom={13}
          className={styles.map}
        >
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={position}
          />
        </Map>
      </div>
    )
  }
}

export default inject('store')(observer(Karte))
