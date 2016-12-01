import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import TextField from '../../../shared/TextField'
import DatePicker from '../../../shared/DatePicker'
import styles from './styles.css'

@inject(`store`)
@observer
class Idealbiotop extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props
    const { activeDataset } = store
    return (
      <div className={styles.container}>
        <DatePicker
          label="Erstelldatum"
          fieldName="IbErstelldatum"
          value={activeDataset.row.IbErstelldatum}
          errorText={activeDataset.valid.IbErstelldatum}
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.section}>Lage</div>
        <TextField
          label="Höhe"
          fieldName="IbHoehenlage"
          value={activeDataset.row.IbHoehenlage}
          errorText={activeDataset.valid.IbHoehenlage}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Region"
          fieldName="IbRegion"
          value={activeDataset.row.IbRegion}
          errorText={activeDataset.valid.IbRegion}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Exposition"
          fieldName="IbExposition"
          value={activeDataset.row.IbExposition}
          errorText={activeDataset.valid.IbExposition}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Besonnung"
          fieldName="IbBesonnung"
          value={activeDataset.row.IbBesonnung}
          errorText={activeDataset.valid.IbBesonnung}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Hangneigung"
          fieldName="IbHangneigung"
          value={activeDataset.row.IbHangneigung}
          errorText={activeDataset.valid.IbHangneigung}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.section}>Boden</div>
        <TextField
          label="Typ"
          fieldName="IbBodenTyp"
          value={activeDataset.row.IbBodenTyp}
          errorText={activeDataset.valid.IbBodenTyp}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Kalkgehalt"
          fieldName="IbBodenKalkgehalt"
          value={activeDataset.row.IbBodenKalkgehalt}
          errorText={activeDataset.valid.IbBodenKalkgehalt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Durchlässigkeit"
          fieldName="IbBodenDurchlaessigkeit"
          value={activeDataset.row.IbBodenDurchlaessigkeit}
          errorText={activeDataset.valid.IbBodenDurchlaessigkeit}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Humus"
          fieldName="IbBodenHumus"
          value={activeDataset.row.IbBodenHumus}
          errorText={activeDataset.valid.IbBodenHumus}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Nährstoffgehalt"
          fieldName="IbBodenNaehrstoffgehalt"
          value={activeDataset.row.IbBodenNaehrstoffgehalt}
          errorText={activeDataset.valid.IbBodenNaehrstoffgehalt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Wasserhaushalt"
          fieldName="IbWasserhaushalt"
          value={activeDataset.row.IbWasserhaushalt}
          errorText={activeDataset.valid.IbWasserhaushalt}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <div className={styles.section}>Vegetation</div>
        <TextField
          label="Konkurrenz"
          fieldName="IbKonkurrenz"
          value={activeDataset.row.IbKonkurrenz}
          errorText={activeDataset.valid.IbKonkurrenz}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Moosschicht"
          fieldName="IbMoosschicht"
          value={activeDataset.row.IbMoosschicht}
          errorText={activeDataset.valid.IbMoosschicht}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Krautschicht"
          fieldName="IbKrautschicht"
          value={activeDataset.row.IbKrautschicht}
          errorText={activeDataset.valid.IbKrautschicht}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Strauchschicht"
          fieldName="IbStrauchschicht"
          value={activeDataset.row.IbStrauchschicht}
          errorText={activeDataset.valid.IbStrauchschicht}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Baumschicht"
          fieldName="IbBaumschicht"
          value={activeDataset.row.IbBaumschicht}
          errorText={activeDataset.valid.IbBaumschicht}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
        <TextField
          label="Bemerkungen"
          fieldName="IbBemerkungen"
          value={activeDataset.row.IbBemerkungen}
          errorText={activeDataset.valid.IbBemerkungen}
          type="text"
          multiLine
          fullWidth
          updateProperty={store.updateProperty}
          updatePropertyInDb={store.updatePropertyInDb}
        />
      </div>
    )
  }
}

export default Idealbiotop
