import { Form, Input, Icon, DatePicker, Button, InputNumber } from 'antd';

const FormItem = Form.Item;

let uuid = 0;
class DynamicFieldSet extends React.Component {

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onClickpublish(values);
      }
    });
  }
  disabledEndDate = (endValue) => {
    const startValue = new Date();
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem 
          {...formItemLayout}
          required={false}
          key={k}
        >
          {getFieldDecorator(`option-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入选项内容或删除选项",
            }],
          })(
            <Input placeholder="投票选项" style={{ width: '40%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
          
        </FormItem>
      );
    });
    return (
      <Form style={{fontFamily: '微软雅黑' }} onSubmit={this.handleSubmit}>
      
        <FormItem label={`主题`}{...formItemLayout} >
            {getFieldDecorator('title')(<Input size='large' placeholder="请输入投票主题" style={{ width: '40%' }} />)}   
        </FormItem >

        <FormItem label={`票数上限`}{...formItemLayout} >
            {getFieldDecorator('hits')(<InputNumber min={1} initialValue={1} size='large'/>)}   
        </FormItem >

        {formItems}
        <FormItem {...formItemLayout}>
          <Button type="dashed" onClick={this.add} >
            <Icon type="plus" /> 新增选项
          </Button>
        </FormItem>
        <FormItem label={`截止时间`}{...formItemLayout}>
          {getFieldDecorator('deadline')(
            <DatePicker disabledDate={this.disabledEndDate}  showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

export default WrappedDynamicFieldSet
