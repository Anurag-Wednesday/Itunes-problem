import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl, timeout } from '@utils/testUtils';
import UploadTrack from '../index';

describe('<UploadTrack />', () => {
  const trackName = 'Sad';
  const artistName = 'Sad';
  const collection = 'Sad';
  const assignValues = (value) => {
    return { target: { value: value } };
  };
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<UploadTrack />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 UploadTrack component', () => {
    const { getAllByTestId } = renderWithIntl(<UploadTrack />);
    expect(getAllByTestId('upload-track').length).toBe(1);
  });

  it('should call the onFinish with values in the input', async () => {
    const { getByTestId } = renderWithIntl(<UploadTrack />);
    fireEvent.change(getByTestId('track-input'), assignValues(trackName));
    fireEvent.change(getByTestId('artist-name'), assignValues(artistName));
    fireEvent.change(getByTestId('collection-name'), assignValues(collection));
    fireEvent.click(getByTestId('submit'));
    await timeout(500);
    expect(getByTestId('track_title')).toHaveTextContent(trackName);
    expect(getByTestId('artist_name')).toHaveTextContent(artistName);
    expect(getByTestId('collection_name')).toHaveTextContent(collection);
  });
  it('should take the user back to the previous test if clicked on previous button', async () => {
    const { getByTestId } = renderWithIntl(<UploadTrack />);
    fireEvent.change(getByTestId('track-input'), assignValues(trackName));
    fireEvent.change(getByTestId('artist-name'), assignValues(artistName));
    fireEvent.change(getByTestId('collection-name'), assignValues(collection));
    fireEvent.click(getByTestId('submit'));
    await timeout(500);
    fireEvent.click(getByTestId('previous'));
    expect(getByTestId('track-input')).toBeInTheDocument();
  });
  it('should give the user option tom upload image and submit once on step 3', async () => {
    const { getByTestId } = renderWithIntl(<UploadTrack />);
    fireEvent.change(getByTestId('track-input'), assignValues(trackName));
    fireEvent.change(getByTestId('artist-name'), assignValues(artistName));
    fireEvent.change(getByTestId('collection-name'), assignValues(collection));
    fireEvent.click(getByTestId('submit'));
    await timeout(500);
    fireEvent.change(getByTestId('genre-input'), assignValues(artistName));
    fireEvent.change(getByTestId('country-input'), assignValues(collection));
    fireEvent.click(getByTestId('submit'));
    await timeout(500);
    expect(getByTestId('upload')).toBeInTheDocument();
    expect(getByTestId('submit')).toBeInTheDocument();
  });
});
