import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Input, Skeleton, Card, notification, message } from 'antd';
import get from 'lodash/get';
import { isEmpty } from 'lodash';
import debounce from 'lodash/debounce';
import If from '@components/If';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import history from '@app/utils/history';
import { selectSearchContainer, selectTrackResults, selectTrackErrors, selectSearchTerm } from '../selectors';
import searchContainerSaga from '../saga';
import { colors } from '@app/themes/index';
import { searchContainerCreators } from '../reducer';
import TrackComponent from '@components/TrackComponent';
import T from '@components/T';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: 1000;
    background-color: ${colors.background};
    border-style: hidden;
    color: ${colors.whiteText};
  }
`;

const TrackLayoutContainer = styled.div`
  && {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    background-color: ${colors.background};
    max-width: 100vw;
    margin: '15px';
    column-gap: 10px;
    color: ${colors.whiteText};
  }
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    background-color: ${colors.background};
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
const Header = styled.h2`
  && {
    display: flex;
    align-item: center;
    justify-content: center;
    color: white;
  }
`;

const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;

const StyledT = styled(T)`
  && {
    color: ${colors.gotoStories};
    margin: 0.5rem;
  }
`;

export function SearchContainer({
  dispatchGetTrackList,
  dispatchClearTrackInfo,
  intl,
  searchTerm,
  trackErrors,
  trackResults,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);
  const [playingSong, setPlayingSong] = useState(null);
  const handleOnActionClick = (track, type) => {
    if (type === 'play') {
      notification.open({
        message: 'Now Playing',
        description: `${track.id}`
      });
      setPlayingSong(track);
      if (playingSong && playingSong !== track) {
        playingSong.pause();
      }
    }
  };
  useEffect(() => {
    get(trackResults) || trackErrors;
    setLoading(false);
  }, [trackResults]);

  useEffect(() => {
    if (searchTerm && !trackResults) {
      dispatchGetTrackList(searchTerm);
      setLoading(true);
    }
  });
  useEffect(() => {
    if (searchTerm && !trackResults) {
      dispatchGetTrackList(searchTerm);
      setLoading(true);
    }
  }, [searchTerm, trackResults]);

  const handleOnChange = (sTerm) => {
    if (!isEmpty(sTerm)) {
      dispatchGetTrackList(sTerm);
    } else {
      message.warning('Cleared Search');
      dispatchClearTrackInfo();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderTrackList = () => {
    const results = get(trackResults, 'results', []);
    const resultCount = get(trackResults, 'resultCount', 0);
    return (
      <If condition={!isEmpty(results) || loading}>
        <Container>
          <RightContent>
            <StyledT
              data-testid="redirect-to-upload"
              id="upload"
              onClick={() => history.push('/tracks/upload/steps')}
            />
          </RightContent>
          <CustomCard>
            <Skeleton loading={loading} active>
              <If condition={!isEmpty(searchTerm)}>
                <T type="subText" id="search_term" values={{ searchTerm }} />
                <T type="subText" id="tracks_found" values={{ resultCount }} />
              </If>
            </Skeleton>
            <TrackLayoutContainer>
              {Object.values(results).map((item, idx) => (
                <TrackComponent key={idx} {...item} handleOnActionClick={handleOnActionClick} />
              ))}
            </TrackLayoutContainer>
          </CustomCard>
        </Container>
      </If>
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <Header>
        <div>Welcome to Itunes Search</div>
      </Header>
      <Search
        data-testid="search-bar"
        defaultValue={searchTerm}
        type="text"
        onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
        onSearch={(searchText) => debouncedHandleOnChange(searchText)}
      />
      {renderTrackList()}
    </Container>
  );
}

SearchContainer.propTypes = {
  dispatchGetTrackList: PropTypes.func,
  dispatchClearTrackInfo: PropTypes.func,
  handleOnActionClick: PropTypes.func,
  intl: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  trackErrors: PropTypes.string,
  searchTerm: PropTypes.string,
  trackResults: PropTypes.shape({
    resultsCount: PropTypes.number,
    map: PropTypes.func,
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

SearchContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  trackData: {},
  trackError: null
};

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
