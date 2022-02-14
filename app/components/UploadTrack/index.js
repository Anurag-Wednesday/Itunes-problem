import React, { memo, useState } from 'react';
import { Steps, Button, Form, Input, DatePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import * as colors from '@app/themes/colors';
import { TrackDetailsComponent } from '../TrackDetailsComponent/index';

const StyledCard = styled.div`
  && {
    background-color: ${colors.background};
    padding: 5rem;
  }
`;

const StyledInput = styled(Input)`
  && {
    width: 25rem;
  }
`;

const StyledFormItem = styled(Form.Item)`
  && {
    margin: 2rem;
    color: ${colors.whiteText};
    wrapper
  }
  .ant-form-item-required {
    color: ${colors.whiteText};
    font-size: 1rem;
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

const { Step } = Steps;

export function UploadTrack() {
  const [data, setData] = useState({});
  const [current, setCurrent] = useState(0);
  const onFinish = (values) => {
    setData(Object.assign(data, values));
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const contentOne = () => {
    return (
      <>
        <Form
          data-testid="form"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          autoComplete="on"
          onFinish={onFinish}
        >
          <StyledFormItem
            label={<FormattedMessage id="input-track" />}
            name="trackName"
            rules={[{ required: true, message: <FormattedMessage id="input-track" /> }]}
          >
            <StyledInput data-testid="track-input" />
          </StyledFormItem>

          <StyledFormItem
            label={<FormattedMessage id="input-artist" />}
            name="artistName"
            rules={[{ required: true, message: <FormattedMessage id="input-artist" /> }]}
          >
            <StyledInput data-testid="artist-name" />
          </StyledFormItem>
          <StyledFormItem
            label={<FormattedMessage id="input-collection" />}
            name="collectionName"
            rules={[{ required: true, message: <FormattedMessage id="input-collection" /> }]}
          >
            <StyledInput data-testid="collection-name" />
          </StyledFormItem>
          <StyledFormItem wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" data-testid="submit">
              Next
            </Button>
          </StyledFormItem>
        </Form>
      </>
    );
  };

  const contentTwo = () => {
    return (
      <>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          autoComplete="on"
          onFinish={onFinish}
        >
          <StyledFormItem
            label={<FormattedMessage id="input-genre" />}
            name="primaryGenreName"
            rules={[{ required: true, message: <FormattedMessage id="input-genre" /> }]}
          >
            <StyledInput data-testid="genre-input" />
          </StyledFormItem>
          <StyledFormItem
            label={<FormattedMessage id="input-genre" />}
            name="country"
            rules={[{ required: true, message: <FormattedMessage id="input-country" /> }]}
          >
            <StyledInput data-testid="country-input" />
          </StyledFormItem>
          <StyledFormItem
            label={<FormattedMessage id="input-date" />}
            name="releaseDate"
            rules={[{ required: false, message: <FormattedMessage id="input-date" /> }]}
          >
            <DatePicker />
          </StyledFormItem>
          <StyledFormItem wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" data-testid="submit">
              Next
            </Button>
          </StyledFormItem>
        </Form>
      </>
    );
  };

  const contentThree = () => {
    return (
      <>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          autoComplete="on"
          onFinish={onFinish}
        >
          <StyledFormItem
            label={<FormattedMessage id="input-date" />}
            name="artWorkUrl100"
            rules={[{ required: true, message: <FormattedMessage id="input-date" /> }]}
          >
            <Upload data-testid="upload">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </StyledFormItem>
          <StyledFormItem wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" data-testid="submit">
              Submit
            </Button>
          </StyledFormItem>
        </Form>
      </>
    );
  };
  const content = [contentOne, contentTwo, contentThree];

  return (
    <>
      <StyledCard data-testid="upload-track">
        <Steps current={current}>
          <Step />
          <Step />
          <Step />
        </Steps>
        <div className="steps-content">{content[current]()}</div>
        <div className="steps-action">
          {current > 0 && (
            <Button data-testid="previous" style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </StyledCard>
      <TrackContainer>
        <TrackDetailsComponent {...data} />
      </TrackContainer>
    </>
  );
}

UploadTrack.propTypes = {};

export default memo(UploadTrack);
