import { Button } from 'antd';

class LoadingButton extends React.Component {
  state = {
    loading: false,
  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  render() {
    return (
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
          Click me!
        </Button>
    );
  }
}

ReactDOM.render(<App />, mountNode);