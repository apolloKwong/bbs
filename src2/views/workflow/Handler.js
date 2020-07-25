import {Tree,Button} from 'antd'
import PropTypes from 'prop-types'
import { l2t } from 'utils'
import _ from 'lodash'
import UserPop from './UserPop'
import GroupUserPop from './GroupUserPop'
import {Popover} from 'antd'

class Handler extends React.Component{

    constructor(props){
        super(props);
        this.state=({
            handler:{},
        });
    }

    buildUsers(users){
        users = _.map(users,(item)=>{
			return <UserPop key={'U' + item.id}  user={item}  trigger="click" />
		});
		return this.join(users);
    }
    buildGroups(groups){
		groups = _.map(groups,(item)=>{
			return <GroupUserPop key={'G' + item.id} group={item} trigger="click"/>
		});
		return this.join(groups);
    }
    join(items){
		return _.slice(_.flatMap(items,(item)=>{return [item,',']}), 0, items.length * 2 - 1)
    }

    render() {
        const {groups,users} = this.props.handler;
			if(!groups && !users){
				return null;
			}
			return <span>
					{this.buildUsers(users)}
					{users.length && groups.length ? "|" : ""}
					{this.buildGroups(groups)}
				</span>
    }

}
Handler.propTypes = {
    handler: PropTypes.object,
}

export default Handler