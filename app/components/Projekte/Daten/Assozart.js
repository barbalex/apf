import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter'
import styled from 'styled-components'

import TextField from '../../shared/TextField'
import AutoComplete from '../../shared/Autocomplete'
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

@inject(`store`)
@observer
class Assozart extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  get artList() {
    const { store } = this.props
    const { adb_eigenschaften } = store.table
    const { activeDataset } = store
    const sisfNrOfAp = Array.from(store.table.assozart.values()).filter(a =>
      a.AaApArtId === activeDataset.row.AaApArtId
    )
    const artList = filter(Array.from(adb_eigenschaften.values()), r =>
      !sisfNrOfAp.includes(r.TaxonomieId) || r.TaxonomieId === activeDataset.row.AaSisfNr
    )
    return sortBy(artList, `Artname`)
  }

  render() {
    const { store } = this.props
    const { adb_eigenschaften } = store.table
    const { activeDataset } = store
    const artname = () => {
      let name
      if (activeDataset.row.AaSisfNr && adb_eigenschaften.size > 0) {
        name = adb_eigenschaften.get(activeDataset.row.AaSisfNr).Artname
      }
      return name || ``
    }

    return (
      <Container>
        <FormTitle title="assoziierte Art" />
        <FieldsContainer>
          <AutoComplete
            label="Art"
            fieldName="AaSisfNr"
            value={activeDataset.row.AaSisfNr}
            valueText={artname()}
            errorText={activeDataset.valid.ApArtId}
            dataSource={this.artList}
            dataSourceConfig={{
              value: `TaxonomieId`,
              text: `Artname`,
            }}
            updatePropertyInDb={store.updatePropertyInDb}
          />
          <TextField
            label="Bemerkungen zur Assoziation"
            fieldName="AaBem"
            value={activeDataset.row.AaBem}
            errorText={activeDataset.valid.AaBem}
            type="text"
            multiLine
            fullWidth
            updateProperty={store.updateProperty}
            updatePropertyInDb={store.updatePropertyInDb}
          />
        </FieldsContainer>
      </Container>
    )
  }
}

export default Assozart
