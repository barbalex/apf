import expect from 'expect';
import exporteReducer from '../reducer';
import { fromJS } from 'immutable';

describe('exporteReducer', () => {
  it('returns the initial state', () => {
    expect(exporteReducer(undefined, {})).toEqual(fromJS({}));
  });
});
