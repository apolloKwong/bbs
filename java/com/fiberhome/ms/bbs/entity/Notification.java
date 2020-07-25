package com.fiberhome.ms.bbs.entity;

import com.fiberhome.smartms.model.LongIdVO;
import java.util.Date;

public class Notification extends LongIdVO {
    private int type;
    private long senderId;
    private long recipientId;
    private int status;
    private long tId;
    private long articleId;
  //新增字段
    private String senderName;
    private String articleName;
    
    public int getType() {
      return type;
    }
    public void setType(int type) {
      this.type = type;
    }
    public long getSenderId() {
      return senderId;
    }
    public void setSenderId(long senderId) {
      this.senderId = senderId;
    }
    public long getRecipientId() {
      return recipientId;
    }
    public void setRecipientId(long recipientId) {
      this.recipientId = recipientId;
    }
    public int getStatus() {
      return status;
    }
    public void setStatus(int status) {
      this.status = status;
    }
    public long gettId() {
      return tId;
    }
    public void settId(long tId) {
      this.tId = tId;
    }
    public String getSenderName() {
      return senderName;
    }
    public void setSenderName(String senderName) {
      this.senderName = senderName;
    }
    public long getArticleId() {
      return articleId;
    }
    public void setArticleId(long articleId) {
      this.articleId = articleId;
    }
    public String getArticleName() {
      return articleName;
    }
    public void setArticleName(String articleName) {
      this.articleName = articleName;
    }

}

  
