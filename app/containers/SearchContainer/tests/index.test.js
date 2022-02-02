/**
 *
 * Tests for SearchContainer
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { mapDispatchToProps, SearchContainerTest as SearchContainer } from '../index';
import { fireEvent } from '@testing-library/dom';
import { searchContainerTypes } from '../reducer';

describe('<SearchContainer /> container tests', () => {
  let submitSpy;
  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SearchContainer dispatchTrackInfo={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should call dispatchClearTrackInfo on empty change', async () => {
    const getTrackInfoSpy = jest.fn();
    const clearTrackInfoSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <SearchContainer dispatchClearTrackInfo={clearTrackInfoSpy} dispatchTrackInfo={getTrackInfoSpy} />
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
    const { getByTestId } = renderProvider(<SearchContainer dispatchTrackInfo={submitSpy} />);
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
      dispatchTrackInfo: { searchTerm, type: searchContainerTypes.REQUEST_TRACK_INFO },
      dispatchClearTrackInfo: { type: searchContainerTypes.CLEAR_TRACK_INFO }
    };
    const props = mapDispatchToProps(dispatchInfoSearchSpy);
    props.dispatchTrackInfo(searchTerm);
    expect(dispatchInfoSearchSpy).toHaveBeenCalledWith(actions.dispatchTrackInfo);
    await timeout(500);
    props.dispatchClearTrackInfo();
    expect(dispatchInfoSearchSpy).toHaveBeenCalledWith(actions.dispatchClearTrackInfo);
  });

  it('should call dispatchTrackInfo on submut', async () => {
    const searchTerm = 'react-template';
    const { getByTestId } = renderProvider(<SearchContainer dispatchTrackInfo={submitSpy} />);
    fireEvent.keyDown(getByTestId('search-bar'), { keyCode: 13, target: { value: searchTerm } });
    await timeout(500);
    expect(submitSpy).toBeCalledWith(searchTerm);
  });
  it('should render the data when loading becomes false', () => {
    const trackData = { items: [{ trackOne: 'react-template' }] };
    const { getByTestId } = renderProvider(<SearchContainer trackData={trackData} dispatchTrackInfo={submitSpy} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });
  it('should dispatchTrackInfo if user types and the trackData is empty', async () => {
    const searchTerm = 'react-template';
    renderProvider(<SearchContainer searchTerm={searchTerm} searchData={null} dispatchTrackInfo={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalledWith(searchTerm);
  });
});
