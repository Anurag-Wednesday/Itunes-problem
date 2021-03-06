export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  tracks: {
    route: '/tracks',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  trackDetails: {
    route: '/tracks/:trackId',
    exact: true
  },
  uploadTrack: {
    route: '/tracks/upload/steps',
    exact: true
  }
};
