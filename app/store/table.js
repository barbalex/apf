/* eslint-disable camelcase, no-unused-vars */
import { observable, map } from 'mobx'
import localforage from 'localforage'

import tableNames from '../modules/tableStoreNames'

const initiateObservables = (tableClass) => {
  tableNames.forEach((tableName) => {
    tableClass[tableName] = observable.map()
    const trueOrFalse = tableName === `projekt`
    tableClass[`${tableName}Loading`] = observable(trueOrFalse)
  })
}

const Table = {}
initiateObservables(Table)

export default Table
