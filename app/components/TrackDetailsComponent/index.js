import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import If from '@components/If';
import T from '@components/T';

const Details = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #231f20;
    color: white;
    margin-left: 7rem;
  }
`;

const TrackTitle = styled.div`
  && {
    text-align: center;
    margin-top: 3rem;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const ArtistName = styled.div`
  && {
    text-align: center;
    color: red;
  }
`;

const StyledCarousel = styled(Carousel)`
  && {
    width: 20rem;
    height: 25rem;
    margin-left: 20%;
  }
`;

const TrackImage = styled.img`
  && {
    border-radius: 0.5rem;
    height: 20rem;
    width: 20rem;
  }
`;

const AudioPlayer = styled.audio`
  && {
    width: 20rem;
    height: 6rem;
    color: black;
    margin: 1rem;
  }
`;

const TrackDetailsCard = styled.div`
  && {
    display: flex;
    flex-direction: row;
  }
`;

export function TrackDetailsComponent({
  trackName,
  previewUrl,
  artistName,
  artworkUrl100,
  collectionName,
  primaryGenreName,
  trackViewUrl
}) {
  return (
    <TrackDetailsCard data-testid="track-details-component">
      <If condition={!isEmpty(artworkUrl100)} otherwise={<T data-testid="image_unavailable" id="image_unavailable" />}>
        <StyledCarousel autoplay dotPosition="bottom">
          <div>
            <TrackImage alt={trackName} src={artworkUrl100} />
          </div>
          <div>
            <TrackImage alt={trackName} src={artworkUrl100} />
          </div>
          <div>
            <TrackImage alt={trackName} src={artworkUrl100} />
          </div>
        </StyledCarousel>
      </If>
      <Details>
        <TrackTitle>
          <If condition={!isEmpty(trackName)} otherwise={<T data-testid="no-track-name" id="no_track_name" />}>
            <T type="heading" id="track_details_name" data-testid="track_title" values={{ Track: trackName }} />
          </If>
        </TrackTitle>
        <ArtistName>
          <If condition={!isEmpty(artistName)} otherwise={<T id="artist_data_unavailable" />}>
            <T type="subheading" data-testid="artist_name" id="artist_name" values={{ artist: artistName }} />
          </If>
        </ArtistName>
        <If
          condition={!isEmpty(collectionName)}
          otherwise={<T data-testid="artist_data_unavailable" id="artist_data_unavailable" />}
        >
          <T type="standard" id="track_details_collectionName" values={{ Collection: collectionName }} />
        </If>
        <If condition={!isEmpty(primaryGenreName)} otherwise={<T id="artist_data_unavailable" />}>
          <T type="standard" id="track_details_genre" values={{ Genre: primaryGenreName }} />
        </If>
        <If condition={!isEmpty(previewUrl)} otherwise={<T id="preview_unavailable" />}>
          <AudioPlayer data-testid={trackName} controls>
            <source src={previewUrl} />
          </AudioPlayer>
        </If>
        <If condition={!isEmpty(trackViewUrl)} otherwise={<T id="artist_data_unavailable" />}>
          <a href={trackViewUrl} target="_blank" rel="noreferrer">
            {<T id="track_details_URL" />}
          </a>
        </If>
      </Details>
    </TrackDetailsCard>
  );
}

TrackDetailsComponent.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  trackName: PropTypes.string,
  trackViewUrl: PropTypes.string,
  previewUrl: PropTypes.string,
  artworkUrl100: PropTypes.string,
  primaryGenreName: PropTypes.string
};

export default memo(TrackDetailsComponent);
