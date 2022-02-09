import { takeLatest, put, call, select } from 'redux-saga/effects';
import { getList } from '@app/services/trackApi';
import { searchContainerTypes, searchContainerCreators } from './reducer';
import { selectTrackResults } from './selectors';
import { get, isEmpty } from 'lodash';

// Individual exports for testing

const { REQUEST_GET_TRACKS, REQUEST_GET_TRACK_BY_ID } = searchContainerTypes;
const { successGetTrackInfo, failureGetTrackInfo, successGetTrackById } = searchContainerCreators;

export function* getTrackList(action) {
  const response = yield call(getList, action.searchTerm);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackInfo(data));
  } else {
    yield put(failureGetTrackInfo(data));
  }
}

export function* getTrackById(action) {
  const trackResults = yield select(selectTrackResults());
  const results = get(trackResults, 'results', []);
  const trackFound = results.filter((item) => item?.trackId == action.searchId);
  if (isEmpty(trackFound)) {
    const response = yield call(getList, action.searchId);

    const { data, ok } = response;
    if (ok) {
      const updatedResults = {
        resultCount: trackResults.resultCount + 1,
        results: [...trackResults.results, data.results[0]]
      };

      yield put(successGetTrackInfo(updatedResults));
      yield put(successGetTrackById(data));
    } else {
      yield put(failureGetTrackInfo(data));
    }
  } else {
    const data = {
      resultCount: 1,
      results: trackFound
    };
    yield put(successGetTrackById(data));
  }
}

export default function* searchContainerSaga() {
  yield takeLatest(REQUEST_GET_TRACKS, getTrackList);
  yield takeLatest(REQUEST_GET_TRACK_BY_ID, getTrackById);
}
