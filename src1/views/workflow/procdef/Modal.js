import React from 'react'
import PropTypes from 'prop-types'
import { Input, InputNumber, Modal, Select, Button, Upload, Icon, message } from 'antd'
import { createDataForm, apiPrefix }  from 'utils'
import { routerRedux } from 'dva/router'
// import * as temp from 'models/workflow/procdef'

const modal = ({
  item = {},
  form: {
    getFieldDecorator,
    validateFields,
    getFormatFieldsValue,
  },
  ...modalProps
}) => {

  const modalOpts = {
    ...modalProps,
  }
  // console.log(temp);

  const uploadProps = {
    name:"file",
    action:`${apiPrefix}/workflow/def/upload`,
    method: 'post',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功！`);
        // window.location.href="/workflow/procDef";
        self.location="/workflow/ProcDef";//局部刷新?
        // let payload={ data:{} }
        // temp.reducers.querySuccess({},payload)

      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败！`);
      }
    },
  }

  return (
    <Modal {...modalOpts}>    
      <div style={{textAlign: 'center'}}>
        <Upload {...uploadProps}
        >
          <Button type="primary">
            <Icon type="upload" />上传
          </Button>
        </Upload>
      </div>
    </Modal>
  )
}

modal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default createDataForm(modal,'item');
