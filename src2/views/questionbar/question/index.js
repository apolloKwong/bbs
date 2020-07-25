// 说明，这个页面对应问吧页面,
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { createDataForm } from 'utils'
import { Button, Row, Form, Input, Avatar, Select, Tabs, Radio, Icon } from 'antd'
import Searching from './Searching.js'
import HotAndClassification from './HotAndClassification.js'
import MostBrain from './MostBrain.js'
import Share from './Share.js'
import styles from './index.less'

const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Option = Select.Option
const Questions = ({ loading, dispatch,question}) => {
    let {questionpayload,} = question
    const Search = Input.Search
    const classificationPros = {}
    return (
         <div>          
                <Searching />
                <HotAndClassification questionList = {questionpayload}    {...classificationPros}/>
                <MostBrain />
                <Share/>
        </div>
    )
}
Questions.PropTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}


export default connect(({ loading,question }) => ({ loading,question }))(Questions)


