import expect from 'expect'
import programmeReducer from '../reducer'
import { fromJS } from 'immutable'

describe('programmeReducer', () => {
  it('returns the initial state', () => {
    expect(programmeReducer(undefined, {})).toEqual(fromJS({}))
  })
})
