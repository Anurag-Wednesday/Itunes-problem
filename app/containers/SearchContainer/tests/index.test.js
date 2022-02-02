/**
 *
 * Tests for SearchContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import { SearchContainerTest as SearchContainer } from '../index';

describe('<SearchContainer /> container tests', () => {
  beforeEach(() => {});
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<SearchContainer />);
    expect(baseElement).toMatchSnapshot();
  });
});
