import expect from 'expect';
import benutzerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('benutzerReducer', () => {
  it('returns the initial state', () => {
    expect(benutzerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
