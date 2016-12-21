import React from 'react'
import styled from 'styled-components'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import FormTitle from '../../shared/FormTitle'

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
const SecondLevelCard = styled(Card)`
  margin-bottom: 5px;
`
const StyledCardHeader = styled(CardHeader)`

`

export default class Exporte extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <FormTitle title="Exporte" />
        <FieldsContainer>
          <FirstLevelCard>
            <CardHeader
              title="Tipps und Tricks"
              actAsExpander
              showExpandableButton
            />
            <CardText
              expandable
            >
              Exporte werden als .csv-Datei heruntergeladen.
              <SecondLevelCard>
                <CardHeader
                  title="Was ist eine .csv-Datei?"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  {`Eine reine Textdatei, deren Name mit ".csv" endet.`}<br />{`Sie hat folgende Eigenschaften:`}
                  <ol>
                    <li>
                      {`Datenbank-Felder werden mit Kommas getrennt`}
                    </li>
                    <li>
                      {`Text in Feldern wird in Hochzeichen (") eingefasst`}
                    </li>
                    <li>
                      {`Die erste Zeile enthält die Feldnamen`}
                    </li>
                    <li>
                      {`Der Zeichenstatz ist Unicode UTF-8`}
                    </li>
                  </ol>
                </CardText>
              </SecondLevelCard>
              <SecondLevelCard>
                <CardHeader
                  title="Wie öffne ich diese Datei?"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  Es gibt zwei Möglichkeiten:
                  <ol>
                    <li>
                      {`Heruntergeladene Datei doppelklicken.`}<br />{`Meist wählt das Betriebssystem ein geeignetes Programm.`}<br />{`Dieses Programm erkennt hoffentlich, dass der Importassistent geöffnet werden muss.`}<br />{`In Excel funktioniert dies häufig nicht!`}
                    </li>
                    <li>
                      {`Gewünschtes Programm öffnen und damit die Datei öffnen oder die Daten importieren`}
                    </li>
                  </ol>
                </CardText>
              </SecondLevelCard>
              <SecondLevelCard>
                <CardHeader
                  title="Welches Programm soll ich verwenden?"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  <p>
                    {`Um die Datei das erste Mal zu öffnen eignet sich Libre Office am besten: `}<a href="https://de.libreoffice.org/" target="_blank">https://de.libreoffice.org</a>
                  </p>
                  <p>
                    {`Microsoft Excel eignet sich sehr gut, um die Daten auswerten.`}<br />
                    {`Speichern Sie die Datei daher in Libre Office als .xlsx-Datei ab und öffnen Sie sie danach mit Excel.`}
                  </p>
                  <SecondLevelCard>
                    <CardHeader
                      title="Sie wollen die .csv-Datei direkt in Excel öffnen? Das wird nicht empfohlen, aber hier erfahren Sie, wie es funktionieren kann:"
                      actAsExpander
                      showExpandableButton
                    />
                    <CardText expandable>
                      <ol>
                        <li>Excel öffnen</li>
                        <li>
                          {`"Daten" > "Externe Daten abrufen" > "Aus Text" wählen`}
                        </li>
                        <li>
                          {`Nun erscheit der Textkonvertierungs-Assistent. Im Schritt 1 als Dateiursprung statt dem vorgegebenen "Windows (ANSI)" dies hier wählen: "65001 : Unicode (UTF-8)". Excel versteht sonst partout keine Umlaute`}
                        </li>
                        <li>
                          {`Vorsicht: Excel ist fähig, die importierten Daten nach eigenem Ermessen willkürlich zu vermanschen. Daher bitte obige Tipps missachten und Excel nur für die Auswertung von Daten benutzten - nicht um .csv-Dateien zu öffnen.`}
                        </li>
                      </ol>
                    </CardText>
                  </SecondLevelCard>
                </CardText>
              </SecondLevelCard>
              <SecondLevelCard>
                <CardHeader
                  title="Hilfe, ich sehe nur ungeordnete Daten!"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  {`Das Programm hat wohl beim Öffnen die Feld-Grenzen nicht richtig erkannt.`}
                  <ul>
                    <li>{`Öffnen Sie die Datei nochmals`}</li>
                    <li>
                      {`Suchen Sie dabei die Option, mit der eine Trennung der Felder mittels Kommas erzwungen werden kann`}
                    </li>
                    <li>
                      {`Vielleicht muss wie in Excel statt dem Öffnen-Befehl ein Import-Befehl verwendet werden`}
                    </li>
                    <li>
                      {`Vorsicht: Es sollte nicht noch zusätzlich eine andere Option gewählt sein, z.B. Trennung durch Kommas UND Strichpunkte`}
                    </li>
                  </ul>
                </CardText>
              </SecondLevelCard>
              <SecondLevelCard>
                <CardHeader
                  title="Hilfe, das sind viel zu viele Daten!"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  {`Meist werden alle verfügbaren Datensätze und Felder exportiert. Daher können Listen sehr viele Zeilen und Spalten enthalten und unübersichtlich werden.`}
                  <ul>
                    <li>Filtern Sie die Zeilen nach gewünschten Kriterien</li>
                    <li>Blenden Sie unerwünschte Spalten aus oder löschen Sie sie</li>
                  </ul>
                </CardText>
              </SecondLevelCard>
              <SecondLevelCard>
                <CardHeader
                  title="Hilfe, nach dem Herunterladen ist das Exportformular verschwunden und es muss wieder eine Art gewählt werden!"
                  actAsExpander
                  showExpandableButton
                />
                <CardText expandable>
                  {`In Safari auf Mac scheint das leider die Standardeinstellung zu sein. Man kann dies korrigieren: "Safari" > "Tabs" > "Neue Tabs oder Fenster im Vordergrund öffnen" wählen.`}<br />
                  {`Falls das auf einem anderen Browser passiert: Einstellungen suchen, die das Öffnen von neuen Tabs beeinflussen und ausprobieren.`}
                </CardText>
              </SecondLevelCard>
            </CardText>
          </FirstLevelCard>
          <FirstLevelCard>
            <CardHeader
              title="Programm / Art"
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
              title="Populationen"
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
