import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import TrackDetailsComponent from '../index';
import { translate } from '@app/components/IntlGlobalProvider/index';

describe('<TrackDetailsComponent />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackDetailsComponent />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackDetailsComponent component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackDetailsComponent />);
    expect(getAllByTestId('track-details-component').length).toBe(1);
  });

  it('should render the track details insidethe card', () => {
    const trackName = 'See you Again';
    const artistName = 'Charlie Puth';
    const { getByTestId } = renderWithIntl(<TrackDetailsComponent trackName={trackName} artistName={artistName} />);
    expect(getByTestId('track_title')).toHaveTextContent(trackName);
    expect(getByTestId('artist_name')).toHaveTextContent(artistName);
  });
  it('should render the details unavailable messages in case any props are unavailable or have falsy values', () => {
    const { getByTestId } = renderWithIntl(<TrackDetailsComponent />);
    const noTrackName = translate('no_track_name');
    const artistDataUnavailable = translate('artist_data_unavailable');
    const imageUnavailable = translate('image_unavailable');

    expect(getByTestId('no-track-name')).toHaveTextContent(noTrackName);
    expect(getByTestId('artist_data_unavailable')).toHaveTextContent(artistDataUnavailable);
    expect(getByTestId('image_unavailable')).toHaveTextContent(imageUnavailable);
  });
});
