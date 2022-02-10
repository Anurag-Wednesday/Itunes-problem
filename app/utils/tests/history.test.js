import { setbaseUrl } from '../history';
import routeConstants from '@utils/routeConstants';

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
    expect(setbaseUrl(baseUrl)).toEqual('');
  });
  it('should set the base path according to the routes in uat', () => {
    process.env.ENVIRONMENT_NAME = 'uat';
    setbaseUrl(baseUrl);
    expect(baseUrl).toBe('');
  });
  it('should set the base path according to the routes -1 ', () => {
    process.env.ENVIRONMENT_NAME = 'uat';
    const trackId = 123;
    const baseUrl = `feat/ABC-123`;
    const location = window.location;
    delete window.location;
    window.location = {
      pathname: `${baseUrl}/tracks/${trackId}`
    };
    const bURL = setbaseUrl();
    expect(bURL).toBe(baseUrl);
    window.location = location;
  });
});
