import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { createDataForm } from 'utils'
import { Button, Row, Form, Input, Avatar, Select, Tabs, Radio, Icon } from 'antd'
import styles from './index.less'



const FormItem = Form.Item

const Searching = ({ loading, dispatch,
    form: {
      getFieldDecorator,
        getFieldValue,
        setFieldValue,
        getFormatFieldValue,
    }
}) => {

    const Search = Input.Search

    return (

        <Form>
            <FormItem >
                <div className={styles.search_box}  >
                    <br />
                    <p>
                        <span style={{ color: '#33FF00' }}>&nbsp;&nbsp;&nbsp;&nbsp;难道我的问题已经有人提前问过了 ? </span>
                        <span style={{ color: '#FF0000' }}>&nbsp;&nbsp;搜一搜</span>
                        <span style={{ color: '#33ff00' }}> &nbsp;&nbsp;看看大家都关心些什么 ？</span>
                    </p>
                    <br />
                    <div className={styles.search}>
                        {
                            <div>
                                <Search placeholder="索搜你的问题" size="large" style={{ width: '40%', left: '10%' }} />
                                <Button type="primary" size="large" style={{ left: '10%' }} ><a href="/questionbar/questionsearching">搜 &nbsp;索</a></Button>

                                <Button type="primary" size="large" style={{ left: '15%' }} ><a href="/questionbar/questioning">我要提问</a></Button>
                            </div>}
                    </div>

                </div >
            </FormItem >
        </Form >

    )
}
Searching.PropTypes = {

    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}


export default connect(({ loading, }) => ({ loading, }))(createDataForm(Searching))