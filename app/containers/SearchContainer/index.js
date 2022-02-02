/**
 *
 * SearchContainer
 *
 */

import React, { memo, useEffect, useState } from 'react';
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
  dispatchTrackInfo,
  dispatchClearTrackInfo,
  intl,
  searchTerm,
  trackError,
  trackData
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(trackData) || trackError;
    if (loaded) {
      setLoading(false);
    }
  }, [trackData]);

  useEffect(() => {
    if (searchTerm && !trackData) {
      dispatchTrackInfo(searchTerm);
      setLoading(true);
    }
  });

  const handleOnChange = (sTerm) => {
    if (!isEmpty(sTerm)) {
      dispatchTrackInfo(sTerm);
      setLoading(true);
    } else {
      dispatchClearTrackInfo();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  return (
    <div>
      <Search
        data-testid="search-bar"
        defaultValue={searchTerm}
        type="text"
        onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
        onSearch={(searchText) => debouncedHandleOnChange(searchText)}
      />
      <T id={'SearchContainer'} />
      {loading ? 'loading' : <div>Data</div>}
    </div>
  );
}

SearchContainer.propTypes = {
  dispatchTrackInfo: PropTypes.func,
  dispatchClearTrackInfo: PropTypes.func,
  intl: PropTypes.object,
  trackError: PropTypes.string,
  searchTerm: PropTypes.string,
  trackData: PropTypes.shape({
    resultsCount: PropTypes.number,
    results: PropTypes.array
  })
};
const mapStateToProps = createStructuredSelector({
  searchContainer: selectSearchContainer(),
  trackData: selectTrackData(),
  trackError: selectTrackError(),
  searchTerm: selectSearchTerm()
});

export function mapDispatchToProps(dispatch) {
  const { requestTrackInfo, clearTrackInfo } = searchContainerCreators;
  return {
    dispatchTrackInfo: (searchTerm) => dispatch(requestTrackInfo(searchTerm)),
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
