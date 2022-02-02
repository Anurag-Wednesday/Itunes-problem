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

export const selectTrackData = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'trackData'));

export const selectTrackError = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'trackError'));

export const selectSearchTerm = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'searchTerm'));
export default selectSearchContainer;
