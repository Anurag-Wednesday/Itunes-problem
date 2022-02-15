import React from 'react';
import { Button, Form, Upload } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UploadOutlined } from '@ant-design/icons';
import * as colors from '@app/themes/colors';
import T from '@components/T';

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

const UploadTrackImage = ({ uploadProps }) => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: false }}
      autoComplete="on"
    >
      <StyledFormItem
        label={<T id="input-artwork" />}
        name="artWorkUrl100"
        rules={[{ required: true, message: <T id="input-artwork" /> }]}
      >
        <Upload {...uploadProps}>
          <Button id="upload" data-testid="upload" icon={<UploadOutlined />}>
            <T id="upload_text" />
          </Button>
        </Upload>
      </StyledFormItem>
      <StyledFormItem wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" data-testid="submit">
          <T id="submit" />
        </Button>
      </StyledFormItem>
    </Form>
  );
};

UploadTrackImage.propTypes = {
  uploadProps: PropTypes.object
};
export default UploadTrackImage;
