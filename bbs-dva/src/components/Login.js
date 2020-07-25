import React from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Form, Input, Icon, Alert, notification } from 'antd'
import { createDataForm, rpc } from 'utils'

const user = rpc('security')

const FormItem = Form.Item

class navLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadding:false,
            error:false,
            text:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    static contextTypes = {
       form: PropTypes.object,
    }
    
    handleSubmit(e) {
      e.preventDefault();
      this.setState({error:false});
      const {form} = this.context;
        form.validateFields((errors, values) => {
            if (!!errors) {
              return;
            }
            var values = form.getFormatFieldsValue();
            
            user.path('post','ajaxLogin',values).then(({data})=>{
                if (data.status == 200) {// 登录成功
                    //Resource.fire('login',this.props.reloadUrl);
                    notification.close('login');
                    return;
                }
                var text;
                if (data.status == 400) {// 账号密码错误
                    text = "账号不存在或密码错误";
                }else{// 其他情况
                    text = "服务器忙,稍后再试";
                }
                this.setState({error:true,text:text});
            });
      });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout='horizontal' onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username',{
              rules: [{ required: true, message: '输入账号!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="输入账号" disabled />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
              rules: [{ required: true, message: '输入密码!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="输入密码" />
          )}
        </FormItem>
        {this.state.error && <Alert message={this.state.text} type="error" />}
        <Button type="primary" htmlType="submit" style={{width: '100%'}}>登录</Button>
      </Form>
    );
  }
}
          
          
const NavLogin = createDataForm(navLogin,'user')          
          
function showLogin(user,reloadUrl) {
    const args = {
       key:"login",
       message: '登录',
       description: <NavLogin user={user} reloadUrl={reloadUrl}/>,
       duration: 0,
     };
     notification.open(args);
}          
          
export default showLogin