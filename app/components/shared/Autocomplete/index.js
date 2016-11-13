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
    updateProperty: PropTypes.func.isRequired,
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
      updateProperty,
    } = this.props
    let searchText = ``
    if (value && dataSource.length > 0) {
      searchText = dataSource.find(e => e.id === value).label
    }
    return (
      <AutoComplete
        hintText={dataSource.length === 0 ? `lade Daten...` : ``}
        fullWidth
        floatingLabelText={label}
        openOnFocus
        dataSource={dataSource}
        dataSourceConfig={dataSourceConfig}
        searchText={searchText}
        filter={AutoComplete.caseInsensitiveFilter}
        maxSearchResults={20}
        onNewRequest={(val) => {
          updateProperty(fieldName, val.id)
        }}
      />
    )
  }
}

export default MyAutocomplete
