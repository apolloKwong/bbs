import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;

// const tagsFromServer = ['运营管理', '产品设计', '编程语言', '研发管理', '云计算/大数据', '开源软件', '物联网', '系统运维', '移动开发', '前端开发', '后端开发', '软件测试', '架构设计', '信息安全', '敏捷'];
//const tagsFromServer = ['全部', '文档类', '工具类', '代码类', '其他'];
const tagsFromServer = [['文档类',1], ['工具类',2], ['代码类',3], ['其他',4]];
class HotTags extends React.Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
    this.props.getSelectedTags(`${nextSelectedTags}`)
  }
  // componentWillReceiveProps(nextProps){
  //   if (this.props.selectedTags !== nextProps.selectedTags) //当前的props
  //   this.setState({ selectedTags: nextProps.selectedTags }); //下一阶段的props
  // }
  render() {
    const { selectedTags } = this.state;
    return (
      <div>
         <div style={{ marginRight: 8, display: 'inline', fontSize: '14px' }}>资源类型:</div>
         {tagsFromServer.map(tag => (
           <CheckableTag style={{ fontSize: '14px' }}
             key={tag}
             checked={selectedTags.indexOf(tag[1]) > -1}
             onChange={checked => this.handleChange(tag[1], checked)}
           >
             {tag[0]}
           </CheckableTag>
         ))}
      </div>
    );
  }
}
export default HotTags
