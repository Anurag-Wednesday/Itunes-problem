import { createBrowserHistory } from 'history';
import routeConstants from '@utils/routeConstants';

export const setbaseUrl = () => {
  let baseUrl = '';
  const routes = Object.keys(routeConstants);
  const pathname = window.location.pathname;
  if (process.env.ENVIRONMENT_NAME === 'uat') {
    routes.forEach((routeKey) => {
      let route = routeConstants[routeKey].route;
      const pathnames = pathname.split('/');
      const ids = [];
      let index = 0;
      pathnames.forEach((p) => {
        const num = parseInt(p, 10);
        if (!Number.isNaN(num)) {
          ids.push({ value: p, startIndex: index });
        }

        index += p.length + 1;
      });
      let idCounter = 0;
      while (ids.length && idCounter < ids.length && route.includes(':')) {
        const currentSegmentId = pathname.substring(
          ids[idCounter].startIndex,
          ids[idCounter].startIndex + ids[idCounter].value.length
        );
        const lastIndexOfColon = route.indexOf(':');
        let indexOfSlash = route.length;
        for (let i = lastIndexOfColon; i < route.length; i++) {
          if (route.charAt(i) === '/') {
            indexOfSlash = i;
            break;
          }
        }
        route = route.replace(route.substring(lastIndexOfColon, indexOfSlash), currentSegmentId);
        idCounter++;
      }
      if (pathname.includes(route)) {
        if (pathname.substring(pathname.length - route.length, pathname.length) === route) {
          baseUrl = pathname.substring(pathname.length - route.length);
        }
        if (pathname.substring(pathname.length - route.length - 1, pathname.length) === `${route}/`) {
          baseUrl = pathname.substring(0, pathname.length - route.length - 1);
        }
      }
    });
  }
  return baseUrl;
};

const history = createBrowserHistory(setbaseUrl());
export default history;
