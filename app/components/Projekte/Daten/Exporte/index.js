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
const DownloadCardText = styled(CardText)`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: stretch;
  align-content: stretch;
`
const DownloadCardButton = styled(FlatButton)`
  flex-basis: 300px;
  height: 100% !important;
  text-align: left !important;
  line-height: 18px !important;
  padding: 16px !important;
  > div {
    > span {
      text-transform: none !important;
      padding-left: 0 !important;
    }
    > div {
      font-weight: 500;
    }
  }
`

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
            <DownloadCardText
              expandable
            >
              <DownloadCardButton
                label="Arten"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ap`,
                    fileName: `Arten`,
                  })
                }
              />
              <DownloadCardButton
                label="Arten ohne Populationen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ap_ohnepop`,
                    fileName: `ArtenOhnePopulationen`,
                  })
                }
              />
              <DownloadCardButton
                label="Anzahl Massnahmen pro Art"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ap_anzmassn`,
                    fileName: `ArtenAnzahlMassnahmen`,
                  })
                }
              />
              <DownloadCardButton
                label="Anzahl Kontrollen pro Art"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ap_anzkontr`,
                    fileName: `ArtenAnzahlKontrollen`,
                  })
                }
              />
              <DownloadCardButton
                label="AP-Berichte (Jahresberichte)"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_apber`,
                    fileName: `Jahresberichte`,
                  })
                }
              />
              <DownloadCardButton
                label="AP-Berichte und Massnahmen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ap_apberundmassn`,
                    fileName: `ApJahresberichteUndMassnahmen`,
                  })
                }
              />
              <DownloadCardButton
                label="Ziele"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ziel`,
                    fileName: `ApZiele`,
                  })
                }
              />
              <DownloadCardButton
                label="Ziel-Berichte"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_zielber`,
                    fileName: `Zielberichte`,
                  })
                }
              />
              <DownloadCardButton
                label="Berichte"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_ber`,
                    fileName: `Berichte`,
                  })
                }
              />
              <DownloadCardButton
                label="Erfolgskriterien"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_erfkrit`,
                    fileName: `Erfolgskriterien`,
                  })
                }
              />
              <DownloadCardButton
                label="Idealbiotope"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_idealbiotop`,
                    fileName: `Idealbiotope`,
                  })
                }
              />
              <DownloadCardButton
                label="Assoziierte Arten"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_assozart`,
                    fileName: `AssoziierteArten`,
                  })
                }
              />
            </DownloadCardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Populationen"
              actAsExpander
              showExpandableButton
            />
            <DownloadCardText
              expandable
            >
              <DownloadCardButton
                label="Populationen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop`,
                    fileName: `Populationen`,
                  })
                }
              />
              <DownloadCardButton
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_kml`,
                    fileName: `Populationen`,
                  })
                }
              >
                <div>Populationen für Google Earth</div>
                <div>(beschriftet mit PopNr)</div>
              </DownloadCardButton>
              <DownloadCardButton
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_kmlnamen`,
                    fileName: `PopulationenNachNamen`,
                  })
                }
              >
                <div>Populationen für Google Earth</div>
                <div>(beschriftet mit Artname, PopNr)</div>
              </DownloadCardButton>
              <DownloadCardButton
                label="Populationen ohne Teilpopulationen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_ohnetpop`,
                    fileName: `PopulationenOhneTeilpopulationen`,
                  })
                }
              />
              <DownloadCardButton
                label="Populationen von AP-Arten ohne Status"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_vonapohnestatus`,
                    fileName: `PopulationenVonApArtenOhneStatus`,
                  })
                }
              />
              <DownloadCardButton
                label="Populationen ohne Koordinaten"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_ohnekoord`,
                    fileName: `PopulationenOhneKoordinaten`,
                  })
                }
              />
              <DownloadCardButton
                label="Populationen mit Massnahmen-Berichten: Anzahl Massnahmen im Berichtsjahr"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_popmassnber_anzmassn`,
                    fileName: `PopulationenAnzMassnProMassnber`,
                  })
                }
              />
              <DownloadCardButton
                label="Anzahl Massnahmen pro Population"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_anzmassn`,
                    fileName: `PopulationenAnzahlMassnahmen`,
                  })
                }
              />
              <DownloadCardButton
                label="Anzahl Kontrollen pro Population"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_anzkontr`,
                    fileName: `PopulationenAnzahlKontrollen`,
                  })
                }
              />
              <DownloadCardButton
                label="Populationen inkl. Populations- und Massnahmen-Berichte"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_popberundmassnber`,
                    fileName: `PopulationenPopUndMassnBerichte`,
                  })
                }
              />
              <DownloadCardButton
                label="Populationen mit dem letzten Populations-Bericht"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_mit_letzter_popber`,
                    fileName: `PopulationenMitLetzemPopBericht`,
                  })
                }
              />
              <DownloadCardButton
                label="Populationen mit dem letzten Massnahmen-Bericht"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_pop_mit_letzter_popmassnber`,
                    fileName: `PopulationenMitLetztemMassnBericht`,
                  })
                }
              />
            </DownloadCardText>
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
