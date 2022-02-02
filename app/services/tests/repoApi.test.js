import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getRepos, getInfo } from '../repoApi';

describe('RepoApi tests', () => {
  const repositoryName = 'mac';
  it('should make the api call to "/search/repositories?q="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ repositoryName }]
      }
    ];
    mock.onGet(`/search/repositories?q=${repositoryName}`).reply(200, data);
    const res = await getRepos(repositoryName);
    expect(res.data).toEqual(data);
  });
});

describe('GetInfo API tests', () => {
  const trackId = 1558931194;
  it('should make the call to "`/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = trackId;
    mock.onGet(`/search?term=${trackId}`).reply(200, data);
    const res = await getInfo(trackId);
    expect(res.data.results[0].trackId).toEqual(data);
  });
});
