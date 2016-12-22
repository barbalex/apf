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
