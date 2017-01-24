import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import dateFns from 'date-fns'
import TextField from 'material-ui/TextField'
import Linkify from 'react-linkify'
import isArray from 'lodash/isArray'
import styled from 'styled-components'
import { Card, CardText } from 'material-ui/Card'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

import FormTitle from '../../shared/FormTitle'
import apiBaseUrl from '../../../modules/apiBaseUrl'
import appBaseUrl from '../../../modules/appBaseUrl'
import zhGeojson from '../../../etc/ktZh.json'
import isPointInsidePolygon from '../../../modules/isPointInsidePolygon'

const Container = styled.div`
  height: 100%;
`
const FieldsContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  overflow-x: auto;
  height: 100%;
  padding-bottom: 95px;
`
const StyledCard = styled(Card)`
  margin-bottom: 10px !important;
`
const Title = styled.div`
  font-weight: bold;
`
const FilterField = styled(TextField)`
  margin-top: -15px;
  margin-bottom: 10px;
`

const enhance = compose(
  inject(`store`),
  withState(`berichtjahr`, `changeBerichtjahr`, parseInt(dateFns.format(new Date(), `YYYY`), 10)),
  withState(`messages`, `changeMessages`, []),
  withState(`filter`, `changeFilter`, null),
  withHandlers({
    onClickDiv: props => (event) => {
      event.preventDefault()
      props.changePopupOpen(!props.popupOpen)
      props.changePopupAnchorEl(event.currentTarget)
    },
    onRequestClosePopover: props => () =>
      props.changePopupOpen(false)
    ,
  }),
  observer
)

class Qk extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object.isRequired,
    berichtjahr: PropTypes.number.isRequired,
    changeBerichtjahr: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    filter: PropTypes.string,
    changeMessages: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
  }

  static defaultProps = {
    filter: ``,
  }

  constructor() {
    super()
    this.check = this.check.bind(this)
  }

  componentDidMount() {
    this.check()
  }

  check() {
    const { store, berichtjahr, changeMessages } = this.props
    const messages = []
    const qkTypes = [
      // Population: ohne Nr/Name/Status/bekannt seit/Koordinaten/tpop
      { type: `view`, name: `v_qk2_pop_ohnepopnr` },
      { type: `view`, name: `v_qk2_pop_ohnepopname` },
      { type: `view`, name: `v_qk2_pop_ohnepopstatus` },
      { type: `view`, name: `v_qk2_pop_ohnebekanntseit` },
      { type: `view`, name: `v_qk2_pop_ohnekoord` },
      { type: `view`, name: `v_qk2_pop_ohnetpop` },
      // Population: mit Status unklar, ohne Begründung
      { type: `view`, name: `v_qk2_pop_mitstatusunklarohnebegruendung` },
      // Population: mit mehrdeutiger Nr
      { type: `view`, name: `v_qk2_pop_popnrmehrdeutig` },
      // Population: ohne verlangten Pop-Bericht im Berichtjahr
      { type: `query`, name: `qk2PopOhnePopber`, berichtjahr },
      // Population: ohne verlangten Pop-Massn-Bericht im Berichtjahr
      { type: `query`, name: `qk2PopOhnePopmassnber`, berichtjahr },
      // Population: Entsprechen Koordinaten der Pop einer der TPops?
      { type: `view`, name: `v_qk2_pop_koordentsprechenkeinertpop` },
      // Population: Status ist ansaatversuch,
      // es gibt tpop mit status aktuell oder erloschene, die vor Beginn AP bestanden
      { type: `view`, name: `v_qk2_pop_statusansaatversuchmitaktuellentpop` },
      // Population: Status ist ansaatversuch, alle tpop sind gemäss Status erloschen
      { type: `view`, name: `v_qk2_pop_statusansaatversuchalletpoperloschen` },
      // Population: Status ist ansaatversuch, es gibt tpop mit status ursprünglich erloschen
      { type: `view`, name: `v_qk2_pop_statusansaatversuchmittpopursprerloschen` },
      // Population: Status ist "erloschen" (ursprünglich oder angesiedelt),
      // es gibt aber eine Teilpopulation mit Status "aktuell" (ursprünglich oder angesiedelt)
      { type: `view`, name: `v_qk2_pop_statuserloschenmittpopaktuell` },
      // Population: Status ist "erloschen" (ursprünglich oder angesiedelt),
      // es gibt aber eine Teilpopulation mit Status "angesiedelt, Ansaatversuch":
      { type: `view`, name: `v_qk2_pop_statuserloschenmittpopansaatversuch` },
      // Population: Status ist "angesiedelt", es gibt aber eine Teilpopulation mit Status "ursprünglich":
      { type: `view`, name: `v_qk2_pop_statusangesiedeltmittpopurspruenglich` },
      // Population: Status ist "aktuell", der letzte Populations-Bericht meldet aber "erloschen"
      { type: `view`, name: `v_qk2_pop_statusaktuellletzterpopbererloschen` },
      // Population: Status ist "erloschen", der letzte Populations-Bericht meldet aber "aktuell"
      { type: `view`, name: `v_qk2_pop_statuserloschenletzterpopberaktuell` },
      // Population: Status ist "potenzieller Wuchs-/Ansiedlungsort",
      // es gibt aber eine Teilpopulation mit Status "angesiedelt" oder "ursprünglich":
      { type: `view`, name: `v_qk2_pop_statusaktuellletzterpopbererloschen` },
      // Teilpopulation: Status ist "aktuell", der letzte Teilpopulations-Bericht meldet aber "erloschen"
      { type: `view`, name: `v_qk2_tpop_statusaktuellletzterpopbererloschen` },
      // Teilpopulation: Status ist "erloschen", der letzte Teilpopulations-Bericht meldet aber "aktuell"
      { type: `view`, name: `v_qk2_tpop_statuserloschenletzterpopberaktuell` },
      // tpop ohne Nr/Flurname/Status/bekannt seit/Koordinaten
      { type: `view`, name: `v_qk2_tpop_ohnenr` },
      { type: `view`, name: `v_qk2_tpop_ohneflurname` },
      { type: `view`, name: `v_qk2_tpop_ohnestatus` },
      { type: `view`, name: `v_qk2_tpop_ohnebekanntseit` },
      { type: `view`, name: `v_qk2_tpop_ohneapberrelevant` },
      { type: `view`, name: `v_qk2_tpop_ohnekoordinaten` },
      // tpop relevant, die nicht relevant sein sollten
      { type: `view`, name: `v_qk2_tpop_statuspotentiellfuerapberrelevant` },
      { type: `view`, name: `v_qk2_tpop_erloschenundrelevantaberletztebeobvor1950` },
      // tpop mit Status unklar ohne Begründung
      { type: `view`, name: `v_qk2_tpop_mitstatusunklarohnebegruendung` },
      // tpop mit mehrdeutiger Kombination von PopNr und TPopNr
      { type: `view`, name: `v_qk2_tpop_popnrtpopnrmehrdeutig` },
      // TPop ohne verlangten TPop-Bericht im Berichtjahr
      { type: `query`, name: `qk2TpopOhneTpopber`, berichtjahr },
      // TPop ohne verlangten TPop-Massn.-Bericht im Berichtjahr
      { type: `query`, name: `qk2TpopOhneMassnber`, berichtjahr },
      // Teilpopulation mit Status "Ansaatversuch", bei denen in einer Kontrolle eine Anzahl festgestellt wurde:
      { type: `view`, name: `v_qk2_tpop_mitstatusansaatversuchundzaehlungmitanzahl` },
      // Teilpopulation mit Status "potentieller Wuchs-/Ansiedlungsort",
      // bei der eine Massnahme des Typs "Ansiedlung" existiert:
      { type: `view`, name: `v_qk2_tpop_mitstatuspotentiellundmassnansiedlung` },
      // Massn ohne Jahr/Typ
      { type: `view`, name: `v_qk2_massn_ohnejahr` },
      { type: `view`, name: `v_qk2_massn_ohnetyp`, berichtjahr },
      // Massn.-Bericht ohne Jahr/Entwicklung
      { type: `view`, name: `v_qk2_massnber_ohnejahr` },
      { type: `view`, name: `v_qk2_massnber_ohneerfbeurt`, berichtjahr },
      // Kontrolle ohne Jahr/Zählung/Kontrolltyp
      { type: `view`, name: `v_qk2_feldkontr_ohnejahr` },
      { type: `view`, name: `v_qk2_freiwkontr_ohnejahr` },
      { type: `view`, name: `v_qk2_feldkontr_ohnezaehlung`, berichtjahr },
      { type: `view`, name: `v_qk2_freiwkontr_ohnezaehlung`, berichtjahr },
      { type: `view`, name: `v_qk2_feldkontr_ohnetyp`, berichtjahr },
      // Zählung ohne Einheit/Methode/Anzahl
      { type: `view`, name: `v_qk2_feldkontrzaehlung_ohneeinheit`, berichtjahr },
      { type: `view`, name: `v_qk2_freiwkontrzaehlung_ohneeinheit`, berichtjahr },
      { type: `view`, name: `v_qk2_feldkontrzaehlung_ohnemethode`, berichtjahr },
      { type: `view`, name: `v_qk2_freiwkontrzaehlung_ohnemethode`, berichtjahr },
      { type: `view`, name: `v_qk2_feldkontrzaehlung_ohneanzahl`, berichtjahr },
      { type: `view`, name: `v_qk2_freiwkontrzaehlung_ohneanzahl`, berichtjahr },
      // TPop-Bericht ohne Jahr/Entwicklung
      { type: `view`, name: `v_qk2_tpopber_ohnejahr` },
      { type: `view`, name: `v_qk2_tpopber_ohneentwicklung`, berichtjahr },
      // Pop-Bericht/Pop-Massn.-Bericht ohne Jahr/Entwicklung
      { type: `view`, name: `v_qk2_popber_ohnejahr` },
      { type: `view`, name: `v_qk2_popber_ohneentwicklung`, berichtjahr },
      { type: `view`, name: `v_qk2_popmassnber_ohnejahr` },
      { type: `view`, name: `v_qk2_popmassnber_ohneentwicklung`, berichtjahr },
      // Ziel ohne Jahr/Zieltyp/Ziel
      { type: `view`, name: `v_qk2_ziel_ohnejahr` },
      { type: `view`, name: `v_qk2_ziel_ohnetyp` },
      { type: `view`, name: `v_qk2_ziel_ohneziel` },
      // Ziel-Bericht ohne Jahr/Entwicklung
      { type: `view`, name: `v_qk2_zielber_ohnejahr` },
      { type: `view`, name: `v_qk2_zielber_ohneentwicklung`, berichtjahr },
      // AP-Erfolgskriterium ohne Beurteilung/Kriterien
      { type: `view`, name: `v_qk2_erfkrit_ohnebeurteilung` },
      { type: `view`, name: `v_qk2_erfkrit_ohnekriterien` },
      // AP-Bericht ohne Jahr/Vergleich Vorjahr-Gesamtziel/Beurteilung
      { type: `view`, name: `v_qk2_apber_ohnejahr` },
      { type: `view`, name: `v_qk2_apber_ohnevergleichvorjahrgesamtziel`, berichtjahr },
      { type: `view`, name: `v_qk2_apber_ohnebeurteilung`, berichtjahr },
      // assoziierte Art ohne Art
      { type: `view`, name: `v_qk2_assozart_ohneart` },
    ]
    const urls = qkTypes.map(t =>
      `${apiBaseUrl}/${t.type === `view` ? `qkView/` : ``}${t.name}/${store.activeUrlElements.ap}${t.berichtjahr ? `/${t.berichtjahr}` : ``}`
    )
    const dataFetchingPromises = urls.map(dataUrl =>
      axios.get(dataUrl)
        .then((res) => {
          if (res.data.length > 0) {
            const hw = res.data[0].hw
            const url = res.data.map(d => d.url)
            messages.push({ hw, url })
            changeMessages(messages)
          }
          return null
        })
        .catch(e => e)
    )
    Promise.all(dataFetchingPromises)
      .then(() => axios.get(`${apiBaseUrl}/tpopKoordFuerProgramm/apId=${store.activeUrlElements.ap}`))
      .then((res) => {
        // kontrolliere die Relevanz ausserkantonaler Tpop
        const tpops = res.data.filter(tpop =>
          tpop.TPopApBerichtRelevant === 1 && !isPointInsidePolygon(zhGeojson, tpop.TPopXKoord, tpop.TPopYKoord)
        )
        if (tpops.length > 0) {
          messages.push({
            hw: `Teilpopulation ist als 'Für AP-Bericht relevant' markiert, liegt aber ausserhalb des Kt. Zürich und sollte daher nicht relevant sein:`,
            url: tpops.map(tpop => [`Projekte`, 1, `Arten`, tpop.ApArtId, `Populationen`, tpop.PopId, `Teil-Populationen`, tpop.TPopId]),
          })
          changeMessages(messages)
        }
        // if no messages: tell user
        if (messages.length === 0) {
          messages.push({ hw: `Wow: Scheint alles i.O. zu sein!` })
          changeMessages(messages)
        }
      })
      .catch(error =>
        store.listError(error)
      )
  }

  render() {
    const {
      berichtjahr,
      messages,
      filter,
      changeBerichtjahr,
      changeFilter,
    } = this.props
    const messagesFiltered = (
      filter ?
      messages.filter(m =>
        m.hw.toLowerCase().includes(filter.toLowerCase())
      ) :
      messages
    )

    return (
      <Container>
        <FormTitle title="Qualitätskontrollen" />
        <FieldsContainer>
          <TextField
            floatingLabelText="Berichtjahr"
            type="number"
            value={berichtjahr}
            fullWidth
            onChange={(event, val) =>
              changeBerichtjahr(val)
            }
            onBlur={this.check}
          />
          <FilterField
            floatingLabelText="nach Typ filtern"
            type="text"
            value={filter || ``}
            fullWidth
            onChange={(event, val) =>
              changeFilter(val)
            }
          />
          {
            messagesFiltered.map((m, index) => {
              let links = null
              let children
              if (m.url) {
                children = `${appBaseUrl}/${m.url.join(`/`)}`
                if (m.url[0] && isArray(m.url[0])) {
                  // an array of arrays was returned
                  children = m.url.map((u, i) => (
                    <div key={i}>{`${appBaseUrl}/${u.join(`/`)}`}</div>
                  ))
                  if (m.url[0][0] && isArray(m.url[0][0])) {
                    children = m.url.map((u, i) => u.map((uu, ii) => (
                      <div key={`${i}/${ii}`}>{`${appBaseUrl}/${uu.join(`/`)}`}</div>
                    )))
                  }
                }
                links = (
                  <Linkify properties={{ target: `_blank`, style: { color: `white`, fontWeight: 100 } }}>
                    {children}
                  </Linkify>
                )
              }
              return (
                <StyledCard key={index}>
                  <CardText>
                    <Title>
                      {m.hw}
                    </Title>
                    <div>
                      {links}
                    </div>
                  </CardText>
                </StyledCard>
              )
            })
          }
        </FieldsContainer>
      </Container>
    )
  }
}

export default enhance(Qk)
