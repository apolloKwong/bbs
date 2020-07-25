import React from 'react'
import PropTypes from 'prop-types'
import { Table,Button,Icon } from 'antd'
import { request } from 'utils'
import _ from 'lodash'
import styles from './Datagrid.less'

  const rownumberColumn = {
        title: '',
        dataIndex: 'id',
        className : styles.rownumber,
        render(id,row,index) {
          return <span>{index + 1}</span>;
        } 
  };

   const Header = ({ title }) => {
       if (title === "" || title === undefined) {
           return null;
       } else {
           return (
        		<div className={styles.gridHead}>
			        <div className={styles.gridTitle}>
			        	{title}
			        </div>
                </div>
            );
       }
   }
  
   const Toolbar = ({ toolbar = [] }) => {
       if(_.size(toolbar)){
           return (<div className="grid-toolbar">
                   <table style={{cellspacing:0,cellpadding:0}}><tbody><tr>
                       {
                           _.map(toolbar,function(value,key){
                               let bar;
                               if(value === '-'){
                                   bar = <span className='btn-separator' /> ;
                               }else if(React.isValidElement(value)){
                                   bar = value;
                               }else{
                                   bar = (<Button type='grid' disabled={!!value.disabled} onClick={value.handler}>
                                           {value.icon ? <Icon type={value.icon} /> : ''}
                                           <span>{value.text}</span>
                                         </Button>)
                               }
                               return <td key={key}>{bar}</td>;
                           })
                       }
                       </tr></tbody></table>
           </div>);
       }
       return null
   }
  
  
  class Grid extends React.Component {
      constructor(props) {
          super(props);
          this.onRowClick = this.onRowClick.bind(this);
          this.rowClassName = this.rowClassName.bind(this);
          this.queryReset = this.queryReset.bind(this);
          this.querySubmit = this.querySubmit.bind(this);
      }
      
      static propTypes = {
          rownumbers: React.PropTypes.bool,
          singleSelect: React.PropTypes.bool,
          checkOnSelect: React.PropTypes.bool,//FIXME:
          selectOnCheck: React.PropTypes.bool,//FIXME:
          highlight: React.PropTypes.bool,//点击高亮
          pageSize: React.PropTypes.number,
          toolbar: React.PropTypes.array,
          title: React.PropTypes.string,
          rowSelection:React.PropTypes.object,
          rowKey:React.PropTypes.string,
          QForm:React.PropTypes.func,
          queryReset:React.PropTypes.func,
          querySubmit:React.PropTypes.func,
          onRowClick:React.PropTypes.func,
      }
      
      static defaultProps = {
          singleSelect:true,
          checkOnSelect:true,
          selectOnCheck:true,
          highlight:false,
          rownumbers : true,
          pageSize : 10,
          current: 1,
          qs : null,
          toolbar:[],
          rowKey:'id',
          querySubmit:_.noop,
          queryReset:_.noop,
          onRowClick:_.noop,
          title:'',
      }
      
      
      onRowClick(record,index) {
          const {singleSelect,rowKey,onRowClick,highlight} = this.props;
          const id = record[rowKey];
          onRowClick(record,index);
          if(highlight){
              if(singleSelect){
                  this.setState({selected:[id]});
              }else{
                  let selected = [...this.state.selected];
                  let index = _.indexOf(selected,id);

                  if(index >= 0){
                      selected.splice(index, 1);
                  }else{
                      selected.push(id);
                  }
                  this.setState({selected});
              }
          }
      }
      
      rowClassName(record,index) {
          const {rowKey,rowClassName,selected} = this.props;
          let className = _.indexOf(selected,record[rowKey]) >=0 ?'ant-grid-row-selected':''
          if(rowClassName){
              className = className +　" " + rowClassName(record,index)
          }
          return className;
      }
    
      queryReset(e){
          const {queryReset} = this.props;
          if(queryReset(e) !== true){
              this.refs.qform.resetFields();
          }
      }
      querySubmit(e) {
          e.preventDefault();
          const {service,querySubmit} = this.props;
          if(querySubmit(e) !== true){
              const qs = this.refs.qform.getFormatFieldsValue();
              this.state.qs = qs
              service.refresh();
          }
          
      }
      render() {
          const {rowKey,rownumbers,
                  columns,title,toolbar,rowSelection,
                  QForm,...props} = this.props;
          
          if (rownumbers) {
              columns.unshift(rownumberColumn);
          }        
          let Form = null;
          if(QForm){
              Form = (<div className="grid-form">
                  <QForm ref="qform" querySubmit={this.querySubmit}>
                      <Button type="primary" htmlType="submit" size='small'>查询</Button>&nbsp;
                      <Button onClick={this.queryReset} size='small'>重置</Button>
                  </QForm>
              </div>);
          }
          return (
              <div className="ant-grid">
                  {QForm && Form}
                  <div>
                      <Header title={title} />
                      <Toolbar toolbar={toolbar} />
                      <Table 
                      size="small"
                      bordered
                      {...props} 
                      rowKey={function(record){return record[rowKey]}}
                      columns={columns}
                      rownumbers={rownumbers}
                      rowClassName={this.rowClassName}
                      onRowClick={this.onRowClick}
                      renderColumns={this.renderRowNumberColumns}/>
                   </div>
              </div>
          );
      }
  }   
export default Grid
