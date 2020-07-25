//水明，该页面是问题的提问压面，包括问题描述，发表，邀请人回答等功能
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { createDataForm } from 'utils'
import Wangeditor5 from '../../../components/Wangeditor5'
import { Button, Row, Form, Input, Avatar, Select, Tabs, Radio, Icon } from 'antd'
import styles from './index.less'

const FormItem = Form.Item

const Questioning = ({ loading, dispatch,
    form: {
      getFieldDecorator,
        getFieldValue,
        setFieldValue,
        getFormatFieldValue,
}
}) => {

    return (

        <Form>
            <div className={styles.box}>
                <FormItem><br/>
                    <div className={styles.classf}>
                        问题分类：<Input placeholder="问题分类" style={{ width: '280px' }} />
                    </div>
                </FormItem>

                <FormItem><br/>
                    <div className={styles.questioning}>
                        <div className={styles.description}>问题描述：  </div>                     
                        <div className={styles.editor}><Wangeditor5/></div>                  
                    </div>
               
                    <div className={styles.operator}>  
                        <Button type="primary" style={{ left:'80px',background:'#fff',top:'-8px'}}> <a style={{ fontSize: 16}}><Icon type="star"style={{ fontSize: 16, }} /> 悬赏积分</a></Button>
                        <Button type="primary" style={{ left:'160px',background:'#fff',top:'-8px'}}> <a style={{ fontSize: 16, }}>@ 请他回答</a></Button>                     
                        <Button type="primary" style={{ left:'300px',width:'130px',height:'40px',fontSize:'22px',fontFamily:'微软雅黑'}} >提交问题</Button>                     
                        </div>
                </FormItem>
            </div>
        </Form>

    )
}
Questioning.PropTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}


export default connect(({ loading, }) => ({ loading, }))(createDataForm(Questioning))


