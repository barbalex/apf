/*
 *
 * Karte
 * swisstopo wmts: https://wmts10.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml
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

import OsmColorLayer from './layers/OsmColor'
import OsmBwLayer from './layers/OsmBw'
import SwissTopoPixelFarbeLayer from './layers/SwissTopoPixelFarbe'

const Karte = class Karte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const position = [47.295, 8.58]
    // this does not work
    // see issue on proj4js: https://github.com/proj4js/proj4js/issues/214
    const crs = (
      `EPSG:21781`,
      `+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs `
    )
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
          <OsmColorLayer />
          <ScaleControl />
          <LayersControl>
            <LayersControl.BaseLayer name="OpenStreetMap farbig">
              <OsmColorLayer />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OpenStreetMap grau">
              <OsmBwLayer />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="swisstopo.pixelkarte">
              <SwissTopoPixelFarbeLayer />
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
