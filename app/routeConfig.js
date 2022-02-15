import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import SearchContainer from '@app/containers/ItunesProvider/SearchContainer/Loadable';
import HomeContainer from './containers/HomeContainer/Loadable';
import TrackDetailsContainer from './containers/ItunesProvider/TrackDetailsContainer/Loadable';
import UploadTrack from '@app/components/UploadTrack/index';

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
  uploadTrack: {
    component: UploadTrack,
    ...routeConstants.uploadTrack
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
