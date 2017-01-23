import { observable } from 'mobx'

import tableNames from '../modules/tableStoreNames'

const initiateObservables = (tableClass) => {
  tableNames.forEach((tableName) => {
    tableClass[tableName] = observable.map()
    const trueOrFalse = tableName === `projekt`
    // believe this is not used
    // TODO: use or remove
    tableClass[`${tableName}Loading`] = observable(trueOrFalse)
  })
}

const Table = {}
initiateObservables(Table)

export default Table
