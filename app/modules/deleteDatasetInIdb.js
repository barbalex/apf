import app from 'ampersand-app'

export default (store, table, idPassed) => {
  let id = idPassed
  // DANGEROUS: if number is passed as string, delete will fail
  if (!isNaN(id) && typeof id === `string`) {
    id = parseInt(id, 10)
  }
  app.db[table].delete(id)
    .catch(error =>
      store.listError(error)
    )
}
