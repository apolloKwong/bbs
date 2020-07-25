import { Cascader } from 'antd';
import { list } from 'services/lookup'
import { l2t } from 'utils'

function formatter(value) {
    return _.isArray(value) ? _.join(value, ",") : value;
}

class LazyCascader extends React.Component {

    static defaultProps = {
        valueKey: "id",
        parentIdKey: "parentId",
        changeOnSelect: true,
    }

    state = {
        options: [],
    }

    constructor(props) {
        super(props);
        this.formatter = formatter
    }

    loadData(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        const { valueKey, parentIdKey, rpc } = this.props;
        const id = targetOption.id;
        targetOption.loading = true;
        var qs = {};
        qs.pId = id;
        rpc.list(qs).then(({ data }) => {
            targetOption.loading = false;
            let chirldoptions = data.map((item) => {
                return {
                    id: item.id,
                    value: item[valueKey],
                    code: item.code,
                    label: item.label,
                    parentId: item.parentId,
                    isLeaf: item.leaf,
                }
            });
            targetOption.children = chirldoptions;
            this.setState({
                options: [...this.state.options],
            });
        });
    }


    componentWillMount() {
        const { valueKey, parentIdKey, value, rpc } = this.props;

        var qs = {};
        qs.ids = formatter(value);
        rpc.tree(qs).then(({ data }) => {
            const options = data.map((item) => {
                return {
                    id: item.id,
                    value: item[valueKey],
                    code: item.code,
                    label: item.label,
                    parentId: item.parentId,
                    isLeaf: item.leaf,
                };
                
            });
            
            this.setState({ options: l2t(options) });
        });
        const options = l2t(this.state.options);
        

    }

    toArray(value) {
        if (_.isNumber(value) || _.isString(value)) {
            return _.split(value, ',');
        }
        return value;
    }

    render() {
        const otherProps = _.omit(this.props, ['valueKey', 'parentIdKey', 'rpc']);
        if ('value' in this.props) {
            otherProps.value = this.toArray(otherProps.value);
            delete otherProps.defaultValue;
        } else {
            otherProps.defaultValue = this.toArray(otherProps.defaultValue);
        }
        return (
            <Cascader
                {...otherProps}
                options={this.state.options}
                loadData={this.loadData.bind(this)} />
        );
    }

}


export default LazyCascader