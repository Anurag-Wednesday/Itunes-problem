import MockAdapter from 'axios-mock-adapter';
import { generateApiClient } from '@utils/apiUtils';
import { getList } from '../trackApi';

describe('GetList API tests', () => {
  const trackId = 1558931194;
  it('should make the call to "/search?term=${trackId}"', async () => {
    const mock = new MockAdapter(generateApiClient().axiosInstance);
    const data = trackId;
    mock.onGet(`/search?term=${trackId}`).reply(200, data);
    const res = await getList(trackId);
    expect(res.data.results[0].trackId).toEqual(data);
  });
});
