package com.fiberhome.ms.bbs.entity;

import com.fiberhome.smartms.model.LongIdVO;
import java.util.Date;

public class Activity extends LongIdVO {
    private long userId;
    private String title;
    private Date postDate;
    private String postState;
    private int hits;
    private String content;
    
    private String userName;
    
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getTitle() {
      return title;
    }

    public void setTitle(String title) {
      this.title = title;
    }

    public Date getPostDate() {
      return postDate;
    }

    public void setPostDate(Date postDate) {
      this.postDate = postDate;
    }

    public String getPostState() {
      return postState;
    }

    public void setPostState(String postState) {
      this.postState = postState;
    }

    public int getHits() {
      return hits;
    }

    public void setHits(int hits) {
      this.hits = hits;
    }

    public String getContent() {
      return content;
    }

    public void setContent(String content) {
      this.content = content;
    }

    public String getUserName() {
      return userName;
    }

    public void setUserName(String userName) {
      this.userName = userName;
    }
}

  
