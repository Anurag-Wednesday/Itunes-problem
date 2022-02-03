import { generateApiClient } from '@utils/apiUtils';

const itunesApi = generateApiClient('itunes');
export const getList = (searchTerm) => itunesApi.get(`/search?term=${searchTerm}`);
