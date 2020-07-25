import { Cascader } from 'antd';
import { list } from 'services/lookup'
import { l2t } from 'utils'
const Lookup = React.createClass({
		
    getInitialState:function(){
        return {
            options : [],
        }
    },
    formatter:function(value){
        return _.isArray( value ) ? _.join( value, "," ) : value;
	},
    loadLookUpData:function(groupCode){
        list(groupCode).then(({data})=>{
            const options = data.map((item)=>{
                return {
                    id:item.id,
                    value:item["code"],
                    label:item["desp"],
                    parentId:item["parentId"],
                    isLeaf:item["leaf"]
                };
            });
            this.setState({options:l2t(options)});
        });
    },
    componentWillMount:function(){
        const {groupCode} = this.props;
        
        if(groupCode){
            this.loadLookUpData(groupCode);
        }
    },
    componentWillReceiveProps:function(nextProps){
        if(nextProps.groupCode != this.props.groupCode){
            const groupCode = nextProps.groupCode;
            if(groupCode){
                this.loadLookUpData(groupCode);
            }
        }
    },
    toArray:function(value){
        if(_.isNumber(value) || _.isString(value)) {
            return _.split(value, ',');
        }
        return value;
    },
    
    render:function(){
        const options= l2t(this.state.options);
        const otherProps = _.omit(this.props, ['groupCode']);
        if ('value' in this.props) {
            otherProps.value = this.toArray(otherProps.value);
            delete otherProps.defaultValue;
        }else{
            otherProps.defaultValue = this.toArray(otherProps.defaultValue);
        }
        return (<Cascader
                {...otherProps}
                options={options} />);
    }
});

export default Lookup