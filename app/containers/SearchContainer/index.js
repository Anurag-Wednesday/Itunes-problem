import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectSearchContainer, selectTrackResults, selectTrackErrors, selectSearchTerm } from './selectors';
import searchContainerSaga from './saga';

import { searchContainerCreators } from './reducer';

const { Search } = Input;

export function SearchContainer({
  dispatchGetTrackList,
  dispatchClearTrackInfo,
  intl,
  searchTerm,
  trackErrors,
  trackResults
}) {
  useEffect(() => {
    get(trackResults) || trackErrors;
  }, [trackResults]);

  useEffect(() => {
    if (searchTerm && !trackResults) {
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
  trackErrors: PropTypes.string,
  searchTerm: PropTypes.string,
  trackResults: PropTypes.shape({
    resultsCount: PropTypes.number,
    results:
      PropTypes.array[
        PropTypes.shape({
          wrapperType: PropTypes.string,
          kind: PropTypes.string,
          artistId: PropTypes.number,
          collectionId: PropTypes.number,
          trackId: PropTypes.number.isRequired,
          artistName: PropTypes.string,
          collectionName: PropTypes.string.isRequired,
          trackName: PropTypes.string.isRequired,
          collectionCensoredName: PropTypes.string,
          trackCensoredName: PropTypes.string,
          collectionArtistName: PropTypes.string,
          artistViewUrl: PropTypes.string,
          collectionViewUrl: PropTypes.string,
          trackViewUrl: PropTypes.string,
          previewUrl: PropTypes.string.isRequired,
          artworkUrl30: PropTypes.string,
          artworkUrl60: PropTypes.string,
          artworkUrl100: PropTypes.string.isRequired,
          releaseDate: PropTypes.string,
          trackExplicitness: PropTypes.string,
          discCount: PropTypes.number,
          discNumber: PropTypes.number,
          trackCount: PropTypes.number,
          trackNumber: PropTypes.number,
          trackTimeMillis: PropTypes.number,
          country: PropTypes.string,
          currency: PropTypes.string,
          primaryGenreName: PropTypes.string.isRequired,
          contentAdvisoryRating: PropTypes.string,
          isStreamable: PropTypes.boolean
        })
      ]
  })
};
const mapStateToProps = createStructuredSelector({
  searchContainer: selectSearchContainer(),
  trackResults: selectTrackResults(),
  trackErrors: selectTrackErrors(),
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
