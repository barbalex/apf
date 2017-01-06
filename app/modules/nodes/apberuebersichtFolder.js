import apberuebersichtNodes from './apberuebersicht'

export default (store, projId) => {
  const { activeUrlElements } = store
  const myApberuebersichtnodes = apberuebersichtNodes(store, projId)

  return {
    menuType: `apberuebersichtFolder`,
    id: projId,
    label: `AP-Berichte (${myApberuebersichtnodes.length})`,
    expanded: activeUrlElements.apberuebersichtFolder,
    url: [`Projekte`, projId, `AP-Berichte`],
    children: myApberuebersichtnodes,
  }
}
