/**
 *
 * TrackDetails
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { Helmet } from 'react-helmet';

import { compose } from 'redux';

export function TrackDetails() {
  return (
    <div>
      <Helmet>
        <title>TrackDetails</title>
        <meta name="description" content="Description of TrackDetails" />
      </Helmet>
      <T id={'TrackDetails'} />
    </div>
  );
}

TrackDetails.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(TrackDetails);

export const TrackDetailsTest = compose(injectIntl)(TrackDetails);
