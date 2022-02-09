/*
 *
 * SearchContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = { searchTerm: null, trackResults: {}, trackErrors: null, searchedTrack: {} };

export const { Types: searchContainerTypes, Creators: searchContainerCreators } = createActions({
  requestGetTracks: ['searchTerm'],
  successGetTrackInfo: ['data'],
  failureGetTrackInfo: ['error'],
  requestGetTrackById: ['searchId'],
  successGetTrackById: ['item'],
  clearTrackInfo: {}
});

export const searchContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case searchContainerTypes.REQUEST_GET_TRACKS:
        draft.searchTerm = action.searchTerm;
        break;
      case searchContainerTypes.REQUEST_GET_TRACK_BY_ID:
        draft.searchId = action.searchId;
        break;
      case searchContainerTypes.CLEAR_TRACK_INFO:
        draft.searchTerm = null;
        draft.trackErrors = null;
        draft.trackResults = {};
        break;
      case searchContainerTypes.SUCCESS_GET_TRACK_INFO:
        draft.trackResults = action.data;
        break;
      case searchContainerTypes.SUCCESS_GET_TRACK_BY_ID:
        draft.searchedTrack = action.item;
        break;
      case searchContainerTypes.FAILURE_GET_TRACK_INFO:
        draft.trackErrors = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default searchContainerReducer;
