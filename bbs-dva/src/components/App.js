import React, { Component } from 'react';
import E from 'wangeditor'

class App extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        editorContent: ''
      }
  }
  render() {
    return (
      <div className="App">
        
        <div ref="editorElem" style={{textAlign: 'left',height:'500px'}}>
        </div>

        <button onClick={this.clickHandle.bind(this)}>获取内容</button>
      </div>
    );
  }
  componentDidMount() {
    const elem = this.refs.editorElem
    const editor = new E(elem)
   editor.customConfig.customUploadImg = function (files, insert) {
            console.log(files)
     insert('https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png')
        }
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    editor.create()
  }
  clickHandle() {

      alert(this.state.editorContent)
      debugger
  }
}

export default App;
