package com.fiberhome.ms.bbs.entity;

import com.fiberhome.smartms.model.LongIdVO;
import java.util.Date;

public class Poll extends LongIdVO {
    private long userId;
    private String title;
    private int status;
    private int hits;
    private Date deadline;
    
    private String userName;
    
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }


    public int getHits() {
      return hits;
    }

    public void setHits(int hits) {
      this.hits = hits;
    }


    public String getUserName() {
      return userName;
    }

    public void setUserName(String userName) {
      this.userName = userName;
    }

    public int getStatus() {
      return status;
    }

    public void setStatus(int status) {
      this.status = status;
    }

    public String getTitle() {
      return title;
    }

    public void setTitle(String title) {
      this.title = title;
    }

    public Date getDeadline() {
      return deadline;
    }

    public void setDeadline(Date deadline) {
      this.deadline = deadline;
    }


}

  
