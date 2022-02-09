import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import SearchContainer from '@app/containers/ItunesProvider/SearchContainer/Loadable';
import HomeContainer from './containers/HomeContainer/Loadable';
import TrackDetailsContainer from './containers/ItunesProvider/TrackDetailsContainer/Loadable';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  tracks: {
    component: SearchContainer,
    ...routeConstants.tracks
  },
  trackDetails: {
    component: TrackDetailsContainer,
    ...routeConstants.trackDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
