import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

export const selectSearchContainerDomain = (state) => state.searchContainer || initialState;

export const selectSearchContainer = () => createSelector(selectSearchContainerDomain, (substate) => substate);

export const selectTrackResults = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'trackResults'));

export const selectTrackErrors = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'trackErrors'));

export const selectSearchTerm = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'searchTerm'));
export const selectSearchedTrack = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'searchedTrack'));
export default selectSearchContainer;
