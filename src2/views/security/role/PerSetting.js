
import { Tree, Button } from 'antd'
import PropTypes from 'prop-types'
import { l2t, i18n } from 'utils'
const TreeNode = Tree.TreeNode;

class PerSetting extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            perDatas: props.perDatas,
            parentDatas: props.parentDatas,
            checkedKeys: props.checkedKeys,
            currentItem: props.currentItem,
            multiple: true,
        });
    }
    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys: checkedKeys })
    }
    savePermissions(roleId, checkedKeys) {
        this.props.savePermissions(roleId, checkedKeys);
    }

    render() {
        const { perDatas, parentDatas, checkedKeys, currentItem } = this.state;
        const roleId = currentItem.id
        const name = currentItem.name;
        const loop = (nodes,i=0) => nodes.map((item) => {
            const ids = _.split(item.code, '.');
            //国际化处理
            const desc = '(' + (ids.length == 3 ? ids[2] : ids[1]) + ')' + i18n('lab.cmn.' + (ids.length == 3 ? 'opt.' + ids[2] : 'res.' + ids[1]), item.desc);
            if (item.children) {
                return (
                    <TreeNode key={item.code} title={desc}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            if (item.id === '10199') {
                return <TreeNode key={item.code} title={desc} disabled />;
            }
            return <TreeNode key={item.code} title={desc} />
        });
        const getChildNode = (childDatas,nodes) => {
            const childNodes=[];
            for(let i=0;i<childDatas.length;i++){
                childNodes.push(nodes[childDatas[i]]);
            }
            const treeChildNodes = loop(childNodes);
            return treeChildNodes;
        };
        const loopNodes = (parentDatas) => {
            let keys=Object.keys(parentDatas);
            let i=0;
            const nodes=l2t(perDatas,{key_id:"code",key_parent:"parentCode"})
            parentDatas=_.map(parentDatas, (item) => {
                return (<TreeNode key={keys[i]} title={'('+keys[i]+')'+i18n('lab.cmn.src.'+keys[i])} >
                    {getChildNode(parentDatas[keys[i++]],nodes)}
                </TreeNode>);
            });
            return parentDatas;
        };
        const treeNodes = loopNodes(parentDatas);
        return (
            <div>
                <span>{i18n('lab.role.role')}-{name}-{i18n('lab.role.perSet')}：</span>
                <Tree checkable multiple={this.state.multiple}
                    defaultExpandedKeys={this.state.expandedKeys}
                    onCheck={this.onCheck} checkedKeys={checkedKeys}>
                    {treeNodes}
                </Tree>
                <div style={{ marginLeft: '10px' }}>
                    <Button type="primary" onClick={() => { this.savePermissions(roleId, checkedKeys) }} >{i18n('btn.cmn.okText')}</Button>
                </div>
                <br />
            </div>
        );
    }

}
PerSetting.propTypes = {
    savePermissions: PropTypes.func,
    perDatas: PropTypes.array,
    parentDatas: PropTypes.object,
    checkedKeys: PropTypes.array,
    currentItem: PropTypes.object,
}

export default PerSetting