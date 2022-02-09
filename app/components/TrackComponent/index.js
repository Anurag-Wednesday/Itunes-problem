import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Card } from 'antd';
import { colors } from '@app/themes/index';
import styled from 'styled-components';
import T from '@components/T';
import If from '@components/If';
import history from '@app/utils/history';

const TrackCard = styled(Card)`
  && {
    width: 22rem;
    height: auto;
    alignitems: start;
    flexwrap: wrap;
    background-color: ${colors.background};
    color: white;
    font-weight: 400;
    padding: 1rem;
  }
`;

const TrackImage = styled.img`
  && {
    width: 6.25rem;
    height: 6.25rem;
    margin-left: 30%;
    margin-bottom: 1rem;
    border-radius: 50%;
  }
`;

const AudioPlayer = styled.audio`
  && {
    width: 15.6rem;
    height: 2.2rem;
    margin-top: 1.5rem;
  }
`;

const Title = styled(T)`
  && {
    color: ${colors.whiteText};
    font-style: italic;
  }
`;

export function TrackComponent({ trackId, trackName, artworkUrl100, artistName, previewUrl, handleOnActionClick }) {
  function onActionHandler(evt) {
    handleOnActionClick(evt.target, evt.type);
  }

  return (
    <TrackCard
      onClick={() => history.push(`/tracks/${trackId}`)}
      data-testid="TrackCard"
      title={
        <If condition={!isEmpty(trackName)} otherwise={<T type="subheading" id="no_track_name" />}>
          <Title type="subheading" id="name" values={{ trackName }} />
        </If>
      }
    >
      <If condition={!isEmpty(artworkUrl100)} otherwise={<T id="image_unavailable" />}>
        <TrackImage alt={trackName} src={artworkUrl100} />
      </If>
      <If condition={!isEmpty(artistName)} otherwise={<T id="artist_data_unavailable" />}>
        <T type="subText" data-testid="artist_name" id="artist_name" values={{ artist: artistName }} />
      </If>
      <If condition={!isEmpty(trackName)} otherwise={trackName}>
        <T type="subText" data-testid="name" id="name" values={{ trackName }} />
      </If>
      <If condition={!isEmpty(previewUrl)} otherwise={<T id="preview_unavailable" />}>
        <AudioPlayer
          data-testid={trackName}
          onPlay={(evt) => onActionHandler(evt)}
          onPause={(evt) => onActionHandler(evt)}
          controls
        >
          <source src={previewUrl} />
        </AudioPlayer>
      </If>
    </TrackCard>
  );
}

TrackComponent.propTypes = {
  trackId: PropTypes.number,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  handleOnActionClick: PropTypes.func
};

export default memo(TrackComponent);
