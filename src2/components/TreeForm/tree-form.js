import React from 'react'
import PropTypes from 'prop-types'
import { Tree,Button,Popconfirm,Card,Row, Col, Spin, message } from 'antd'
import Scrollbars from 'components/scrollbars';
import { routerRedux } from 'dva/router'
import { l2t, goBack, i18n } from 'utils'
import _ from 'lodash'
import styles from './z-tree.less'

const ButtonGroup = Button.Group
const TreeNode = Tree.TreeNode

const Nav = React.createClass({
    propTypes: {
        onSelect: PropTypes.func.isRequired,
        dataSource: PropTypes.array,
        orderBy: PropTypes.func,
        idKey: PropTypes.string,
        parentKey: PropTypes.string,
        nameKey: PropTypes.string,
        snKey: PropTypes.string,
        expandedKeys: PropTypes.array,
        defaultExpandAll:PropTypes.bool,
        expandedLevel: PropTypes.number,
        queryFilter:PropTypes.object,
        checkable:PropTypes.bool,
    },
    getInitialState() {
        return {
            selectedKeys:[]
        };
    },
    onSelect(selectedKeys) {
        var key = selectedKeys[0] || this.selectedKeys;
        if(selectedKeys.length > 0){
            this.selectedKeys = selectedKeys[0]
        }
        this.props.onSelect(key);
    },
    render() {
        const {dataSource,idKey,parentKey,nameKey,expandedKeys,expandLevel,selectedKeys,checkable} = this.props;
        const loop = (data,level) => data.map((item) => {
              if (item.children) {
                if(level < expandLevel){
                    expandedKeys.push("" + item[idKey]);
                }
                return <TreeNode title={item[nameKey]} key={item[idKey]}>{loop(item.children,level + 1)}</TreeNode>;
              }
              return <TreeNode title={item[nameKey]} key={item[idKey]} isLeaf={true} />;
        });
        const treeData = l2t(dataSource,{key_id:idKey,key_parent:parentKey});
        const treeNodes = loop(treeData,0);
        return (<Tree 
                checkable={checkable}
                showIcon={false}
                showLine
                selectedKeys={selectedKeys}
                onSelect={this.onSelect} 
                defaultExpandedKeys={expandedKeys}>
            {treeNodes}
          </Tree>
        );
    },
});

const TreeForm = React.createClass({
    propTypes: {
        onCreate:PropTypes.func.isRequired,
        orderBy:PropTypes.func,
        idKey:PropTypes.string,
        parentKey:PropTypes.string,
        nameKey:PropTypes.string,
        snKey:PropTypes.string,
        type:PropTypes.string,
        showReturn:PropTypes.bool,
        expandedKeys:PropTypes.array,
        defaultExpandAll:PropTypes.bool,
        expandLevel:PropTypes.number,
        checkable:PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            height:400,
            showReturn: false,
            root: {
                id: 0,
                name: 'Root',
                sn: 0
            },
            
            idKey: 'id',
            parentKey: 'parentId',
            nameKey: 'name',
            snKey: 'sn',
            expandedKeys: ['0'],
            expandLevel: 1,
            defaultExpandAll:false,
            selectedKeys:[],
            orderBy: function(treeData) {
                return _.orderBy(treeData, ['sn'], ['asc']);
            },
            checkable:false,
        }
    },

    getInitialState: function() {
         return {
                newItem: {},
                edit:true,
                add:false,
                del:true,
             };
    },

    onSelect: function(id){
        const { location, dispatch ,currentItem} = this.props
        const { pathname } = location
        dispatch(routerRedux.push({
            pathname,
            query: {
                id
            },
        }))
            this.setState({add:false, edit:true})
    },
    onCreate:function(){
        let {currentItem} = this.props;
        const result = this.props.onCreate(currentItem);
            this.setState({add: true, edit:false, newItem: result});
        
    },
    
    //调用l2t先构建一棵树，然后执行_.map方法遍历该树。首先找到选中节点的item，将该id存入ids数组中，然后设find为true.
    //如果选中的该节点有子树，将子树的所有节点的id存于ids数组中，find为true表示该节点为选中的节点，为false表示不是选中的节点。
    
    collectIdsRecursiveById:function(pid){
        const {idKey,parentKey,nameKey,dataSource} = this.props;
        const data = l2t(dataSource,{key_id:idKey,key_parent:parentKey});
        const ids = [];
        const loop = (data,find) => _.map(data,(item) => {
              if(find){
                  if (item.children) {
                       loop(item.children,find);
                  }
                  ids.push(item[idKey])
              }else{
                  if(item[idKey] == pid){
                      ids.push(item[idKey])
                      loop(item.children,true);
                  }
                  if (item.children) {
                       loop(item.children,false);
                  }
              }
              
        });
        loop(data,false);
        return ids;
    },
    
    onDelete:function(){
        const id = this.props.selectedKeys[0]
        const ids = this.collectIdsRecursiveById(id)
        this.props.onDelete(ids)
    },
    
    render: function() {
        const {Form,service,idKey,parentKey,nameKey,snKey,root,orderBy,currentItem,isSingle,defaultExpandAll,
            expandLevel,expandedKeys,selectedKeys,showReturn,queryFilter,height,dataSource,dispatch,checkable,loading} = this.props;
        var {edit, add, del} = this.state;
        return(
        <div className={styles.treeform}>
            <Row>
              <Col span={24}>
                  <ButtonGroup size='small' style={{padding:5}} >
                  <Button onClick={this.onCreate} disabled={(currentItem == null&&isSingle!==true)||(currentItem!==null&&isSingle===true)}>{i18n('btn.cmn.add')}</Button>
                      <Popconfirm title="确定要删除当前节点吗？" onConfirm={this.onDelete}>
                        <Button disabled={currentItem == null}>{i18n('btn.cmn.delete')}</Button>
                      </Popconfirm>
                      {showReturn && <Button onClick={goBack}>{i18n('btn.cmn.return')}</Button>}
                  </ButtonGroup>
              </Col>
            </Row>
            <Row>
              <Col span={8} className="gutter-row" style={{paddingRight:5}}>
                <Card>
                    <Scrollbars style={{height}}>
                        <Nav ref="nav" 
                            dataSource={dataSource}
                            selectedKeys={selectedKeys}
                            idKey={idKey} 
                            root={root} 
                            orderBy={orderBy} 
                            parentKey={parentKey} 
                            nameKey={nameKey} 
                            snKey={snKey} 
                            expandedKeys={expandedKeys}
                            defaultExpandAll={defaultExpandAll} 
                            expandLevel={expandLevel}
                            onSelect={this.onSelect}
                            queryFilter={queryFilter}
                            checkable={checkable}
                            />
                    </Scrollbars>
                </Card>
              </Col>
              <Col span={16}>
                  <Card>
                    <Scrollbars style={{height}}>
                    <div>
                        {(currentItem && (edit || add))?<Spin spinning={loading}><Form ref='Form' data={add?this.state.newItem:currentItem} type={add?"add":"edit"} dispatch={dispatch}/></Spin>:null}                          
                    </div>
                    </Scrollbars>
                  </Card>
              </Col>
            </Row>
        </div>)
    }
});

export default TreeForm