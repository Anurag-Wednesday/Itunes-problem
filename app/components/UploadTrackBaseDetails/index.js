import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { colors } from '@app/themes/index';
import T from '@components/T';

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

const UploadTrackBaseDetails = ({ handleOnSubmit }) => {
  const onFinish = (values) => {
    handleOnSubmit(values);
  };
  return (
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
        label={<T id="input-track" />}
        name="trackName"
        rules={[{ required: true, message: <T id="input-track" /> }]}
      >
        <StyledInput data-testid="track-input" />
      </StyledFormItem>
      <StyledFormItem
        label={<T id="input-artist" />}
        name="artistName"
        rules={[{ required: true, message: <T id="input-artist" /> }]}
      >
        <StyledInput data-testid="artist-name" />
      </StyledFormItem>
      <StyledFormItem
        label={<T id="input-collection" />}
        name="collectionName"
        rules={[{ required: true, message: <T id="input-collection" /> }]}
      >
        <StyledInput data-testid="collection-name" />
      </StyledFormItem>
      <StyledFormItem wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" data-testid="submit">
          <T id="next" />
        </Button>
      </StyledFormItem>
    </Form>
  );
};

UploadTrackBaseDetails.propTypes = {
  handleOnSubmit: PropTypes.func
};

export default UploadTrackBaseDetails;
