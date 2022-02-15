import React, { memo, useState } from 'react';
import { Steps, Button } from 'antd';
import styled from 'styled-components';
import * as colors from '@app/themes/colors';
import TrackDetailsComponent from '@components/TrackDetailsComponent';
import UploadTrackBaseDetails from '@components/UploadTrackBaseDetails';
import If from '../If/index';
import UploadTrackPropDetails from '@components/UploadTrackPropDetails';
import UploadTrackImage from '@components/UploadTrackImage';
import For from '@components/For';
import { TRACK_CREATION_STEPS } from '@utils/trackCreationUtils';
import T from '@components/T';

const StyledCard = styled.div`
  && {
    background-color: ${colors.background};
    padding: 5rem;
  }
`;

const TrackContainer = styled.div`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.background};
    min-width: 100vw;
    border: 1px solid ${colors.primary};
    min-height: 100vh;
  }
`;

const StyledT = styled(T)`
  && {
    color: ${colors.text};
  }
`;

const { Step } = Steps;

export function UploadTrack() {
  const [data, setData] = useState({});
  const [current, setCurrent] = useState(0);

  const handleOnSubmit = (values) => {
    setData(Object.assign(data, values));
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <StyledCard data-testid="upload-track">
        <For
          parent={<Steps current={current} />}
          of={TRACK_CREATION_STEPS}
          renderItem={(item) => <Step {...(<T id={item.title} />)} />}
        />
        <If condition={current === 0}>
          <UploadTrackBaseDetails handleOnSubmit={handleOnSubmit} />
        </If>
        <If condition={current === 1}>
          <UploadTrackPropDetails handleOnSubmit={handleOnSubmit} />
        </If>
        <If condition={current === 2}>
          <UploadTrackImage handleOnSubmit={handleOnSubmit} />
        </If>
        <If condition={current}>
          <Button data-testid="previous" style={{ margin: '0 8px' }} onClick={() => prev()}>
            <StyledT id="previous" />
          </Button>
        </If>
      </StyledCard>
      <TrackContainer>
        <TrackDetailsComponent {...data} />
      </TrackContainer>
    </>
  );
}

export default memo(UploadTrack);
