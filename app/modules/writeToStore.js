import { transaction } from 'mobx'

export default ({ store, data, table, field }) => {
  transaction(() => {
    data.forEach(d =>
      store.table[table].set(d[field], d)
    )
  })
}
