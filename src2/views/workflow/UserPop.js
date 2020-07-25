import {Popover} from 'antd'
import PropTypes from 'prop-types'
import { l2t } from 'utils'
import FontAwesome from 'react-fontawesome'
import UserOverlay from './UserOverlay'
import styles from './workflow.less'

class UserPop extends React.Component{

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
    title(userAcount){
        return (<div>{ userAcount + "用户详细信息："}
                    <div className={styles.ant_popover_close} onClick={this.hide}>
                        <FontAwesome name="close" />
                    </div>
                </div>);
    }

    render() {
        const {user,trigger}=this.props;
        return (
            <Popover visible={this.state.visible} 
                     onVisibleChange={this.handleVisibleChange}
                     content={<UserOverlay user={user}/>} 
                     title={this.title(user.idAcount)} 
                     trigger={trigger}>
                        {/* <a>{user.idAcount}</a> */}
                        <a>{user.idLastName}</a>
            </Popover>
         );
    }

}

UserPop.propTypes = {
    visible: PropTypes.bool
}

export default UserPop