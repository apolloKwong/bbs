import { Checkbox, Row, Col,Button } from 'antd';
const CheckboxGroup = Checkbox.Group;

function contains(arr, obj) {
  let i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}
class Checkbox2 extends React.Component {
  state = {
    checkboxNum: 0,
    checkedList:[],
    loading: false,
  };
  handleChange = (checkedList) => {
    this.setState({ checkedList,checkboxNum: checkedList.length});
    this.props.getCheckedList(`${checkedList}`);
  }
  handleSubmit = () => {
    this.props.onClickpublish(this.props.checkedList);
    this.setState({ loading: true });
  }
  render() {
    const that = this
    return (
      <div>
        <CheckboxGroup value={this.state.checkedList} onChange={this.handleChange} >
          {
            _.map(this.props.dataOption, function (item) {
              return (
                <Row key={item.id}>
                  <Col span={8}>
                    <Checkbox 
                      // checked={checked[item.id]}
                      disabled={!contains(that.state.checkedList, item.id)&&(that.state.checkboxNum >= that.props.limit ? true : false)}
                      value={item.id}>
                      {item.content}
                    </Checkbox>
                  </Col>
                </Row>
              )
            })
          }
        </CheckboxGroup>
                <Button
                  type="primary"
                  size="small"
                  loading={this.state.loading}
                  onClick={this.handleSubmit}>
                  提交
              </Button>
      </div>
    );
  }
}

export default Checkbox2