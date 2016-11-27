import { observable, computed } from 'mobx'
import sortBy from 'lodash/sortBy'

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
      expanded() {
        const projElement = this.pathArray.find(pEl => pEl.table === `projekt`)
        if (projElement) {
          return projElement.id === el.projId
        }
        return false
      },
      children: [
        {
          type: `folder`,
          label: `Arten (${this.apNodes.length})`,
          folder: `ap`,
          table: `projekt`,
          row: el,
          expanded() {
            const projElement = this.pathArray.find(pEl => pEl.childrenTable === `ap`)
            if (projElement) {
              return projElement.parentId === el.projId
            }
            return false
          },
          children: this.apNodes,
        },
        // apberuebersicht folder
        {
          type: `folder`,
          label: `AP-Berichte ${this.apberuebersichtNodes.length}`,
          folder: `apberuebersicht`,
          table: `projekt`,
          row: el,
          id: el.ProjId,
          expanded: false,
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
