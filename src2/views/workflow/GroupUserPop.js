import {Popover} from 'antd'
import PropTypes from 'prop-types'
import { l2t } from 'utils'
import FontAwesome from 'react-fontawesome'
import Overlay from './Overlay'
import styles from './workflow.less'

class GroupUserPop extends React.Component{

    constructor(props){
        super(props);
        this.state=({
           visible:false,
        });
    }
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }
    hide = () => {
        this.setState({ visible: false });
    }
    title(groupName){
        return <div>{groupName+"用户组成员信息："}
                    <div className={styles.ant_popover_close} onClick={this.hide}>
                        <FontAwesome name="close" />
                    </div>
                </div>;
    }
    render(){
        const {group,trigger}=this.props;
        return <Popover closeClick={this.closeClick} visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                content={<Overlay groupId={group.id} />}  
                title={this.title(group.idName)} trigger={trigger}>
                <a>{group.idName}</a>
            </Popover>
    }

}

GroupUserPop.propTypes = {
    visible: PropTypes.bool
}

export default GroupUserPop