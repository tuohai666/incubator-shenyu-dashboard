import React, { Component } from 'react';
import { Modal, Form, Input, Switch } from 'antd';

import { connect } from "dva";
import { getIntlContent } from '../../../utils/IntlUtils';

const FormItem = Form.Item;
const { TextArea } = Input;
@connect(({ global }) => ({
  platform: global.platform
}))

class AddModal extends Component {

  handleSubmit = (e) => {
    const { form, handleOk, id = '' } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleOk({...values, id});
      }
    });
  }

  render() {
    let { handleCancel, form, type = '', dictCode = '', dictName = '', dictValue = '', desc = '', sort = '0', enabled = true } = this.props;

    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        width={450}
        centered
        title={getIntlContent("SHENYU.DIC")}
        visible
        okText={getIntlContent("SHENYU.COMMON.SURE")}
        cancelText={getIntlContent("SHENYU.COMMON.CALCEL")}
        onOk={this.handleSubmit}
        onCancel={handleCancel}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem
            label={getIntlContent("SHENYU.DIC.TYPE")}
            {...formItemLayout}
          >
            {getFieldDecorator('type', {
              rules: [{ required: true, message: getIntlContent("SHENYU.AUTH.INPUT") + getIntlContent("SHENYU.DIC.TYPE") }],
              initialValue: type,
            })(
              <Input placeholder={getIntlContent("SHENYU.DIC.TYPE")} />
            )}
          </FormItem>

          <FormItem
            label={getIntlContent("SHENYU.DIC.CODE")}
            {...formItemLayout}
          >
            {getFieldDecorator('dictCode', {
              rules: [{ required: true, message: getIntlContent("SHENYU.AUTH.INPUT") + getIntlContent("SHENYU.DIC.CODE") }],
              initialValue: dictCode,
            })(
              <Input placeholder={getIntlContent("SHENYU.DIC.CODE")} />
            )}
          </FormItem>
          <FormItem
            label={getIntlContent("SHENYU.DIC.NAME")}
            {...formItemLayout}
          >
            {getFieldDecorator('dictName', {
              rules: [{ required: true, message: getIntlContent("SHENYU.AUTH.INPUT") + getIntlContent("SHENYU.DIC.NAME") }],
              initialValue: dictName,
            })(
              <Input placeholder={getIntlContent("SHENYU.DIC.NAME")} />
            )}
          </FormItem>
          <FormItem
            label={getIntlContent("SHENYU.DIC.VALUE")}
            {...formItemLayout}
          >
            {getFieldDecorator('dictValue', {
              rules: [{ required: true, message: getIntlContent("SHENYU.AUTH.INPUT") + getIntlContent("SHENYU.DIC.VALUE") }],
              initialValue: dictValue,
            })(
              <Input placeholder={getIntlContent("SHENYU.DIC.VALUE")} />
            )}
          </FormItem>
          <FormItem
            label={getIntlContent("SHENYU.DIC.DESCRIBE")}
            {...formItemLayout}
          >
            {getFieldDecorator('desc', {
              initialValue: desc,
            })(
              <TextArea placeholder={getIntlContent("SHENYU.DIC.DESCRIBE")} rows={3} />
            )}
          </FormItem>
          <FormItem
            label={getIntlContent("SHENYU.PLUGIN.SORT")}
            {...formItemLayout}
          >
            {getFieldDecorator('sort', {
              rules: [
                {
                  required: true,
                  message: getIntlContent("SHENYU.AUTH.INPUT") + getIntlContent("SHENYU.PLUGIN.SORT")
                }
              ],
              initialValue: sort,
            })(
              <Input placeholder={getIntlContent("SHENYU.PLUGIN.SORT")} type="number" />
            )}
          </FormItem>
          {/* status */}
          {this.props.isShow?
          (
            <FormItem
              {...formItemLayout}
              label={getIntlContent("SHENYU.SYSTEM.STATUS")}
            >
              {getFieldDecorator('enabled', {
              initialValue: enabled,
              valuePropName: 'checked',
            })(
              <Switch />
            )}
            </FormItem>
          ) : ''}
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AddModal);
