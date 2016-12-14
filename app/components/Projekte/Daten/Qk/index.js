import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import dateFns from 'date-fns'
import TextField from 'material-ui/TextField'
import Linkify from 'react-linkify'
import isArray from 'lodash/isArray'
import groupBy from 'lodash/groupBy'
import { Card, CardText } from 'material-ui/Card'
import FormTitle from '../../../shared/FormTitle'
import styles from './styles.css'
import apiBaseUrl from '../../../../modules/apiBaseUrl'
import appBaseUrl from '../../../../modules/appBaseUrl'

@inject(`store`)
@observer
class Qk extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      berichtjahr: dateFns.format(new Date(), `YYYY`),
      messages: [],
    }
    this.check = this.check.bind(this)
  }

  componentDidMount() {
    this.check()
  }

  check() {
    const { store } = this.props
    const { berichtjahr } = this.state
    let { messages } = this.state
    const qkTypes = [
      // pop ohne Nr/Name/Status/bekannt seit/Koordinaten/tpop
      { type: `view`, name: `v_qk2_pop_ohnepopnr` },
      { type: `view`, name: `v_qk2_pop_ohnepopname` },
      { type: `view`, name: `v_qk2_pop_ohnepopstatus` },
      { type: `view`, name: `v_qk2_pop_ohnebekanntseit` },
      { type: `view`, name: `v_qk2_pop_ohnekoord` },
      { type: `view`, name: `v_qk2_pop_ohnetpop` },
      // pop mit Status unklar, ohne Begründung
      { type: `view`, name: `v_qk2_pop_mitstatusunklarohnebegruendung` },
      // pop mit mehrdeutiger Nr
      { type: `view`, name: `v_qk2_pop_popnrmehrdeutig` },
      // Pop ohne verlangten Pop-Bericht im Berichtjahr
      { type: `query`, name: `qk2PopOhnePopber`, berichtjahr },
      // Pop ohne verlangten Pop-Massn-Bericht im Berichtjahr
      { type: `query`, name: `qk2PopOhnePopmassnber`, berichtjahr },
      // Entsprechen Koordinaten der Pop einer der TPops?
      { type: `view`, name: `v_qk2_pop_koordentsprechenkeinertpop` },
      // pop mit Status ansaatversuch, es gibt tpop mit status aktuell
      { type: `view`, name: `v_qk2_pop_statusansaatversuchmitaktuellentpop` },
      // pop mit Status ansaatversuch, es gibt tpop mit status ursprünglich erloschen
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
      // Teilpopulation: Status ist "aktuell", der letzte Teilpopulations-Bericht meldet aber "erloschen"
      { type: `view`, name: `v_qk2_tpop_statusaktuellletzterpopbererloschen` },
      // Teilpopulation: Status ist "erloschen", der letzte Teilpopulations-Bericht meldet aber "aktuell"
      { type: `view`, name: `v_qk2_tpop_statuserloschenletzterpopberaktuell` },
      // Population: Status ist "potenzieller Wuchs-/Ansiedlungsort",
      // es gibt aber eine Teilpopulation mit Status "angesiedelt" oder "ursprünglich":
      { type: `view`, name: `v_qk2_pop_statusaktuellletzterpopbererloschen` },
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
      // pop/tpop mit Status unklar ohne Begründung
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
    const dataFetchingPromises = urls.map(url =>
      axios.get(url)
        .then((res) => {
          if (res.data.length > 0) {
            messages = messages.concat(res.data)
            this.setState({ messages })
          }
          return null
        })
        .catch(e => e)
    )
    Promise.all(dataFetchingPromises)
      .then(() => {
        console.log(`check finished`)
        // TODO: if no messages: tell user
      })
      .catch(error => console.log(error))
    // TODO: kontrolliereRelevanzAusserkantonalerTpop()
  }

  render() {
    const { berichtjahr, messages } = this.state
    const messagesGrouped = groupBy(messages, `hw`)
    console.log(`messagesGrouped:`, messagesGrouped)
    Object.keys(messagesGrouped).forEach((key) => {
      messagesGrouped[key] = messagesGrouped[key].map(v => v.url)
    })
    console.log(`messagesGrouped with url:`, messagesGrouped)
    return (
      <div className={styles.container}>
        <FormTitle title="Qualitätskontrollen" />
        <div className={styles.fieldsContainer}>
          <TextField
            floatingLabelText="Berichtjahr"
            type="number"
            value={berichtjahr || ``}
            fullWidth
            onChange={(event, val) =>
              this.setState({ berichtjahr: val })
            }
            onBlur={() =>
              this.check()
            }
          />
          {messages.map((m, index) => {
            let link = (
              <CardText className={styles.link}>
                <Linkify properties={{ target: `_blank`, style: { color: `white` } }}>
                  {`${appBaseUrl}/${m.url.join(`/`)}`}
                </Linkify>
              </CardText>
            )
            if (m.url[0] && isArray(m.url[0])) {
              // an array of arrays was returned
              link = (
                <CardText className={styles.link}>
                  <Linkify properties={{ target: `_blank`, style: { color: `white` } }}>
                    {m.url.map((u, i) => (
                      `${appBaseUrl}/${u.join(`/`)}${i === m.url.length ? `, ` : ``}`
                    ))}
                  </Linkify>
                </CardText>
              )
            }
            return (
              <Card key={index} className={styles.card}>
                <CardText className={styles.text}>
                  {m.hw}
                </CardText>
                {link}
              </Card>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Qk
