import expect from 'expect'
import artenReducer from '../reducer'
import { fromJS } from 'immutable'

describe('artenReducer', () => {
  it('returns the initial state', () => {
    expect(artenReducer(undefined, {})).toEqual(fromJS({}))
  })
})
