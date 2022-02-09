import { takeLatest, call, put, select } from 'redux-saga/effects';
import searchContainerSaga, { getTrackById, getTrackList } from '../../saga';
import { searchContainerTypes } from '../../reducer';
import { apiResponseGenerator } from '@app/utils/testUtils';
import { getList } from '@services/trackApi';
import { selectTrackResults } from '../../selectors';

describe('SearchContainer saga tests', () => {
  const generator = searchContainerSaga();
  const searchName = 'Charlie';
  let getTrackInfoGenerator = getTrackList({ searchTerm: searchName });

  it('should start task to watch for REQUEST_GET_TRACKS action', () => {
    expect(generator.next().value).toEqual(takeLatest(searchContainerTypes.REQUEST_GET_TRACKS, getTrackList));
  });

  it('should ensure that the action FAILURE_GET_TRACK_INFO is dispatched when the api call fails', () => {
    const res = getTrackInfoGenerator.next().value;
    expect(res).toEqual(call(getList, searchName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching track informations.'
    };
    expect(getTrackInfoGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: searchContainerTypes.FAILURE_GET_TRACK_INFO,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_INFO is dispatched when the api call succeeds', () => {
    getTrackInfoGenerator = getTrackList({ searchTerm: searchName });
    const res = getTrackInfoGenerator.next().value;
    expect(res).toEqual(call(getList, searchName));
    const trackResponse = {
      totalCount: 1,
      items: [{ trackName: searchName }]
    };
    expect(getTrackInfoGenerator.next(apiResponseGenerator(true, trackResponse)).value).toEqual(
      put({
        type: searchContainerTypes.SUCCESS_GET_TRACK_INFO,
        data: trackResponse
      })
    );
  });
  it('should check if the trackId is present in the store before calling getList ', () => {
    const trackId = 411014;
    let getTrackByIdGenerator = getTrackById({ searchId: trackId });
    const trackResults = {
      resultCount: 1,
      results: [{ trackName: 'See you again', trackId }]
    };
    expect(getTrackByIdGenerator.next(trackResults).value.type).toEqual(select(selectTrackResults(trackResults)).type);
    expect(getTrackByIdGenerator.next(trackResults).value).toEqual(
      put({
        type: searchContainerTypes.SUCCESS_GET_TRACK_BY_ID,
        item: trackResults.results[0]
      })
    );
  });
});

it('should call the api and add data if the trackId is not present', () => {
  const trackId = 411014;
  const trackSearch = {
    resultCount: 1,
    results: [{ trackName: 'See you tomorrow', trackId: 410013 }]
  };
  let getTrackByIdGenerator = getTrackById({ searchId: trackId });
  const trackResults = {
    resultCount: 1,
    results: [{ trackName: 'See you again', trackId: 410011 }]
  };
  const addedResults = {
    resultCount: 2,
    results: [
      { trackName: 'See you again', trackId: 410011 },
      { trackName: 'See you tomorrow', trackId: 410013 }
    ]
  };
  expect(getTrackByIdGenerator.next(trackResults).value.type).toEqual(select(selectTrackResults(trackResults)).type);
  expect(getTrackByIdGenerator.next(trackResults).value).toEqual(call(getList, trackId));
  expect(getTrackByIdGenerator.next(apiResponseGenerator(true, trackSearch)).value).toEqual(
    put({ type: searchContainerTypes.SUCCESS_GET_TRACK_INFO, data: addedResults })
  );
  expect(getTrackByIdGenerator.next(trackResults).value).toEqual(
    put({
      type: searchContainerTypes.SUCCESS_GET_TRACK_BY_ID,
      item: trackSearch.results[0]
    })
  );
});

it('should call the failureGetRepos action if the response from the API fails', () => {
  const trackId = 411014;
  const trackError = {
    error: 'There was an error'
  };
  let getTrackByIdGenerator = getTrackById({ searchId: trackId });
  getTrackByIdGenerator.next(trackError).value;
  expect(getTrackByIdGenerator.next(trackError).value).toEqual(call(getList, trackId));
  expect(getTrackByIdGenerator.next(apiResponseGenerator(false, trackError)).value).toEqual(
    put({
      type: searchContainerTypes.FAILURE_GET_TRACK_INFO,
      error: trackError
    })
  );
});

it('should start task to watch for REQUEST_GET_TRACK_BY_ID action', () => {
  const generator = searchContainerSaga();
  generator.next().value;
  expect(generator.next().value).toEqual(takeLatest(searchContainerTypes.REQUEST_GET_TRACK_BY_ID, getTrackById));
});
