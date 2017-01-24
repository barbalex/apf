/*
 *
 * Karte
 * swisstopo wmts: https://wmts10.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml
 *
 */

import React from 'react'
import { observer, inject } from 'mobx-react'
import { Map, Marker, Popup, ScaleControl, LayersControl } from 'react-leaflet'
import styled from 'styled-components'
import compose from 'recompose/compose'
// import Proj4leaflet from 'proj4leaflet'
import Leaflet from 'leaflet'
// import Proj4 from 'proj4'
// import Proj4leaflet from 'proj4leaflet'

import OsmColorLayer from './layers/OsmColor'
import OsmBwLayer from './layers/OsmBw'
import SwissTopoPixelFarbeLayer from './layers/SwissTopoPixelFarbe'
import BingAerialLayer from './layers/BingAerial'

const { BaseLayer, Overlay } = LayersControl
const StyledMap = styled(Map)`
  height: 100%;
`

const enhance = compose(
  inject(`store`),
  observer
)

class Karte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const position = [47.295, 8.58]
    // this does not work
    // see issue on proj4js: https://github.com/proj4js/proj4js/issues/214
    const crs = (
      `EPSG:21781`,
      `+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs `
    )

    return (
      <StyledMap
        center={position}
        zoom={13}
        // CRS={crs}
        onClick={(e) => {
          console.log(`Lat, Lon : ` + e.latlng.lat + `, ` + e.latlng.lng)
        }}
      >
        <ScaleControl />
        <LayersControl>
          <BaseLayer checked name="OpenStreetMap farbig">
            <OsmColorLayer />
          </BaseLayer>
          <BaseLayer name="OpenStreetMap grau">
            <OsmBwLayer />
          </BaseLayer>
          <BaseLayer name="Swisstopo Karte">
            <SwissTopoPixelFarbeLayer />
          </BaseLayer>
          <BaseLayer name="Bing Luftbild">
            <BingAerialLayer />
          </BaseLayer>
          <Overlay name="Marker with popup">
            <Marker position={[51.51, -0.06]}>
              <Popup>
                <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
              </Popup>
            </Marker>
          </Overlay>
        </LayersControl>
      </StyledMap>
    )
  }
}

export default enhance(Karte)
