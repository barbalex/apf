import React, { PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import fileDownload from 'react-file-download'
import format from 'date-fns/format'
import axios from 'axios'
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter'
import AutoComplete from 'material-ui/AutoComplete'
import { orange500 } from 'material-ui/styles/colors'
// import beziehungen from '../../../../etc/beziehungen.png'

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
  flex-basis: 410px;
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
const AutocompleteContainer = styled.div`
  flex-basis: 410px;
  padding-left: 16px;
`
const StyledAutoComplete = styled(AutoComplete)`
  > input, > div, > label {
    font-size: 14px !important;
    font-color: red !important;
  }
`
const isRemoteHost = window.location.hostname !== `localhost`

@inject(`store`)
@observer
export default class Exporte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    store: PropTypes.object,
  }

  constructor() {
    super()
    this.downloadFromView = this.downloadFromView.bind(this)
    this.state = {
      artFuerEierlegendeWollmilchsau: ``,
    }
  }

  downloadFromView({ view, fileName, apArtId }) {  // eslint-disable-line class-methods-use-this
    const { store } = this.props
    const file = `${fileName}_${format(new Date(), `YYYY-MM-DD_HH-mm-ss`)}`
    const url = `${apiBaseUrl}/exportView/csv/view=${view}/filename=${file}${apArtId ? `/${apArtId}` : ``}`
    axios.get(url)
      .then(({ data }) => {
        fileDownload(data, `${file}.csv`)
        if (this.state.artFuerEierlegendeWollmilchsau) {
          this.setState({
            artFuerEierlegendeWollmilchsau: ``,
          })
        }
      })
      .catch((error) => {
        if (this.state.artFuerEierlegendeWollmilchsau) {
          this.setState({
            artFuerEierlegendeWollmilchsau: ``,
          })
        }
        store.listError(error)
      })
  }

  get artList() {
    const { store } = this.props
    const { adb_eigenschaften } = store.table
    const apIds = Array.from(store.table.ap.keys()).map(n => Number(n))
    let artList = Array.from(adb_eigenschaften.values())
    artList = filter(artList, r =>
      apIds.includes(r.TaxonomieId)
    )
    return sortBy(artList, `Artname`)
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
            <DownloadCardText
              expandable
            >
              <DownloadCardButton
                label="Teilpopulationen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_tpop`,
                    fileName: `Teilpopulationen`,
                  })
                }
              />
              <DownloadCardButton
                onClick={() =>
                  this.downloadFromView({
                    view: `v_tpop_kml`,
                    fileName: `Teilpopulationen`,
                  })
                }
              >
                <div>Teilpopulationen für Google Earth</div>
                <div>(beschriftet mit PopNr/TPopNr)</div>
              </DownloadCardButton>
              <DownloadCardButton
                onClick={() =>
                  this.downloadFromView({
                    view: `v_tpop_kmlnamen`,
                    fileName: `TeilpopulationenNachNamen`,
                  })
                }
              >
                <div>Teilpopulationen für Google Earth</div>
                <div>(beschriftet mit Artname, PopNr/TPopNr)</div>
              </DownloadCardButton>
              <DownloadCardButton
                onClick={() =>
                  this.downloadFromView({
                    view: `v_tpop_ohnebekanntseit`,
                    fileName: `TeilpopulationenVonApArtenOhneBekanntSeit`,
                  })
                }
              >
                <div>Teilpopulationen von AP-Arten</div>
                <div>{`ohne "Bekannt seit"`}</div>
              </DownloadCardButton>
              <DownloadCardButton
                onClick={() =>
                  this.downloadFromView({
                    view: `v_tpop_ohneapberichtrelevant`,
                    fileName: `TeilpopulationenOhneApBerichtRelevant`,
                  })
                }
              >
                <div>Teilpopulationen ohne Eintrag</div>
                <div>{`im Feld "Für AP-Bericht relevant"`}</div>
              </DownloadCardButton>
              <DownloadCardButton
                onClick={() =>
                  this.downloadFromView({
                    view: `v_tpop_popnrtpopnrmehrdeutig`,
                    fileName: `TeilpopulationenPopnrTpopnrMehrdeutig`,
                  })
                }
              >
                <div>Teilpopulationen mit mehrdeutiger</div>
                <div>Kombination von PopNr und TPopNr</div>
              </DownloadCardButton>
              <DownloadCardButton
                label="Anzahl Massnahmen pro Teilpopulation"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_tpop_anzmassn`,
                    fileName: `TeilpopulationenAnzahlMassnahmen`,
                  })
                }
              />
              <DownloadCardButton
                onClick={() =>
                  this.downloadFromView({
                    view: `v_tpop_anzkontrinklletzterundletztertpopber`,
                    fileName: `TeilpopulationenAnzKontrInklusiveLetzteKontrUndLetztenTPopBericht`,
                  })
                }
                disabled={isRemoteHost}
                title={
                  isRemoteHost ?
                  `Funktioniert nur, wenn apflora lokal installiert wird` :
                  ``
                }
              >
                <div>Teilpopulationen mit:</div>
                <ul
                  style={{
                    paddingLeft: `18px`,
                    marginTop: `5px`,
                    marginBottom: `10px`,
                  }}
                >
                  <li>Anzahl Kontrollen</li>
                  <li>letzte Kontrolle</li>
                  <li>letzter Teilpopulationsbericht</li>
                  <li>letzte Zählung</li>
                </ul>
                <div>{`= "Eier legende Wollmilchsau"`}</div>
              </DownloadCardButton>
              <AutocompleteContainer>
                <StyledAutoComplete
                  hintText={this.artList.length === 0 ? `lade Daten...` : `Art wählen`}
                  floatingLabelText={`"Eier legende Wollmilchsau" für eine Art`}
                  openOnFocus
                  searchText={this.state.artFuerEierlegendeWollmilchsau}
                  errorText={this.state.artFuerEierlegendeWollmilchsau ? `hole Daten...` : ``}
                  errorStyle={{ color: orange500 }}
                  dataSource={this.artList}
                  dataSourceConfig={{
                    value: `TaxonomieId`,
                    text: `Artname`,
                  }}
                  filter={AutoComplete.caseInsensitiveFilter}
                  maxSearchResults={20}
                  menuStyle={{
                    fontSize: `6px !important`,
                  }}
                  onNewRequest={(val) => {
                    this.setState({
                      artFuerEierlegendeWollmilchsau: val.Artname,
                    })
                    this.downloadFromView({
                      view: `v_tpop_anzkontrinklletzterundletztertpopber`,
                      fileName: `anzkontrinklletzterundletztertpopber_2016`,
                      apArtId: val.TaxonomieId,
                    })
                  }}
                />
              </AutocompleteContainer>
              <DownloadCardButton
                label="Teilpopulationen inklusive Teilpopulations- und Massnahmen-Berichten"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_tpop_popberundmassnber`,
                    fileName: `TeilpopulationenTPopUndMassnBerichte`,
                  })
                }
              />
            </DownloadCardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Kontrollen"
              actAsExpander
              showExpandableButton
            />
            <DownloadCardText
              expandable
            >
              <DownloadCardButton
                label="Kontrollen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_tpopkontr`,
                    fileName: `Kontrollen`,
                  })
                }
              />
              <DownloadCardButton
                label="Kontrollen: Anzahl pro Zähleinheit"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_kontrzaehl_anzproeinheit`,
                    fileName: `KontrollenAnzahlProZaehleinheit`,
                  })
                }
              />
            </DownloadCardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Massnahmen"
              actAsExpander
              showExpandableButton
            />
            <DownloadCardText
              expandable
            >
              <DownloadCardButton
                label="Massnahmen"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_massn`,
                    fileName: `Massnahmen`,
                  })
                }
              />
            </DownloadCardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Beobachtungen"
              actAsExpander
              showExpandableButton
            />
            <DownloadCardText
              expandable
            >
              <DownloadCardButton
                onClick={() =>
                  this.downloadFromView({
                    view: `v_beob`,
                    fileName: `Beobachtungen`,
                  })
                }
              >
                <div>Beobachtungen</div>
                <div>zugeordnet und nicht zuzuordnen</div>
                <div>von Infospezies und EvAB</div>
              </DownloadCardButton>
              <DownloadCardButton
                onClick={() =>
                  this.downloadFromView({
                    view: `v_beob_infospezies`,
                    fileName: `BeobachtungenInfospezies`,
                  })
                }
              >
                <div>Beobachtungen</div>
                <div>zugeordnet und nicht zuzuordnen</div>
                <div>nur von Infospezies</div>
              </DownloadCardButton>
            </DownloadCardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Anwendung"
              actAsExpander
              showExpandableButton
            />
            <DownloadCardText
              expandable
            >
              <DownloadCardButton
                label="Tabellen und Felder"
                onClick={() =>
                  this.downloadFromView({
                    view: `v_datenstruktur`,
                    fileName: `Datenstruktur`,
                  })
                }
              />
              <DownloadCardButton
                label="Datenstruktur grafisch dargestellt"
                onClick={() => {
                  // fileDownload(beziehungen, `apfloraBeziehungen.png`)
                  window.open(`${apiBaseUrl}/etc/beziehungen.png`)
                }}
              />
            </DownloadCardText>
          </FirstLevelCard>
        </FieldsContainer>
      </Container>
    )
  }
}
