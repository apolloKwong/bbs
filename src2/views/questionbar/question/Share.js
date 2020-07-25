import React, { Component } from 'react';
import { connect } from 'dva'
import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { createDataForm } from 'utils'
import { Button, Row, Form, Input, Avatar, Select, Tabs, Radio, Icon,Tag} from 'antd'
import styles from './index.less'



const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Option = Select.Option


class Share extends Component {
 
  render() {
  
    return (
     
        <div className={styles.share}> <br/> <br/>
       <img src={require('../../../views/images/首页/1.jpg')} alt="" style={{width:'100%',height:'250px'}}/>
      </div>
    );
  }
}



export default Share