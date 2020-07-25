import { Popover, Button, Icon, Card } from 'antd';
import styles from './comments.less'
import Comment from '../forum/Comment.js'

class Comments extends React.Component {
    state = {
      visible: false,
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  render() {
    const content = (
      <div className={styles.content}>
        <Comment commentList={this.props.commentList} index={this.props.index} handleSubmit={this.props.handleSubmit} handleActiveKeyId={this.props.handleActiveKeyId} /><br />
        <Button onClick={this.hide}>收起</Button>
      </div>
    );
    return (
      <Popover
        content={content}
        title={this.props.commentList.length+"条评论"}
        trigger="click"
        placement="bottomLeft"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >

        <Card.Grid style={{ width: '25%', textAlign: 'center',fontSize: 15 }}><Icon type="message" /> {this.props.commentList.length}</Card.Grid>
      </Popover>
    );
  }
}

export default Comments
