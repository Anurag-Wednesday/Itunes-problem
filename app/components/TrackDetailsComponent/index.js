import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Carousel, Tag, Popover } from 'antd';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import If from '@components/If';
import { colors } from '@app/themes/index';
import T from '@components/T';

const Details = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${colors.background};
    color: white;
    margin-left: 7rem;
  }
`;

const StyledTag = styled(Tag)`
  && {
    margin-left: 0.5rem;
  }
`;

const TrackTitle = styled.div`
  && {
    text-align: center;
    margin-top: 3rem;
    color: ${colors.whiteText};
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
  trackViewUrl,
  trackExplicitness
}) {
  return (
    <TrackDetailsCard data-testid="track-details-component">
      <If condition={!isEmpty(artworkUrl100)} otherwise={<T data-testid="image_unavailable" id="image_unavailable" />}>
        <Popover
          title="Title"
          content={
            <T type="subheading" id="track_details_name" data-testid="track_title" values={{ Track: trackName }} />
          }
        >
          <StyledCarousel autoplay dotPosition="bottom">
            <TrackImage data-testid="carousel-image" alt={trackName} src={artworkUrl100} />
            <TrackImage data-testid="carousel-image" alt={trackName} src={artworkUrl100} />
            <TrackImage data-testid="carousel-image" alt={trackName} src={artworkUrl100} />
          </StyledCarousel>
        </Popover>
      </If>
      <Details>
        <TrackTitle>
          <If condition={!isEmpty(trackName)} otherwise={<T data-testid="no-track-name" id="no_track_name" />}>
            <T type="heading" id="track_details_name" data-testid="track_title" values={{ Track: trackName }} />
          </If>
          <If condition={trackExplicitness === 'explicit'}>
            <Popover data-tesid="popover" content="Explicit track">
              <StyledTag data-testid="explicit" color="red">
                E
              </StyledTag>
            </Popover>
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
  primaryGenreName: PropTypes.string,
  trackExplicitness: PropTypes.string
};

export default memo(TrackDetailsComponent);
