import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the SearchContainer state domain
 */

export const selectSearchContainerDomain = (state) => state.searchContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchContainer
 */

export const selectSearchContainer = () => createSelector(selectSearchContainerDomain, (substate) => substate);

export const selectTrackResults = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'trackResults'));

export const selectTrackErrors = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'trackErrors'));

export const selectSearchTerm = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'searchTerm'));
export default selectSearchContainer;
