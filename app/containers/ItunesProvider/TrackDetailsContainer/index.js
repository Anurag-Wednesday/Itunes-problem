import React, { memo, useState, useEffect } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Skeleton, Card, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectTrackErrors, selectSearchedTrack } from '../selectors';
import If from '@components/If';
import { colors } from '@app/themes';
import T from '@components/T';
import { searchContainerCreators } from '../reducer';
import TrackDetailsComponent from '@app/components/TrackDetailsComponent/index';
import searchContainerSaga from '../saga';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: 1000;
    border-style: hidden;
    background-color: ${colors.background};
    min-height: 100vh;
  }
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    background-color: ${colors.background};
    min-height: 100vh;
  }
`;
export function TrackDetailsContainer({ trackErrors, searchedTrack, dispatchGetTrackById }) {
  const { trackId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatchGetTrackById(trackId);
  }, [trackId]);

  useEffect(() => {
    setLoading(false);
  }, [searchedTrack]);

  const renderTrackDetails = () => {
    return (
      <If condition={!isEmpty(searchedTrack) || loading}>
        <Container>
          <CustomCard>
            <Skeleton loading={loading} active>
              <TrackDetailsComponent {...searchedTrack} />
            </Skeleton>
          </CustomCard>
        </Container>
      </If>
    );
  };

  const renderLoading = () => {
    return (
      <If condition={loading}>
        <Spin />
      </If>
    );
  };

  const renderError = () => {
    let tracksError;
    if (trackErrors) {
      tracksError = trackErrors;
    }
    return (
      !loading &&
      tracksError && (
        <If condition={tracksError} otherwise={<T data-testid="default-message" id={tracksError} />}>
          <T data-testid="error-message" text={tracksError} />
          <button data-testid="retry-button" onClick={() => dispatchGetTrackById(trackId)}>
            Retry
          </button>
        </If>
      )
    );
  };

  return (
    <>
      {renderLoading()}
      {renderTrackDetails()}
      {renderError()};
    </>
  );
}

TrackDetailsContainer.propTypes = {
  dispatchGetTrackById: PropTypes.func,
  trackErrors: PropTypes.string,
  searchedTrack: PropTypes.shape({
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
};

const mapStateToProps = createStructuredSelector({
  searchedTrack: selectSearchedTrack(),
  trackErrors: selectTrackErrors()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetTrackById } = searchContainerCreators;
  return {
    dispatchGetTrackById: (searchId) => dispatch(requestGetTrackById(searchId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'searchContainer', saga: searchContainerSaga })
)(TrackDetailsContainer);

export const TrackDetailsTest = compose(injectIntl)(TrackDetailsContainer);
