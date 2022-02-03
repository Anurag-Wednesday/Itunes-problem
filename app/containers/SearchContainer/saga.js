import { takeLatest, put, call } from 'redux-saga/effects';
import { getList } from '@app/services/trackApi';
import { searchContainerTypes, searchContainerCreators } from './reducer';

// Individual exports for testing

const { REQUEST_GET_TRACKS } = searchContainerTypes;
const { successGetTrackInfo, failureGetTrackInfo } = searchContainerCreators;

export function* getTrackList(action) {
  const response = yield call(getList, action.searchTerm);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackInfo(data));
  } else {
    yield put(failureGetTrackInfo(data));
  }
}

export default function* searchContainerSaga() {
  yield takeLatest(REQUEST_GET_TRACKS, getTrackList);
}
