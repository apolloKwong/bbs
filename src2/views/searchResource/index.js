import React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Table, Input, Button, Pagination, Tag, Row, Col, Card, Form } from 'antd'
import styles from './index.less'
import { connect } from 'dva'
import { Layout } from 'antd';
import HotTags from '../HotTags.js'
import HotFields from '../HotFields.js'
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card
const TabPane = Tabs.TabPane;
import { createDataForm } from 'utils'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
};

let resourceType = "0"
let field = "0"
const Search = ({ dispatch, searching,
    form: {
        getFieldDecorator,
        getFieldValue,
        }
     }) => {

    const { selectedTags, selectedFields, searchResult, keywordModel, fieldModel, resourceTypeModel,pageM } = searching
    console.log("selectedTags",selectedTags)
    console.log("selectedFields",selectedFields)
    resourceType = selectedTags
    if (!selectedTags) {
        resourceType = "0";
    }
    field = selectedFields
    if (!selectedFields) {
        field = "0";
    }
    const keyword = getFieldValue('keyword')
    const selectFieldsProps = {
        getSelectedFields(data) {
            dispatch({
                type: 'searching/getSelectedFields',
                payload: data
            })

        }
    }
    const selectTagsProps = {
        getSelectedTags(data) {
            dispatch({
                type: 'searching/getSelectedTags',
                payload: data
            })

        }
    }
    function onChangePage(pageNumber) {

        dispatch({
            type: 'searching/search',
            payload: {
                keyword: keywordModel,
                field: fieldModel,
                resourceType: resourceTypeModel,
                page: pageNumber
                // pageSize, 
            }
        })
    }
    const keywordEncode = encodeURIComponent(keyword);
    const fieldEncode = encodeURIComponent(field);
    const resourceTypeEncode = encodeURIComponent(resourceType);
    return (

        <div className={styles.share}>
            <div className={styles.content}>
            <div className={styles.content_list}>
                <HotFields {...selectFieldsProps} />
                <HotTags {...selectTagsProps} />
                </div>
                <div className={styles.search_bar}>
                    <Form>
                        <FormItem>
                            {getFieldDecorator('keyword')(<Input size='large' style={{ width: 590}} />)}
                            {/* 页面刷新时保留input键入值
                            https://reactjs.org/docs/forms.html */}
                            <Link to={`/searchResource/${fieldEncode}/${resourceTypeEncode}/${keywordEncode}`}>
                                <Button type="primary" size="large"  >
                                    搜索
                                </Button>
                            </Link>
                        </FormItem >
                    </Form>
                </div>

                <div className={styles.content_list}>
                    <div style={{ margin: '6px', fontSize: '16px', color: 'black' }}>
                        搜索结果
                    </div>
                </div>
                {
                    _.map(searchResult.data, function (item) {
                        return (
                            <Card key={item.id} bodyStyle={{ color: 'black', fontSize: '14px' }}>
                                <Row >
                                    <Col >
                                        <div>
                                            <Row>
                                                <Col >
                                                    <div style={{ float: 'left' }} >

                                                        <Link target="_blank" to={`/userPostings/resourceDetail/${item.id}`}>
                                                            {item.resourceName}
                                                        </Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })
                }
                <Pagination height='120px'
                    showQuickJumper onChange={onChangePage}
                    current={pageM} total={searchResult.length} />

            </div>
            <div className={styles.side}>
                <div className={styles.plate}>
                <div style={{paddingBottom:'10px'}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link target="_blank" to={`/questionbar/questioning`}>
                    <Button type="primary" size="large" >
                        资源求助
                    </Button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link target="_blank" to={`/resourceUpload`}>
                        <Button type="primary" size="large" >上传资源</Button>
                </Link>
                </div>
                <hr  style={{backgroundColor:'#f7f7f7',height:'2px',border:'none'}}/>
                    <div className={styles.sideTag}>
                        <Link target="_blank" to={`/share/field/1`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>运营管理</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/2`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>产品设计</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/3`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>编程语言</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/4`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>研发管理</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/5`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>云计算/大数据</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/6`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>开源软件</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/7`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>物联网</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/8`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>系统运维</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/9`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>移动开发</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/10`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>前端开发</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/11`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>后端开发</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/12`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>软件测试</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/13`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>架构设计</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/14`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>信息安全</Tag>
                        </Link>
                        <Link target="_blank" to={`/share/field/15`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>敏捷</Tag>
                        </Link>
                    </div></div></div>
        </div>

    )
}
export default connect(({ searching, loading }) => ({ searching, loading }))(createDataForm(Search))