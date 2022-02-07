import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { searchContainerTypes } from '../reducer';
import TrackComponent from '@app/components/TrackComponent/index';
import { mapDispatchToProps, SearchContainerTest as SearchContainer } from '../index';

describe('<SearchContainer /> container tests', () => {
  let submitSpy;
  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SearchContainer dispatchGetTrackList={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should call dispatchClearTrackInfo on empty change', async () => {
    const getTrackInfoSpy = jest.fn();
    const clearTrackInfoSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <SearchContainer dispatchClearTrackInfo={clearTrackInfoSpy} dispatchGetTrackList={getTrackInfoSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), { target: { value: 'a' } });
    await timeout(500);
    expect(getTrackInfoSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearTrackInfoSpy).toBeCalled();
  });
  it('should call dispatchTrackInfo on change and after enter', async () => {
    const trackName = 'react-template';
    const { getByTestId } = renderProvider(<SearchContainer dispatchGetTrackList={submitSpy} />);
    const searchBar = getByTestId('search-bar');
    fireEvent.change(searchBar, {
      target: { value: trackName }
    });
    await timeout(500);
    expect(submitSpy).toBeCalledWith(trackName);
    fireEvent.keyDown(searchBar, {
      key: 'Enter',
      code: 13,
      charCode: 13
    });
    expect(submitSpy).toBeCalledWith(trackName);
  });
  it('should validate mapDispatchToProps actions', async () => {
    const dispatchInfoSearchSpy = jest.fn();
    const searchTerm = 'react-template';
    const actions = {
      dispatchGetTrackList: { searchTerm, type: searchContainerTypes.REQUEST_GET_TRACKS },
      dispatchClearTrackInfo: { type: searchContainerTypes.CLEAR_TRACK_INFO }
    };
    const props = mapDispatchToProps(dispatchInfoSearchSpy);
    props.dispatchGetTrackList(searchTerm);
    expect(dispatchInfoSearchSpy).toHaveBeenCalledWith(actions.dispatchGetTrackList);
    await timeout(500);
    props.dispatchClearTrackInfo();
    expect(dispatchInfoSearchSpy).toHaveBeenCalledWith(actions.dispatchClearTrackInfo);
  });
  it('should call dispatchTrackInfo on submit', async () => {
    const searchTerm = 'react-template';
    const { getByTestId } = renderProvider(<SearchContainer dispatchGetTrackList={submitSpy} />);
    fireEvent.keyDown(getByTestId('search-bar'), { keyCode: 13, target: { value: searchTerm } });
    await timeout(500);
    expect(submitSpy).toBeCalledWith(searchTerm);
  });
  it('should dispatchGetTrackList if user types and the trackData is empty', async () => {
    const searchTerm = 'react-template';
    renderProvider(<SearchContainer searchTerm={searchTerm} trackResults={null} dispatchGetTrackList={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalledWith(searchTerm);
  });
  it('should render exact number of TrackComponents as per the ResultCount in result', () => {
    const resultCount = 1;
    const data = {
      trackName: 'See you Again',
      artistName: 'Charlie Puth',
      artworkUrl100:
        'https://is4-ssl.mzstatic.com/image/thumb/Podcasts125/v4/72/46/63/724663b9-46ac-ab25-c167-546ef48f7ed5/mza_1727273594955964910.jpg/60x60bb.jpg',
      previewUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5d/b0/e4/5db0e413-9d75-d04c-5e95-ea9fc6361084/mzaf_16693952033856250131.plus.aac.p.m4a'
    };
    const { getAllByTestId } = renderProvider(<TrackComponent item={data} />);
    expect(getAllByTestId('TrackCard').length).toBe(resultCount);
  });

  it('should set setPlayingSong if type passed to handleOnActionClick is play', async () => {
    const handleOnActionClickSpy = jest.fn();
    const data = {
      resultCount: 1,
      results: [
        {
          trackName: 'See you Again',
          artistName: 'Charlie Puth',
          artworkUrl100:
            'https://is4-ssl.mzstatic.com/image/thumb/Podcasts125/v4/72/46/63/724663b9-46ac-ab25-c167-546ef48f7ed5/mza_1727273594955964910.jpg/60x60bb.jpg',
          previewUrl:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5d/b0/e4/5db0e413-9d75-d04c-5e95-ea9fc6361084/mzaf_16693952033856250131.plus.aac.p.m4a'
        },
        {
          trackName: 'See you Tomorrow',
          artistName: 'Charlie Puth',
          artworkUrl100:
            'https://is4-ssl.mzstatic.com/image/thumb/Podcasts125/v4/72/46/63/724663b9-46ac-ab25-c167-546ef48f7ed5/mza_1727273594955964910.jpg/60x60bb.jpg',
          previewUrl:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5d/b0/e4/5db0e413-9d75-d04c-5e95-ea9fc6361084/mzaf_16693952033856250131.plus.aac.p.m4a'
        }
      ]
    };
    const { getByTestId } = renderProvider(
      <SearchContainer handleOnActionClick={handleOnActionClickSpy} trackResults={data} />
    );
    const trackOne = data.results[0].trackName;
    const trackTwo = data.results[1].trackName;
    const spy = jest.spyOn(getByTestId(trackOne), 'pause');
    fireEvent.play(getByTestId(trackOne));
    fireEvent.play(getByTestId(trackTwo));
    expect(spy).toBeCalled();
  });
});

it('should play the song if the type of event is play ', async () => {
  const data = {
    resultCount: 1,
    results: [
      {
        trackName: 'See you Again',
        artistName: 'Charlie Puth',
        artworkUrl100:
          'https://is4-ssl.mzstatic.com/image/thumb/Podcasts125/v4/72/46/63/724663b9-46ac-ab25-c167-546ef48f7ed5/mza_1727273594955964910.jpg/60x60bb.jpg',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5d/b0/e4/5db0e413-9d75-d04c-5e95-ea9fc6361084/mzaf_16693952033856250131.plus.aac.p.m4a'
      }
    ]
  };
  const trackOne = data.results[0].trackName;
  const { getByTestId } = renderProvider(<SearchContainer trackResults={data} />);
  jest.spyOn(getByTestId(trackOne), 'play').mockImplementation(() => (getByTestId(trackOne).playing = true));
  getByTestId(trackOne).play();
  expect(getByTestId(trackOne).playing).toEqual(true);
});

it('should pause the song if the type passed to event is pause', () => {
  const data = {
    resultCount: 1,
    results: [
      {
        trackName: 'See you Again',
        artistName: 'Charlie Puth',
        artworkUrl100:
          'https://is4-ssl.mzstatic.com/image/thumb/Podcasts125/v4/72/46/63/724663b9-46ac-ab25-c167-546ef48f7ed5/mza_1727273594955964910.jpg/60x60bb.jpg',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5d/b0/e4/5db0e413-9d75-d04c-5e95-ea9fc6361084/mzaf_16693952033856250131.plus.aac.p.m4a'
      }
    ]
  };
  const trackOne = data.results[0].trackName;
  const { getByTestId } = renderProvider(<SearchContainer trackResults={data} />);
  fireEvent.pause(getByTestId(trackOne));
  expect(getByTestId(trackOne).paused).toEqual(true);
});
