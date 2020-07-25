import {Popover,Table,Row} from 'antd'
import PropTypes from 'prop-types'
import { l2t } from 'utils'
import FontAwesome from 'react-fontawesome'
import styles from './workflow.less'
import * as workflowSvc from 'services/workflow/workflow'

const columns = [
  	    {
  			title: '账户',
  			dataIndex: 'acount',
  			width:90,
  		}, {
  			title: 'Emai',
  			dataIndex: 'email',
  			width:190,
  		}, {
  			title: '姓名',
  			dataIndex: 'lastname',
  			width:90,
  		},{
  			title: '联系方式',
              dataIndex: 'phone',
              width:100,
  		}
  	];

class Overlay extends React.Component{

    constructor(props){
        super(props);
        this.state=({
           dataSource: [],
        });
    }

    componentWillMount(){
        const {groupId} = this.props;
        workflowSvc.getUsersByGroup(groupId).then(function (result) {
            if(result!=null && result.length!=0){
                workflowSvc.getUsers(result.data.join(",")).then(function(dataSource) {
                    if(dataSource != null){
                        dataSource = dataSource.data.map(item=>{
                            item["key"]=item.id
                            return item;
                        })
                    }
                    this.setState({dataSource:dataSource});
                }.bind(this));
            }
        }.bind(this));

    }

    render() {
        const {dataSource} = this.state;
			return <div>
					    <div>
                            <Table scroll={{x:false,y:180}}
                                size="small" 
                                style={{width:500,height:220}} 
                                pagination={false} 
                                columns={columns} 
                                dataSource={dataSource} /> 
				        </div>
                    </div>;
    }

}

Overlay.propTypes = {
}

export default Overlay