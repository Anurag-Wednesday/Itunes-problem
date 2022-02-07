import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Card } from 'antd';
import styled from 'styled-components';
import T from '@components/T';
import If from '@components/If';

const TrackCard = styled(Card)`&&{
  width: '350px',
  height: 'auto',
  minHeight: '200',
  display: 'flex',
  justifyContent: 'start',
  flexDirection: 'row',
  alignItems: 'start',
  flexWrap: 'wrap',
  margin: '10px',
  padding: '10px'
}`;

const TrackImage = styled.img`
  && {
    width: 100px;
    height: 100px;
    margin-left: 30%;
    border-radius: 50%;
  }
`;

const AudioPlayer = styled.audio`
  && {
    width: 250px;
    height: 35px;
    color: black;
  }
`;

export function TrackComponent({ trackName, artworkUrl100, artistName, previewUrl, handleOnActionClick }) {
  function onActionHandler(evt) {
    handleOnActionClick(evt.target, evt.type);
  }

  return (
    <TrackCard data-testid="TrackCard" title={trackName}>
      <If condition={!isEmpty(artworkUrl100)} otherwise={<T data-testId="Image Unavailable" />}>
        <TrackImage alt={trackName} src={artworkUrl100} />
      </If>
      <If condition={!isEmpty(artistName)} otherwise={<T data-testid="Artist data unavailable" />}>
        <T type="subText" data-testid="artist_name" id="artist_name" values={{ artist: artistName }} />
      </If>
      <If condition={!isEmpty(trackName)} otherwise={trackName}>
        <T type="subText" data-testid="name" id="name" values={{ trackName }} />
      </If>
      <If condition={!isEmpty(previewUrl)} otherwise={<T data-testid="preview-unavailable" />}>
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
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  item: PropTypes.object,
  handleOnActionClick: PropTypes.func
};

export default memo(TrackComponent);
