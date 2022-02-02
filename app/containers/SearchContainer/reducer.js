/*
 *
 * SearchContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = { searchTerm: null, trackData: {}, trackError: null };

export const { Types: searchContainerTypes, Creators: searchContainerCreators } = createActions({
  requestTrackInfo: ['searchTerm'],
  successGetTrackInfo: ['data'],
  failureGetTrackInfo: ['error'],
  clearTrackInfo: {}
});

/* eslint-disable default-case, no-param-reassign */
export const searchContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case searchContainerTypes.REQUEST_TRACK_INFO:
        draft.searchTerm = action.searchTerm;
        break;
      case searchContainerTypes.CLEAR_TRACK_INFO:
        draft.searchTerm = null;
        draft.trackError = null;
        draft.trackData = {};
        break;
      case searchContainerTypes.SUCCESS_GET_TRACK_INFO:
        draft.trackData = action.data;
        break;
      case searchContainerTypes.FAILURE_GET_TRACK_INFO:
        draft.trackError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default searchContainerReducer;
