import {
  selectSearchContainer,
  selectTrackErrors,
  selectTrackResults,
  selectSearchTerm,
  selectSearchContainerDomain
} from '../selectors';
import { initialState } from '../reducer';

describe('SearchContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let trackResults;
  let trackErrors;

  beforeEach(() => {
    searchTerm = 'mac';
    trackResults = { totalCount: 1, items: [{ searchTerm }] };
    trackErrors = 'There was some error while fetching the track details';

    mockedState = {
      searchContainer: {
        searchTerm,
        trackErrors,
        trackResults
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
    const trackDataSelector = selectTrackResults();
    expect(trackDataSelector(mockedState)).toEqual(trackResults);
  });
  it('should select the trackError', () => {
    const trackErrorSelector = selectTrackErrors();
    expect(trackErrorSelector(mockedState)).toEqual(trackErrors);
  });
  it('should select the global state', () => {
    const selector = selectSearchContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
