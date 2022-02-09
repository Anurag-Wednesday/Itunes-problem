import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, timeout } from '@utils/testUtils';
import { TrackDetailsTest as TrackDetailsContainer, mapDispatchToProps } from '../index';
import { searchContainerTypes } from '../../reducer';

describe('<TrackDetails /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackDetailsContainer dispatchGetTrackById={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render error message when the search goes wrong and give retry button to try again', () => {
    const defaultError = 'something_went_wrong';
    const { getByTestId } = renderProvider(
      <TrackDetailsContainer trackErrors={defaultError} dispatchGetTrackById={submitSpy} />
    );
    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(getByTestId('error-message').textContent).toBe(defaultError);
    fireEvent.click(getByTestId('retry-button'));
    expect(submitSpy).toBeCalled();
  });

  it('should should render the TrackDetailsComponent if data is present ', async () => {
    const data = {
      resultCount: 1,
      results: [
        {
          trackName: 'See you Again',
          artistName: 'Charlie Puth',
          trackId: 1445140962,
          artworkUrl100:
            'https://is4-ssl.mzstatic.com/image/thumb/Podcasts125/v4/72/46/63/724663b9-46ac-ab25-c167-546ef48f7ed5/mza_1727273594955964910.jpg/60x60bb.jpg',
          previewUrl:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5d/b0/e4/5db0e413-9d75-d04c-5e95-ea9fc6361084/mzaf_16693952033856250131.plus.aac.p.m4a'
        }
      ]
    };
    const { getByTestId } = renderProvider(
      <TrackDetailsContainer dispatchGetTrackById={submitSpy} searchedTrack={data} />
    );
    await timeout(500);
    expect(getByTestId('track-details-component')).toBeInTheDocument();
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchGetTrackByIdSpy = jest.fn();
    const searchId = 1445140962;
    const actions = {
      dispatchGetTrackById: { searchId, type: searchContainerTypes.REQUEST_GET_TRACK_BY_ID }
    };

    const props = mapDispatchToProps(dispatchGetTrackByIdSpy);
    props.dispatchGetTrackById(searchId);
    expect(dispatchGetTrackByIdSpy).toHaveBeenCalledWith(actions.dispatchGetTrackById);
  });
});
