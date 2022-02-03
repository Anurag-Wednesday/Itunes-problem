/**
 *
 * SearchContainer
 *
 */

import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectSearchContainer, selectTrackData, selectTrackError, selectSearchTerm } from './selectors';
import searchContainerSaga from './saga';
import { Input } from 'antd';
import get from 'lodash/get';
import { isEmpty } from 'lodash';
import debounce from 'lodash/debounce';
import { searchContainerCreators } from './reducer';

const { Search } = Input;

export function SearchContainer({
  dispatchGetTrackList,
  dispatchClearTrackInfo,
  intl,
  searchTerm,
  trackError,
  trackData
}) {
  useEffect(() => {
    get(trackData) || trackError;
  }, [trackData]);

  useEffect(() => {
    if (searchTerm && !trackData) {
      dispatchGetTrackList(searchTerm);
    }
  });

  const handleOnChange = (sTerm) => {
    if (!isEmpty(sTerm)) {
      dispatchGetTrackList(sTerm);
    } else {
      dispatchClearTrackInfo();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  return (
    <>
      <Search
        data-testid="search-bar"
        defaultValue={searchTerm}
        type="text"
        onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
        onSearch={(searchText) => debouncedHandleOnChange(searchText)}
      />
      <T id={'SearchContainer'} />
    </>
  );
}

SearchContainer.propTypes = {
  dispatchGetTrackList: PropTypes.func,
  dispatchClearTrackInfo: PropTypes.func,
  intl: PropTypes.object,
  trackError: PropTypes.string,
  searchTerm: PropTypes.string,
  trackData: PropTypes.shape({
    resultsCount: PropTypes.number,
    results:
      PropTypes.array[
        PropTypes.shape({
          wrapperType: PropTypes.string,
          kind: PropTypes.string,
          artistId: PropTypes.number,
          collectionId: PropTypes.number,
          trackId: PropTypes.number,
          artistName: PropTypes.string,
          collectionName: PropTypes.string,
          trackName: PropTypes.string,
          collectionCensoredName: PropTypes.string,
          trackCensoredName: PropTypes.string,
          collectionArtistName: PropTypes.string,
          artistViewUrl: PropTypes.string,
          collectionViewUrl: PropTypes.string,
          trackViewUrl: PropTypes.string,
          previewUrl: PropTypes.string,
          artworkUrl30: PropTypes.string,
          artworkUrl60: PropTypes.string,
          artworkUrl100: PropTypes.string,
          releaseDate: PropTypes.string,
          trackExplicitness: PropTypes.string,
          discCount: PropTypes.number,
          discNumber: PropTypes.number,
          trackCount: PropTypes.number,
          trackNumber: PropTypes.number,
          trackTimeMillis: PropTypes.number,
          country: PropTypes.string,
          currency: PropTypes.string,
          primaryGenreName: PropTypes.string,
          contentAdvisoryRating: PropTypes.string,
          isStreamable: PropTypes.boolean
        })
      ]
  })
};
const mapStateToProps = createStructuredSelector({
  searchContainer: selectSearchContainer(),
  trackData: selectTrackData(),
  trackError: selectTrackError(),
  searchTerm: selectSearchTerm()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetTracks, clearTrackInfo } = searchContainerCreators;
  return {
    dispatchGetTrackList: (searchTerm) => dispatch(requestGetTracks(searchTerm)),
    dispatchClearTrackInfo: () => dispatch(clearTrackInfo())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'searchContainer', saga: searchContainerSaga })
)(SearchContainer);

export const SearchContainerTest = compose(injectIntl)(SearchContainer);
