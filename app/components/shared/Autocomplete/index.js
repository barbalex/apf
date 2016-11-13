import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import AutoComplete from 'material-ui/AutoComplete'

@observer
class MyAutocomplete extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    label: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.number,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSourceConfig: PropTypes.shape({
      value: PropTypes.number,
      text: PropTypes.string,
    }),
    updatePropertyInDb: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      artText: ``,
    }
  }

  render() {
    const {
      label,
      fieldName,
      value,
      dataSource,
      dataSourceConfig = {
        value: `id`,
        text: `label`,
      },
      updatePropertyInDb,
    } = this.props
    const { artText } = this.state
    let searchText = ``
    if (value && dataSource.length > 0) {
      searchText = dataSource.find(e => e.id === value).label
    }
    const errorText = (
      artText !== `` && artText !== dataSource.find(e => e.id === value).label ?
      `Keine Art gewählt` :
      ``
    )

    return (
      <AutoComplete
        hintText={dataSource.length === 0 ? `lade Daten...` : ``}
        fullWidth
        floatingLabelText={label}
        openOnFocus
        dataSource={dataSource}
        dataSourceConfig={dataSourceConfig}
        searchText={searchText}
        errorText={errorText}
        filter={AutoComplete.caseInsensitiveFilter}
        maxSearchResults={20}
        onUpdateInput={(val) => {
          this.setState({ artText: val })
        }}
        onNewRequest={val =>
          updatePropertyInDb(fieldName, val.id)
        }
      />
    )
  }
}

export default MyAutocomplete
