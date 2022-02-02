import {
  selectSearchContainer,
  selectTrackError,
  selectTrackData,
  selectSearchTerm,
  selectSearchContainerDomain
} from '../selectors';
import { initialState } from '../reducer';

describe('SearchContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let trackData;
  let trackError;

  beforeEach(() => {
    searchTerm = 'mac';
    trackData = { totalCount: 1, items: [{ searchTerm }] };
    trackError = 'There was some error while fetching the track details';

    mockedState = {
      searchContainer: {
        searchTerm,
        trackError,
        trackData
      }
    };
  });

  it('should select the searchContainer state', () => {
    const searchContainerSelector = selectSearchContainer();
    expect(searchContainerSelector(mockedState)).toEqual(mockedState.searchContainer);
  });
  it('should select the searchTerm', () => {
    const searchSelector = selectSearchTerm();
    expect(searchSelector(mockedState)).toEqual(searchTerm);
  });
  it('should select trackData', () => {
    const trackDataSelector = selectTrackData();
    expect(trackDataSelector(mockedState)).toEqual(trackData);
  });
  it('should select the trackError', () => {
    const trackErrorSelector = selectTrackError();
    expect(trackErrorSelector(mockedState)).toEqual(trackError);
  });
  it('should select the global state', () => {
    const selector = selectSearchContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
