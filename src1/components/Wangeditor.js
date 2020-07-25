import React, { Component } from 'react';
import { Input, Select, Button } from 'antd'
import Lookup from 'components/Lookup'
import styles from './Wangeditor.less'
import E from 'wangeditor'

class Wangeditor extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editorContent: ''
    }
  }

  //  const Option = Select.Option;

  //   function handleChange(value) {
  //     console.log(`selected ${value}`);onChange={handleChange}
  //   }


  render() {
    return (
      <div className={styles.writearticle}>
        

        {/* 将生成编辑器 */}
        <div className={styles.textarea} ref="editorElem" style={{ textAlign: 'left' }}>
        </div>

        <Button onClick={this.clickHandle.bind(this)} >获取内容</Button>
        

      </div>
    );
  }
  componentDidMount() {
    const elem = this.refs.editorElem
    const editor = new E(elem)
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
  }
}

export default Wangeditor;
