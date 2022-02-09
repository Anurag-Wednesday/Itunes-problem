import { searchContainerReducer, searchContainerTypes, initialState } from '../../reducer';

describe('SearchContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state when an action of type REQUEST_GET_TRACKS is dispatched', () => {
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
    const expectedResult = { ...state, trackResults: data };
    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.SUCCESS_GET_TRACK_INFO,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the trackError has some data when failure_get_track_info is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, trackErrors: error };
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
  it('should disptach the REQUEST_GET_TRSCK_BY_ID with the searchId ', () => {
    const searchId = 1477536825;
    const expectedResult = { ...state, searchId };
    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.REQUEST_GET_TRACK_BY_ID,
        searchId
      })
    ).toEqual(expectedResult);
  });
  it('should ensure that the searchedTrack is present when SUCCESS_GET_TRACK_BY_ID is dispatched', () => {
    const item = { results: ['Charlie Puth'], resultCount: 1 };
    const expectedResult = { ...state, searchedTrack: item };
    expect(
      searchContainerReducer(state, {
        type: searchContainerTypes.SUCCESS_GET_TRACK_BY_ID,
        item
      })
    ).toEqual(expectedResult);
  });
});
