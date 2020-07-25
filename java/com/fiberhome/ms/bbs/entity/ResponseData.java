package com.fiberhome.ms.bbs.entity;

import com.fiberhome.smartms.POJO;

public class ResponseData implements POJO {
  
  private static final long serialVersionUID = 1L;
 
  String code;
  String msg;
  Object data;

  public ResponseData(String code, String msg, Object data) {
    super();
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getMsg() {
    return msg;
  }

  public void setMsg(String msg) {
    this.msg = msg;
  }

  public Object getData() {
    return data;
  }

  public void setData(Object data) {
    this.data = data;
  }

}
