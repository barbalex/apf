import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import dateFns from 'date-fns'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FormTitle from '../../../shared/FormTitle'
import styles from './styles.css'
import apiBaseUrl from '../../../../modules/apiBaseUrl'

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
      { type: `view`, name: `v_qk_pop_ohnepopnr` },
      { type: `view`, name: `v_qk_pop_ohnepopname` },
      { type: `view`, name: `v_qk_pop_ohnepopstatus` },
      { type: `view`, name: `v_qk_pop_ohnebekanntseit` },
      { type: `view`, name: `v_qk_pop_ohnekoord` },
      { type: `view`, name: `v_qk_pop_ohnetpop` },
      // pop mit Status unklar, ohne Begründung
      { type: `view`, name: `v_qk_pop_mitstatusunklarohnebegruendung` },
      // pop mit mehrdeutiger Nr
      { type: `view`, name: `v_qk_pop_popnrmehrdeutig` },
      // Pop ohne verlangten Pop-Bericht im Berichtjahr
      { type: `query`, name: `qkPopOhnePopber`, berichtjahr },
      // Pop ohne verlangten Pop-Massn-Bericht im Berichtjahr
      { type: `query`, name: `qkPopOhnePopmassnber`, berichtjahr },
      // Entsprechen Koordinaten der Pop einer der TPops?
      { type: `view`, name: `v_qk_pop_koordentsprechenkeinertpop` },
      // pop mit Status ansaatversuch, es gibt tpop mit status aktuell
      { type: `view`, name: `v_qk_pop_statusansaatversuchmitaktuellentpop` },
      // pop mit Status ansaatversuch, es gibt tpop mit status ursprünglich erloschen
      { type: `view`, name: `v_qk_pop_statusansaatversuchmittpopursprerloschen` },
      // Population: Status ist "erloschen" (ursprünglich oder angesiedelt),
      // es gibt aber eine Teilpopulation mit Status "aktuell" (ursprünglich oder angesiedelt)
      { type: `view`, name: `v_qk_pop_statuserloschenmittpopaktuell` },
      // Population: Status ist "erloschen" (ursprünglich oder angesiedelt),
      // es gibt aber eine Teilpopulation mit Status "angesiedelt, Ansaatversuch":
      { type: `view`, name: `v_qk_pop_statuserloschenmittpopansaatversuch` },
      // Population: Status ist "angesiedelt", es gibt aber eine Teilpopulation mit Status "ursprünglich":
      { type: `view`, name: `v_qk_pop_statusangesiedeltmittpopurspruenglich` },
      // Population: Status ist "aktuell", der letzte Populations-Bericht meldet aber "erloschen"
      { type: `view`, name: `v_qk_pop_statusaktuellletzterpopbererloschen` },
      // Population: Status ist "erloschen", der letzte Populations-Bericht meldet aber "aktuell"
      { type: `view`, name: `v_qk_pop_statuserloschenletzterpopberaktuell` },
      // Teilpopulation: Status ist "aktuell", der letzte Teilpopulations-Bericht meldet aber "erloschen"
      { type: `view`, name: `v_qk_tpop_statusaktuellletzterpopbererloschen` },
      // Teilpopulation: Status ist "erloschen", der letzte Teilpopulations-Bericht meldet aber "aktuell"
      { type: `view`, name: `v_qk_tpop_statuserloschenletzterpopberaktuell` },
      // Population: Status ist "potenzieller Wuchs-/Ansiedlungsort",
      // es gibt aber eine Teilpopulation mit Status "angesiedelt" oder "ursprünglich":
      { type: `view`, name: `v_qk_pop_statusaktuellletzterpopbererloschen` },
      // tpop ohne Nr/Flurname/Status/bekannt seit/Koordinaten
      { type: `view`, name: `v_qk_tpop_ohnenr` },
      { type: `view`, name: `v_qk_tpop_ohneflurname` },
      { type: `view`, name: `v_qk_tpop_ohnestatus` },
      { type: `view`, name: `v_qk_tpop_ohnebekanntseit` },
      { type: `view`, name: `v_qk_tpop_ohneapberrelevant` },
      { type: `view`, name: `v_qk_tpop_ohnekoordinaten` },
      // tpop relevant, die nicht relevant sein sollten
      { type: `view`, name: `v_qk_tpop_statuspotentiellfuerapberrelevant` },
      { type: `view`, name: `v_qk_tpop_erloschenundrelevantaberletztebeobvor1950` },
      // pop/tpop mit Status unklar ohne Begründung
      { type: `view`, name: `v_qk_tpop_mitstatusunklarohnebegruendung` },
      // tpop mit mehrdeutiger Kombination von PopNr und TPopNr
      { type: `view`, name: `v_qk_tpop_popnrtpopnrmehrdeutig` },
      // TPop ohne verlangten TPop-Bericht im Berichtjahr
      { type: `query`, name: `qkTpopOhneTpopber`, berichtjahr },
      // TPop ohne verlangten TPop-Massn.-Bericht im Berichtjahr
      { type: `query`, name: `qkTpopOhneMassnber`, berichtjahr },
      // Teilpopulation mit Status "Ansaatversuch", bei denen in einer Kontrolle eine Anzahl festgestellt wurde:
      { type: `view`, name: `v_qk_tpop_mitstatusansaatversuchundzaehlungmitanzahl` },
      // Teilpopulation mit Status "potentieller Wuchs-/Ansiedlungsort",
      // bei der eine Massnahme des Typs "Ansiedlung" existiert:
      { type: `view`, name: `v_qk_tpop_mitstatuspotentiellundmassnansiedlung` },
      // Massn ohne Jahr/Typ
      { type: `view`, name: `v_qk_massn_ohnejahr` },
      { type: `view`, name: `v_qk_massn_ohnetyp`, berichtjahr },
      // Massn.-Bericht ohne Jahr/Entwicklung
      { type: `view`, name: `v_qk_massnber_ohnejahr` },
      { type: `view`, name: `v_qk_massnber_ohneerfbeurt`, berichtjahr },
      // Kontrolle ohne Jahr/Zählung/Kontrolltyp
      { type: `view`, name: `v_qk_feldkontr_ohnejahr` },
      { type: `view`, name: `v_qk_freiwkontr_ohnejahr` },
      { type: `view`, name: `v_qk_feldkontr_ohnezaehlung`, berichtjahr },
      { type: `view`, name: `v_qk_freiwkontr_ohnezaehlung`, berichtjahr },
      { type: `view`, name: `v_qk_feldkontr_ohnetyp`, berichtjahr },
      // Zählung ohne Einheit/Methode/Anzahl
      { type: `view`, name: `v_qk_feldkontrzaehlung_ohneeinheit`, berichtjahr },
      { type: `view`, name: `v_qk_freiwkontrzaehlung_ohneeinheit`, berichtjahr },
      { type: `view`, name: `v_qk_feldkontrzaehlung_ohnemethode`, berichtjahr },
      { type: `view`, name: `v_qk_freiwkontrzaehlung_ohnemethode`, berichtjahr },
      { type: `view`, name: `v_qk_feldkontrzaehlung_ohneanzahl`, berichtjahr },
      { type: `view`, name: `v_qk_freiwkontrzaehlung_ohneanzahl`, berichtjahr },
      // TPop-Bericht ohne Jahr/Entwicklung
      { type: `view`, name: `v_qk_tpopber_ohnejahr` },
      { type: `view`, name: `v_qk_tpopber_ohneentwicklung`, berichtjahr },
      // Pop-Bericht/Pop-Massn.-Bericht ohne Jahr/Entwicklung
      { type: `view`, name: `v_qk_popber_ohnejahr` },
      { type: `view`, name: `v_qk_popber_ohneentwicklung`, berichtjahr },
      { type: `view`, name: `v_qk_popmassnber_ohnejahr` },
      { type: `view`, name: `v_qk_popmassnber_ohneentwicklung`, berichtjahr },
      // Ziel ohne Jahr/Zieltyp/Ziel
      { type: `view`, name: `v_qk_ziel_ohnejahr` },
      { type: `view`, name: `v_qk_ziel_ohnetyp` },
      { type: `view`, name: `v_qk_ziel_ohneziel` },
      // Ziel-Bericht ohne Jahr/Entwicklung
      { type: `view`, name: `v_qk_zielber_ohnejahr` },
      { type: `view`, name: `v_qk_zielber_ohneentwicklung`, berichtjahr },
      // AP-Erfolgskriterium ohne Beurteilung/Kriterien
      { type: `view`, name: `v_qk_erfkrit_ohnebeurteilung` },
      { type: `view`, name: `v_qk_erfkrit_ohnekriterien` },
      // AP-Bericht ohne Jahr/Vergleich Vorjahr-Gesamtziel/Beurteilung
      { type: `view`, name: `v_qk_apber_ohnejahr` },
      { type: `view`, name: `v_qk_apber_ohnevergleichvorjahrgesamtziel`, berichtjahr },
      { type: `view`, name: `v_qk_apber_ohnebeurteilung`, berichtjahr },
      // assoziierte Art ohne Art
      { type: `view`, name: `v_qk_assozart_ohneart` },
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
        console.log(`messages:`, messages)
        // TODO: map result
      })
      .catch(error => console.log(error))
    // TODO: kontrolliereRelevanzAusserkantonalerTpop()
  }

  render() {
    const { berichtjahr, messages } = this.state
    console.log(`render: messages:`, messages)
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
          {messages.map(m => (
            <Card>
              <CardText>{m.hw}</CardText>
              <CardText>{m.link}</CardText>
            </Card>
          ))}
        </div>
      </div>
    )
  }
}

export default Qk
