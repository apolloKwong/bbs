import React from 'react'
import PropTypes from 'prop-types'
import { Modal, message } from 'antd'
import { routerRedux } from 'dva/router'
import Viewer from 'bpmn-js/lib/NavigatedViewer'
import { showForm } from 'services/workflow/workflowProcDef'

const diagramModal = ({
    item = DiagramModalProps,
  ...DiagramModalProps
}) => {
  function view(div){
    if(!div) return       
    if(div.init){
        return;
    }
      
    var a = new Viewer({
          container:"#canvas"
    });
    div.init = true
    showForm(item.id).then(function ({data}){
      a.importXML(data,function(error){
          if(error){
            console.log("error");
          };
        })
    });

  }
  const modalOpts = {
    ...DiagramModalProps,
  }
  return (
    <div>
      <Modal {...modalOpts} >
        <div>
          <div id="canvas" ref={view} style={{height:500}}></div> 
        </div>   
      </Modal>
    </div>
    
  )
}

diagramModal.propTypes = {
  item: PropTypes.object,
}

export default diagramModal;
