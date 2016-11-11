/*
 *
 * Karte
 * swisstopo wms: http://wms.geo.admin.ch/?REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.0.0&lang=de
 *
 */

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Map, TileLayer, Marker, Popup, ScaleControl, LayersControl } from 'react-leaflet'
// import Proj4leaflet from 'proj4leaflet'
import Leaflet from 'leaflet'
// import Proj4 from 'proj4'
// import Proj4leaflet from 'proj4leaflet'
import styles from './styles.css'

const Karte = class Karte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const position = [47.295, 8.58]
    console.log(`Karte: Proj4leaflet:`, Proj4leaflet)
    const crs = (
      `EPSG:21781`,
      `+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs `
    )
    console.log(`Karte: proj4:`, window.proj4)
    return (
      <div className={styles.container}>
        <Map
          center={position}
          zoom={13}
          className={styles.map}
          CRS={crs}
          onClick={(e) => {
            console.log(`Lat, Lon : ` + e.latlng.lat + `, ` + e.latlng.lng)
          }}
        >
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={position}
          />
          <ScaleControl />
          <LayersControl>
            <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
              <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay name="Marker with popup">
              <Marker position={[51.51, -0.06]}>
                <Popup>
                  <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                </Popup>
              </Marker>
            </LayersControl.Overlay>
          </LayersControl>
        </Map>
      </div>
    )
  }
}

export default inject('store')(observer(Karte))
