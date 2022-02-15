import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl, timeout } from '@utils/testUtils';
import UploadTrackImage from '../index';

describe('<UploadTrack />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<UploadTrackImage />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 UploadTrack component', () => {
    const { getAllByTestId } = renderWithIntl(<UploadTrackImage />);
    expect(getAllByTestId('upload').length).toBe(1);
  });

  it('should give user the option to upload Image', async () => {
    const handleOnSubmit = jest.fn();
    const { getByTestId } = renderWithIntl(<UploadTrackImage handleOnSubmit={handleOnSubmit} />);
    const file = new File([''], 'chucknorris.png', { type: 'image/png' });
    fireEvent.change(getByTestId('upload'), {
      target: { files: [file] }
    });
    await timeout(500);
    let image = document.getElementById('upload');
    expect(image.files[0].name).toBe('chucknorris.png');
    expect(image.files.length).toBe(1);
    fireEvent.click(getByTestId('submit'));
  });

  it('should upload the image', () => {
    const uploadProps = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      defaultFileList: [
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500',
          url: 'http://www.baidu.com/xxx.png'
        }
      ]
    };
    const { getByTestId, baseElement } = renderWithIntl(<UploadTrackImage uploadProps={uploadProps} />);
    fireEvent.click(getByTestId('submit'));
    expect(baseElement.getElementsByClassName('ant-upload-list-item').length).toBe(1);
  });
});
