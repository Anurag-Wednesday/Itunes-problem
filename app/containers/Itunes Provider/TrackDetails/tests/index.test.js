/**
 *
 * Tests for TrackDetails
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { TrackDetailsTest as TrackDetails } from '../index';

describe('<TrackDetails /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackDetails />);
    expect(baseElement).toMatchSnapshot();
  });
});
