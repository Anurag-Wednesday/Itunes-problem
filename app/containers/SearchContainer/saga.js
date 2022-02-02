import { takeLatest, put, call } from 'redux-saga/effects';
import { getInfo } from '@app/services/repoApi';
import { searchContainerTypes, searchContainerCreators } from './reducer';

// Individual exports for testing

const { REQUEST_TRACK_INFO } = searchContainerTypes;
const { successGetTrackInfo, failureGetTrackInfo } = searchContainerCreators;

export function* getTrackInfo(action) {
  const response = yield call(getInfo, action.searchTerm);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackInfo(data));
  } else {
    yield put(failureGetTrackInfo(data));
  }
}

export default function* searchContainerSaga() {
  yield takeLatest(REQUEST_TRACK_INFO, getTrackInfo);
}
