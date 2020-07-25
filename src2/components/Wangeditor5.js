import React, { Component } from 'react';
import { Input, Select, Button, message } from 'antd'
import Lookup from 'components/Lookup'
import styles from './Wangeditor.less'
import E from 'wangeditor'

class Wangeditor5 extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editorContent: ''
    }
  }
  render() {
    return (
      <div className={styles.writearticle}>


        {/* 将生成编辑器 */}
        <div className={styles.textarea} ref="editorElem" style={{ height:'40px', background:'white', border: "1px solid #aaa",zIndex:'10001'}}>
        </div>

        <div ref="editor1" style={{  border: "1px solid #aaa",background:'white',  height:"180px",zIndex:'1'}}>
          </div>

       
      </div>
    );
  }
  componentDidMount() {
    const elem = this.refs.editorElem
    const elem1=this.refs.editor1
    const editor = new E(elem,elem1)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
      this.props.getValue(this.state.editorContent)
    }
    editor.customConfig.uploadImgServer = '/services/bbs/uploadImg/upload'
    editor.customConfig.uploadImgHooks = {
      before: (xhr, editor, files) => {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        if (!files[0].type.endsWith('image/', 6)) {
          return {
            prevent: true,
            msg: '放弃上传',
          };
        }
        return true;
      },
      success: (xhr, editor, result) => {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail: (xhr, editor, result) => {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        message.error('回显图片出错!');
      },
      error: (xhr, editor) => {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        message.error('图片上传失败!');
      },
      timeout: (xhr, editor) => {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        message.error('图片上传超时!');
      },

      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: (insertImg, result, editor) => {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        console.log(result)
        let url = `http://10.110.200.183:8080/services/bbs/uploadImg/getimg/${result.entity}`;
        insertImg(url);

        // result 必须是一个 JSON 格式字符串！！！否则报错
      },
    };



    editor.create()
  }


}






export default Wangeditor5
