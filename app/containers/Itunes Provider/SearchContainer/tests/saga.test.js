/**
 * Test searchContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import searchContainerSaga, { getTrackList } from '../../saga';
import { searchContainerTypes } from '../../reducer';
import { apiResponseGenerator } from '@app/utils/testUtils';
import { getList } from '@services/trackApi';

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
});
