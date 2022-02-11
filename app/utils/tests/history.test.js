import { setbaseUrl } from '../history';

describe('Tests for baseUrl method in history', () => {
  const OLD_ENV = process.env;
  let baseUrl = '';
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
  it('should not have any base path in production', () => {
    process.env.ENVIRONMENT_NAME = 'production';
    expect(setbaseUrl()).toBe('/');
  });
  it('should set the base path according to the routes in uat', () => {
    process.env.ENVIRONMENT_NAME = 'uat';
    setbaseUrl(baseUrl);
    expect(setbaseUrl()).toBe('');
  });
  it('should set the base path according to the routes even when the path name has query params ', () => {
    process.env.ENVIRONMENT_NAME = 'uat';
    jest.mock('@utils/routeConstants', () => ({
      artistRoute: { route: '/artists/:artistId/tracks/:trackId' }
    }));
    const trackId = 123;
    const artistId = 122;
    const baseUrl = `feat/ABC-123`;
    const location = window.location;
    delete window.location;
    window.location = {
      pathname: `${baseUrl}/artists/${artistId}/tracks/${trackId}/`
    };
    const { setbaseUrl } = require('../history');
    const bURL = setbaseUrl();
    expect(bURL).toBe(baseUrl);
    window.location = location;
  });
  it('should return the base Url if the pathname consists of / after the path  ', () => {
    process.env.ENVIRONMENT_NAME = 'uat';
    jest.mock('@utils/routeConstants', () => ({
      artistRoute: { route: '/artists/:artistId/tracks/:trackId' }
    }));
    const trackId = 123;
    const artistId = 122;
    const baseUrl = `feat/ABC-123`;
    const location = window.location;
    delete window.location;
    window.location = {
      pathname: `${baseUrl}/artists/${artistId}/tracks/${trackId}/`
    };
    const { setbaseUrl } = require('../history');
    const bURL = setbaseUrl();
    expect(bURL).toBe(baseUrl);
    window.location = location;
  });
});
