import React from 'react'
import PropTypes from 'prop-types'
import { Input, Select, Button, Form } from 'antd'
import Lookup from '../../components/Lookup'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import styles from './index.less'
import Wangeditor from '../../components/Wangeditor'
import { createDataForm } from 'utils'

const FormItem = Form.Item
const Writearticle = ({ loading, writing, dispatch, location,
  form: {
      getFieldDecorator,
    getFieldValue,
    setFieldValue,
    getFormatFieldValue,
    }
}) => {

  const { richValue, authInfo } = writing
  const editorProps = {
    getValue(value) {
      dispatch({
        type: 'writing/getRichValue',
        payload: value,
      })
    }
  }
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };

  const onClickpublish = () => {
    const articlename = getFieldValue('articlename')
    const category = getFieldValue('platename')
    const name = category[0]
    const postdate = getNowFormatDate()

    function getNowFormatDate() {
      var date = new Date();

      return date;
    }
    const data = {}
    data.content = richValue
    data.sort = 1
    data.postDate = postdate
    data.hits = 0
    data.top = 0
    data.plateName = name
    data.userId = authInfo.data.userId
    data.postState = 1
    data.articleName = articlename

    dispatch({
      type: 'writing/create',
      payload: data
    })
    dispatch(routerRedux.push({
      pathname: '/userPostings',
    }))

  }


  return (
    <div className={styles.writearticle}>
      <Form layout="horizontal">
        <br />
        <FormItem  {...formItemLayout} >
          <div className={styles.plate}>
            <Button size="large" >请选择所属板块</Button>
            {getFieldDecorator('platename')(<Lookup groupCode="category" size='large' placeholder="所属板块" style={{ width: 260, }} />)}
          </div>
        </FormItem >

        <FormItem {...formItemLayout} > <br /><br />
          <div className={styles.title}>
            {getFieldDecorator('articlename')(<Input size='large' placeholder="请输入文章标题" style={{ width: 390, }} />)}
          </div>
        </FormItem ><br /><br /><br />

        <FormItem >
          <Wangeditor {...editorProps} />
        </FormItem >

        <FormItem  {...formItemLayout} >
          <div className={styles.operate}>
            <Button type="primary" size="large">存草稿</Button> <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                           </span>
            <Button type="primary" size="large" onClick={onClickpublish}>发 布</Button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                       
            <Button type="primary" size="large" ><a href="/home">返回主页</a></Button>
          </div>
        </FormItem >

      </Form>
    </div>
  )
}
Writearticle.PropTypes = {
  writing: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading, writing }) => ({ loading, writing }))(createDataForm(Writearticle))





