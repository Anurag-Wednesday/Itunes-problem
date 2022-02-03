import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import SearchContainer from '@containers/SearchContainer/Loadable';
import HomeContainer from './containers/HomeContainer/Loadable';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  tracks: {
    component: SearchContainer,
    ...routeConstants.tracks
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
