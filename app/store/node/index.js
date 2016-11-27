import { observable, computed } from 'mobx'
import sortBy from 'lodash/sortBy'
import getActiveElementsFromUrl from '../../modules/getActiveElementsFromUrl'

const activeElements = getActiveElementsFromUrl()

class Node {
  constructor(store, pathArray) {
    this.store = store
    this.pathArray = pathArray
  }

  @computed get projektNodes() {
    // grab projekte as array and sort them by name
    const projekte = sortBy(this.store.table.projekt.values(), `ProjName`)
    // map through all projekt and create array of nodes
    return projekte.map(el => ({
      type: `row`,
      label: `Projekte`,
      table: `projekt`,
      row: el,
      expanded: el.projId === activeElements.projekt,
      // TODO: add url for every node
      children: [
        {
          type: `folder`,
          label: `Arten (${this.apNodes.length})`,
          folder: `ap`,
          table: `projekt`,
          row: el,
          expanded: activeElements.apFolder,
          children: this.apNodes,
        },
        {
          type: `folder`,
          label: `AP-Berichte ${this.apberuebersichtNodes.length}`,
          folder: `apberuebersicht`,
          table: `projekt`,
          row: el,
          id: el.ProjId,
          expanded: activeElements.apberuebersichtFolder,
          children: this.apberuebersichtNodes,
        },
      ],
    }))
  }

  @observable loadingAllNodes = false
  @observable activeNode = null
  @observable nodeLabelFilter = {}
  @observable nrOfRowsAboveActiveNode = 0
}

export default (store, pathArray) => new Node(store, pathArray)
