import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getList } from '@app/services/trackApi';
import { searchContainerTypes, searchContainerCreators } from './reducer';
import { selectTrackResults } from './selectors';
import { get, isEmpty } from 'lodash';
import { convertArrayToObject } from '@app/utils/dataUtils';

// Individual exports for testing

const { REQUEST_GET_TRACKS, REQUEST_GET_TRACK_BY_ID } = searchContainerTypes;
const { successGetTrackInfo, failureGetTrackInfo, successGetTrackById } = searchContainerCreators;

export function* getTrackList(action) {
  const response = yield call(getList, action.searchTerm);
  const { data, ok } = response;
  if (ok) {
    const results = get(data, 'results', []);
    const count = get(data, 'resultCount', 0);
    const convertedData = convertArrayToObject(results, 'trackId');
    const trackResult = {
      resultCount: count,
      results: convertedData
    };
    yield put(successGetTrackInfo(trackResult));
  } else {
    yield put(failureGetTrackInfo(data));
  }
}

export function* getTrackById(action) {
  const trackResults = yield select(selectTrackResults());
  const results = get(trackResults, 'results', {});
  const trackFound = results[action.searchId];
  if (isEmpty(trackFound)) {
    const response = yield call(getList, action.searchId);
    const { data, ok } = response;
    if (ok) {
      const searchedResult = get(data, 'results', []);
      const updatedData = convertArrayToObject(searchedResult, 'trackId');
      const updatedResults = {
        resultCount: trackResults.resultCount + 1,
        results: { ...results, ...updatedData }
      };
      yield put(successGetTrackInfo(updatedResults));
      yield put(successGetTrackById(Object.values(updatedData)[0]));
    } else {
      yield put(failureGetTrackInfo(data));
    }
  } else {
    yield put(successGetTrackById(trackFound));
  }
}

export default function* searchContainerSaga() {
  yield takeLatest(REQUEST_GET_TRACKS, getTrackList);
  yield takeLatest(REQUEST_GET_TRACK_BY_ID, getTrackById);
}
