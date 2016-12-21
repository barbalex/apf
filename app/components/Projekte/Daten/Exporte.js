import React from 'react'
import styled from 'styled-components'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'

import FormTitle from '../../shared/FormTitle'

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

export default class Exporte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <FormTitle title="Exporte" />
        <FieldsContainer>
          <Card>
            <CardHeader
              title="So geht's"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
              <p>Hier sind alle Auswertungen (bzw. Abfragen, Kontrollen, Listen).</p>
              <p>Die Daten werden direkt als mit Kommas getrennte .csv-Datei heruntergeladen.</p>
              <p>Diese Datei kann nach dem Download auf zwei Arten geöffnet werden:</p>
              <ol>
                <li>
                  {`Heruntergeladene Datei doppelklicken. Meist wählt das Betriebssystem ein geeignetes Programm, um die Datei damit zu öffnen und dieses Programm erkennt am Datenformat, dass der Importassistent geöffnet werden muss. In Excel funktioniert dies häufig nicht!`}
                </li>
                <li>
                  {`Gewünschtes Programm öffnen und damit die heruntergeladene Datei öffnen oder die Daten importieren`}
                </li>
              </ol>
              <Paper>
                <b>ACHTUNG: Microsoft Excel braucht Streicheleinheiten:</b>
                <ol>
                  <li>Excel öffnen</li>
                  <li>
                    {`"Daten" > "Externe Daten abrufen" > "Aus Text" wählen`}
                  </li>
                  <li>
                    {`Nun erscheit der Textkonvertierungs-Assistent. Im Schritt 1 als Dateiursprung statt dem vorgegebenen "Windows (ANSI)" dies hier wählen: "65001 : Unicode (UTF-8)". Excel versteht sonst partout keine Umlaute`}
                  </li>
                  <li>
                    {`Vorsicht: Excel ist fähig, die importierten Daten nach eigenem Ermessen willkürlich zu vermanschen. Daher bitte obige Tipps missachten und Excel nur für die Auswertung von Daten benutzten - nicht im .csv-Dateien zu öffnen.`}
                  </li>
                </ol>
              </Paper>
              <p>
                Um .csv-Dateien zu öffnen ist <a href="https://de.libreoffice.org/" target="_blank">Libre Office</a> sehr empfehlenswert: 1. Mit Libre Office öffnen, 2. als .xlsx-Datei speichern, 3. mit Excel öffnen und auswerten.
              </p>
              <p>
                Fragt das Programm, mit welchem Zeichen die einzelnen Felder getrennt werden? Es sind Kommas.
              </p>
              <p>
                {`Zeigt das Programm nach dem Öffnen ungeordnete Daten an? Dann muss die Datei nochmals geöffnet werden und dabei ist die Option zu suchen, mit der eine Trennung der Felder mittels Kommas erzwungen werden kann. Vielleicht muss wie in Excel statt dem Öffnen-Befehl ein Import-Befehl verwendet werden. Vorsicht: Es sollte nicht noch zusätzlich eine andere Option gewählt sein, z.B. Trennung durch Strichpunkte.`}
              </p>
              <Paper>
                <b>Enthält der Export zuviele Daten?</b><br />
                <p>
                  {`Meist werden alle verfügbaren Datensätze und Felder angezeigt. Daher können Listen sehr viele Zeilen und Spalten enthalten und unübersichtlich werden.`}
                </p>
                <ul>
                  <li>Filtere die Zeilen nach den gewünschten Kriterien</li>
                  <li>Blende unerwünschte Spalten aus (oder lösche sie)</li>
                </ul>
              </Paper>
              <p>
                {`Ist nach dem Herunterladen das Exportformular verschwunden und es muss wieder ein Programm gewählt werden? In Safari auf Mac scheint das leider die Standardeinstellung zu sein. Man kann dies korrigieren: "Safari" > "Tabs" > "Neue Tabs oder Fenster im Vordergrund öffnen" wählen. Falls das auf einem anderen Browser passiert: Einstellungen suchen, die das Öffnen von neuen Tabs beeinflussen und ausprobieren.`}
              </p>
            </CardText>
          </Card>
          <Card>
            <CardHeader
              title="Programm / Art"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
            </CardText>
          </Card>
          <Card>
            <CardHeader
              title="Populationen"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
            </CardText>
          </Card>
          <Card>
            <CardHeader
              title="Teilpopulationen"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
            </CardText>
          </Card>
          <Card>
            <CardHeader
              title="Kontrollen"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
            </CardText>
          </Card>
          <Card>
            <CardHeader
              title="Beobachtungen"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
            </CardText>
          </Card>
          <Card>
            <CardHeader
              title="Anwendung"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
            </CardText>
          </Card>
        </FieldsContainer>
      </Container>
    )
  }
}
