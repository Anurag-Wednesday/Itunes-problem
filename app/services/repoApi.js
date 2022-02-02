import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');
const itunesApi = generateApiClient('itunes');
export const getRepos = (repoName) => repoApi.get(`/search/repositories?q=${repoName}`);

export const getInfo = (searchTerm) => itunesApi.get(`/search?term=${searchTerm}`);
