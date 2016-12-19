import projektNodes from './projekt'

export default store => [{ children: projektNodes(store) }]
