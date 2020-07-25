import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;

 const tagsFromServer = [['运营管理',1],
                         ['产品设计',2],
                         ['编程语言',3],
                         ['研发管理',4],
                         ['云计算/大数据',5],
                         ['开源软件',6],
                         ['物联网',7],
                         ['系统运维',8],
                         ['移动开发',9],
                         ['前端开发',10],
                         ['后端开发',11],
                         ['软件测试',12],
                         ['架构设计',13],
                         ['信息安全',14],
                         ['敏捷',15]];
class HotFields extends React.Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
    this.props.getSelectedFields(`${nextSelectedTags}`)
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <div >
        <div style={{ marginRight: 8, display: 'inline', fontSize: '14px' }}>领域范围:</div>
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
export default HotFields
