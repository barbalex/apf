import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import AutoComplete from 'material-ui/AutoComplete'

@observer
class MyAutocomplete extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    label: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    valueText: PropTypes.string,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSourceConfig: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      text: PropTypes.string,
    }),
    updatePropertyInDb: PropTypes.func.isRequired,
  }

  render() {
    const {
      label,
      fieldName,
      valueText,
      dataSource,
      dataSourceConfig = {
        value: `id`,
        text: `label`,
      },
      updatePropertyInDb,
    } = this.props

    return (
      <AutoComplete
        hintText={dataSource.length === 0 ? `lade Daten...` : ``}
        fullWidth
        floatingLabelText={label}
        openOnFocus
        dataSource={dataSource}
        dataSourceConfig={dataSourceConfig}
        searchText={valueText}
        filter={AutoComplete.caseInsensitiveFilter}
        maxSearchResults={20}
        onUpdateInput={(val) => {
          this.setState({ searchText: val })
        }}
        onNewRequest={val =>
          updatePropertyInDb(fieldName, val[dataSourceConfig.value])
        }
      />
    )
  }
}

export default MyAutocomplete
