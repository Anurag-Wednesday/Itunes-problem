import { searchContainerReducer, searchContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('SearchContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const searchTerm = 'Charlie';
    const expectedResult = { ...state, searchTerm };
    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.REQUEST_GET_TRACKS,
        searchTerm
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the track data is present when REQUEST_GET_TRACKS is dispatched', () => {
    const data = { name: 'Charlie Puth' };
    const expectedResult = { ...state, trackData: data };
    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.SUCCESS_GET_TRACK_INFO,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, trackError: error };
    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.FAILURE_GET_TRACK_INFO,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_TRACK_INFO is dispatched', () => {
    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.CLEAR_TRACK_INFO
      })
    ).toEqual(initialState);
  });
});
