/**
 * Test searchContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import searchContainerSaga, { getTrackInfo } from '../saga';
import { searchContainerTypes } from '../reducer';
import { apiResponseGenerator } from '@app/utils/testUtils';
import { getInfo } from '@services/repoApi';

describe('SearchContainer saga tests', () => {
  const generator = searchContainerSaga();
  const searchName = 'mac';
  let getTrackInfoGenerator = getTrackInfo({ searchTerm: searchName });

  it('should start task to watch for REQUEST_TRACK_INFO action', () => {
    expect(generator.next().value).toEqual(takeLatest(searchContainerTypes.REQUEST_TRACK_INFO, getTrackInfo));
  });

  it('should ensure that the action FAILURE_GET_TRACK_INFO is dispatched when the api call fails', () => {
    const res = getTrackInfoGenerator.next().value;
    expect(res).toEqual(call(getInfo, searchName));
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
    getTrackInfoGenerator = getTrackInfo({ searchTerm: searchName });
    const res = getTrackInfoGenerator.next().value;
    expect(res).toEqual(call(getInfo, searchName));
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
