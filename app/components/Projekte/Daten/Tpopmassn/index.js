import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import AutoComplete from 'material-ui/AutoComplete'
import styled from 'styled-components'

import RadioButtonGroup from '../../../shared/RadioButtonGroup'
import Label from '../../../shared/Label'
import TextField from '../../../shared/TextField'
import SelectField from '../../../shared/SelectField'
import RadioButton from '../../../shared/RadioButton'
import StringToCopy from '../../../shared/StringToCopy'
import FormTitle from '../../../shared/FormTitle'
import YearDatePair from '../../../shared/YearDatePair'

@inject(`store`)
@observer
class Tpopmassn extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    let tpopMassnTypWerte = Array.from(store.table.tpopmassn_typ_werte.values())
    tpopMassnTypWerte = sortBy(tpopMassnTypWerte, `MassnTypOrd`)
    tpopMassnTypWerte = tpopMassnTypWerte.map(el => ({
      value: el.MassnTypCode,
      label: el.MassnTypTxt,
    }))
    const adressen = Array.from(store.table.adresse.values())
    adressen.unshift({
      id: null,
      AdrName: ``,
    })
    const artnamen = Array.from(store.table.adb_eigenschaften.values()).map(a => a.Artname).sort()
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

    return (
      <Container>
        <FormTitle title="Massnahme" />
        <FieldsContainer>
          <YearDatePair
            yearLabel="Jahr"
            yearFieldName="TPopMassnJahr"
            yearValue={activeDataset.row.TPopMassnJahr}
            yearErrorText={activeDataset.valid.TPopMassnJahr}
            dateLabel="Datum"
            dateFieldName="TPopMassnDatum"
            dateValue={activeDataset.row.TPopMassnDatum}
            dateErrorText={activeDataset.valid.TPopMassnDatum}
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Typ" />
          <RadioButtonGroup
            fieldName="TPopMassnTyp"
            value={activeDataset.row.TPopMassnTyp}
            errorText={activeDataset.valid.TPopMassnTyp}
            dataSource={tpopMassnTypWerte}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Massnahme"
            fieldName="TPopMassnTxt"
            value={activeDataset.row.TPopMassnTxt}
            errorText={activeDataset.valid.TPopMassnTxt}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <SelectField
            label="BearbeiterIn"
            fieldName="TPopMassnBearb"
            value={activeDataset.row.TPopMassnBearb}
            errorText={activeDataset.valid.TPopMassnBearb}
            dataSource={adressen}
            valueProp="AdrId"
            labelProp="AdrName"
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Bemerkungen"
            fieldName="TPopMassnBemTxt"
            value={activeDataset.row.TPopMassnBemTxt}
            errorText={activeDataset.valid.TPopMassnBemTxt}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="Plan vorhanden" />
          <RadioButton
            fieldName="TPopMassnPlan"
            value={activeDataset.row.TPopMassnPlan}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Plan Bezeichnung"
            fieldName="TPopMassnPlanBez"
            value={activeDataset.row.TPopMassnPlanBez}
            errorText={activeDataset.valid.TPopMassnPlanBez}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Fläche (m2)"
            fieldName="TPopMassnFlaeche"
            value={activeDataset.row.TPopMassnFlaeche}
            errorText={activeDataset.valid.TPopMassnFlaeche}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Form der Ansiedlung"
            fieldName="TPopMassnAnsiedForm"
            value={activeDataset.row.TPopMassnAnsiedForm}
            errorText={activeDataset.valid.TPopMassnAnsiedForm}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Pflanzanordnung"
            fieldName="TPopMassnAnsiedPflanzanordnung"
            value={activeDataset.row.TPopMassnAnsiedPflanzanordnung}
            errorText={activeDataset.valid.TPopMassnAnsiedPflanzanordnung}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Markierung"
            fieldName="TPopMassnMarkierung"
            value={activeDataset.row.TPopMassnMarkierung}
            errorText={activeDataset.valid.TPopMassnMarkierung}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Anzahl Triebe"
            fieldName="TPopMassnAnsiedAnzTriebe"
            value={activeDataset.row.TPopMassnAnsiedAnzTriebe}
            errorText={activeDataset.valid.TPopMassnAnsiedAnzTriebe}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Anzahl Pflanzen"
            fieldName="TPopMassnAnsiedAnzPfl"
            value={activeDataset.row.TPopMassnAnsiedAnzPfl}
            errorText={activeDataset.valid.TPopMassnAnsiedAnzPfl}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Anzahl Pflanzstellen"
            fieldName="TPopMassnAnzPflanzstellen"
            value={activeDataset.row.TPopMassnAnzPflanzstellen}
            errorText={activeDataset.valid.TPopMassnAnzPflanzstellen}
            type="number"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <AutoComplete
            floatingLabelText="Wirtspflanze"
            fullWidth
            openOnFocus
            value={activeDataset.row.TPopMassnAnsiedWirtspfl || ``}
            searchText={activeDataset.row.TPopMassnAnsiedWirtspfl || ``}
            errorText={activeDataset.valid.TPopMassnAnsiedWirtspfl}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={artnamen}
            maxSearchResults={20}
            onUpdateInput={(val) => {
              this.setState({ searchText: val })
            }}
            onNewRequest={val =>
              store.updatePropertyInDb(`TPopMassnAnsiedWirtspfl`, val)
            }
            onBlur={e =>
              store.updatePropertyInDb(`TPopMassnAnsiedWirtspfl`, e.target.value)
            }
          />
          <TextField
            label="Herkunftspopulation"
            fieldName="TPopMassnAnsiedHerkunftPop"
            value={activeDataset.row.TPopMassnAnsiedHerkunftPop}
            errorText={activeDataset.valid.TPopMassnAnsiedHerkunftPop}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Sammeldatum"
            fieldName="TPopMassnAnsiedDatSamm"
            value={activeDataset.row.TPopMassnAnsiedDatSamm}
            errorText={activeDataset.valid.TPopMassnAnsiedDatSamm}
            type="text"
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <Label label="GUID" />
          <StringToCopy text={activeDataset.row.TPopMassnGuid} />
        </FieldsContainer>
      </Container>
    )
  }
}

export default Tpopmassn
