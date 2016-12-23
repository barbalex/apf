import React from 'react'
import styled from 'styled-components'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import fileDownload from 'react-file-download'
import format from 'date-fns/format'
import axios from 'axios'

import FormTitle from '../../../shared/FormTitle'
import apiBaseUrl from '../../../../modules/apiBaseUrl'
import Tipps from './Tipps'

const Container = styled.div`
  height: 100%;
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow-x: auto;
  height: 100%;
  padding-bottom: 95px;
`
const FirstLevelCard = styled(Card)`
  margin-bottom: 10px;
`
const DownloadCardText = styled

export default class Exporte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.downloadFromView = this.downloadFromView.bind(this)
  }

  downloadFromView({ view, fileName }) {  // eslint-disable-line class-methods-use-this
    const file = `${fileName}_${format(new Date(), `YYYY-MM-DD_HH-mm-ss`)}`
    axios.get(`${apiBaseUrl}/exportView/csv/view=${view}/filename=${file}`)
      .then(({ data }) =>
        fileDownload(data, `${file}.csv`)
      )
      .catch(error => console.log(`error fetching fields:`, error))
  }

  render() {
    return (
      <Container>
        <FormTitle title="Exporte" />
        <FieldsContainer>
          <Tipps />
          <FirstLevelCard>
            <CardHeader
              title="Art"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
              <FlatButton
                label="Arten"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ap`,
                    fileName: `Arten`,
                  })
                }
              />
              <FlatButton
                label="Arten ohne Populationen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ap_ohnepop`,
                    fileName: `ArtenOhnePopulationen`,
                  })
                }
              />
              <FlatButton
                label="Anzahl Massnahmen pro Art"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ap_anzmassn`,
                    fileName: `ArtenAnzahlMassnahmen`,
                  })
                }
              />
              <FlatButton
                label="Anzahl Kontrollen pro Art"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ap_anzkontr`,
                    fileName: `ArtenAnzahlKontrollen`,
                  })
                }
              />
              <FlatButton
                label="AP-Berichte (Jahresberichte)"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_apber`,
                    fileName: `Jahresberichte`,
                  })
                }
              />
              <FlatButton
                label="AP-Berichte und Massnahmen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ap_apberundmassn`,
                    fileName: `ApJahresberichteUndMassnahmen`,
                  })
                }
              />
              <FlatButton
                label="Ziele"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ziel`,
                    fileName: `ApZiele`,
                  })
                }
              />
              <FlatButton
                label="Ziel-Berichte"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_zielber`,
                    fileName: `Zielberichte`,
                  })
                }
              />
              <FlatButton
                label="Berichte"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ber`,
                    fileName: `Berichte`,
                  })
                }
              />
              <FlatButton
                label="Erfolgskriterien"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_erfkrit`,
                    fileName: `Erfolgskriterien`,
                  })
                }
              />
              <FlatButton
                label="Idealbiotope"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_idealbiotop`,
                    fileName: `Idealbiotope`,
                  })
                }
              />
              <FlatButton
                label="Assoziierte Arten"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_assozart`,
                    fileName: `AssoziierteArten`,
                  })
                }
              />
            </CardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Populationen"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
              <FlatButton
                label="Populationen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop`,
                    fileName: `Populationen`,
                  })
                }
              />
              <FlatButton
                label="Populationen für Google Earth (beschriftet mit PopNr)"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_kml`,
                    fileName: `Populationen`,
                  })
                }
              />
              <FlatButton
                label="Populationen für Google Earth (beschriftet mit Artname, PopNr)"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_kmlnamen`,
                    fileName: `PopulationenNachNamen`,
                  })
                }
              />
              <FlatButton
                label="Populationen ohne Teilpopulationen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_ohnetpop`,
                    fileName: `PopulationenOhneTeilpopulationen`,
                  })
                }
              />
              <FlatButton
                label="Populationen von AP-Arten ohne Status"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_vonapohnestatus`,
                    fileName: `PopulationenVonApArtenOhneStatus`,
                  })
                }
              />
              <FlatButton
                label="Populationen ohne Koordinaten"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_ohnekoord`,
                    fileName: `PopulationenOhneKoordinaten`,
                  })
                }
              />
              <FlatButton
                label="Populationen mit Massnahmen-Berichten: Anzahl Massnahmen im Berichtsjahr"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_popmassnber_anzmassn`,
                    fileName: `PopulationenAnzMassnProMassnber`,
                  })
                }
              />
              <FlatButton
                label="Anzahl Massnahmen pro Population"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_anzmassn`,
                    fileName: `PopulationenAnzahlMassnahmen`,
                  })
                }
              />
              <FlatButton
                label="Anzahl Kontrollen pro Population"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_anzkontr`,
                    fileName: `PopulationenAnzahlKontrollen`,
                  })
                }
              />
              <FlatButton
                label="Populationen inkl. Populations- und Massnahmen-Berichte"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_popberundmassnber`,
                    fileName: `PopulationenPopUndMassnBerichte`,
                  })
                }
              />
              <FlatButton
                label="Populationen mit dem letzten Populations-Bericht"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_mit_letzter_popber`,
                    fileName: `PopulationenMitLetzemPopBericht`,
                  })
                }
              />
              <FlatButton
                label="Populationen mit dem letzten Massnahmen-Bericht"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_mit_letzter_popmassnber`,
                    fileName: `PopulationenMitLetztemMassnBericht`,
                  })
                }
              />
            </CardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Teilpopulationen"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
            </CardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Kontrollen"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
            </CardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Beobachtungen"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
            </CardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Anwendung"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
            </CardText>
          </FirstLevelCard>
        </FieldsContainer>
      </Container>
    )
  }
}
