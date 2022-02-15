import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Form, Input, DatePicker } from 'antd';
import { colors } from '@app/themes/index';
import { T } from '../T/index';

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

const StyledInput = styled(Input)`
  && {
    width: 25rem;
  }
`;

const UploadTrackPropDetails = ({ handleOnSubmit }) => {
  const onFinish = (values) => {
    handleOnSubmit(values);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: false }}
      autoComplete="on"
      onFinish={onFinish}
    >
      <StyledFormItem
        label={<T id="input-genre" />}
        name="primaryGenreName"
        rules={[{ required: true, message: <T id="input-genre" /> }]}
      >
        <StyledInput data-testid="genre-input" />
      </StyledFormItem>
      <StyledFormItem
        label={<T id="input-genre" />}
        name="country"
        rules={[{ required: true, message: <T id="input-country" /> }]}
      >
        <StyledInput data-testid="country-input" />
      </StyledFormItem>
      <StyledFormItem
        label={<T id="input-date" />}
        name="releaseDate"
        rules={[{ required: false, message: <T id="input-date" /> }]}
      >
        <DatePicker />
      </StyledFormItem>
      <StyledFormItem wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" data-testid="submit">
          <T id="next" />
        </Button>
      </StyledFormItem>
    </Form>
  );
};

UploadTrackPropDetails.propTypes = {
  handleOnSubmit: PropTypes.func
};

export default UploadTrackPropDetails;
