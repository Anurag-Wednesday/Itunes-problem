import React from 'react';
import { Router } from 'react-router';
import { renderWithIntl, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import history from '@app/utils/history';
import TrackComponent from '../index';
import { translate } from '@app/components/IntlGlobalProvider/index';

describe('<TrackComponent />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackComponent />);
    expect(baseElement).toMatchSnapshot();
  });
});

it('should contain one TrackComponent', () => {
  const { getAllByTestId } = renderWithIntl(<TrackComponent />);
  expect(getAllByTestId('TrackCard').length).toBe(1);
});

it('should render the track details inside the Card', () => {
  const trackName = 'See you Again';
  const artistName = 'Charlie Puth';
  const { getByTestId } = renderWithIntl(<TrackComponent trackName={trackName} artistName={artistName} />);
  expect(getByTestId('name')).toHaveTextContent(trackName);
  expect(getByTestId('artist_name')).toHaveTextContent(artistName);
});

it('should call onActionHandler if audio controls are clicked', () => {
  const handleOnActionClick = jest.fn();
  const trackName = 'See you Again';
  const artistName = 'Charlie Puth';
  const previewUrl =
    'https://is4-ssl.mzstatic.com/image/thumb/Podcasts125/v4/72/46/63/724663b9-46ac-ab25-c167-546ef48f7ed5/mza_1727273594955964910.jpg/60x60bb.jpg';
  const artworkUrl100 =
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5d/b0/e4/5db0e413-9d75-d04c-5e95-ea9fc6361084/mzaf_16693952033856250131.plus.aac.p.m4a';
  const { getByTestId } = renderWithIntl(
    <TrackComponent
      trackName={trackName}
      artistName={artistName}
      previewUrl={previewUrl}
      artworkUrl100={artworkUrl100}
      handleOnActionClick={handleOnActionClick}
    />
  );
  fireEvent.pause(getByTestId(trackName));
  expect(handleOnActionClick).toBeCalledWith(getByTestId(trackName), 'pause');
  expect(getByTestId(trackName).paused).toEqual(true);
  fireEvent.play(getByTestId(trackName));
  expect(handleOnActionClick).toBeCalledWith(getByTestId(trackName), 'play');
});

it('should render the track details unavailable messages in case any props are unavailable', () => {
  const { getByText } = renderWithIntl(<TrackComponent />);
  const trackNameUnavailable = translate('no_track_name');
  const artistDataUnavailable = translate('artist_data_unavailable');
  const imageUnavailable = translate('image_unavailable');
  const previewUnavailable = translate('preview_unavailable');

  expect(getByText(trackNameUnavailable)).toBeInTheDocument();
  expect(getByText(artistDataUnavailable)).toBeInTheDocument();
  expect(getByText(imageUnavailable)).toBeInTheDocument();
  expect(getByText(previewUnavailable)).toBeInTheDocument();
});

it('should redirect to /trackId when clicked on Clickable component', async () => {
  const trackName = 'See you Again';
  const artistName = 'Charlie Puth';
  const trackId = 1445140962;
  const previewUrl =
    'https://is4-ssl.mzstatic.com/image/thumb/Podcasts125/v4/72/46/63/724663b9-46ac-ab25-c167-546ef48f7ed5/mza_1727273594955964910.jpg/60x60bb.jpg';
  const artworkUrl100 =
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5d/b0/e4/5db0e413-9d75-d04c-5e95-ea9fc6361084/mzaf_16693952033856250131.plus.aac.p.m4a';
  const { getByTestId } = renderWithIntl(
    <Router history={history}>
      <TrackComponent
        trackName={trackName}
        artistName={artistName}
        previewUrl={previewUrl}
        artworkUrl100={artworkUrl100}
        trackId={trackId}
      />
    </Router>
  );
  const historySpy = jest.spyOn(history, 'push');
  fireEvent.click(getByTestId('TrackCard'));
  await timeout(500);
  expect(historySpy).toHaveBeenCalledWith(`/tracks/${trackId}`);
});
