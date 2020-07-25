import {Popover,Row} from 'antd'
import PropTypes from 'prop-types'
import { l2t } from 'utils'

class UserOverlay extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        const {user} = this.props;
			return <div style={{width:300}}>
				<Row><span>姓名：</span><span>{user.idLastName}</span></Row>
				<Row><span>账户：</span><span>{user.idAcount}</span></Row>
				<Row><span>邮箱：</span><span>{user.idEmail}</span></Row>
				<Row><span>联系方式：</span><span>{user.phone}</span></Row>
			</div>;
    }

}

UserOverlay.propTypes = {
}

export default UserOverlay