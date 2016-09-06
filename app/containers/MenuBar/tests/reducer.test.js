import expect from 'expect';
import menuBarReducer from '../reducer';
import { fromJS } from 'immutable';

describe('menuBarReducer', () => {
  it('returns the initial state', () => {
    expect(menuBarReducer(undefined, {})).toEqual(fromJS({}));
  });
});
