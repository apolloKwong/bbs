package com.fiberhome.ms.bbs.entity;

import com.fiberhome.smartms.model.LongIdVO;
import java.util.Date;

public class PollRecord extends LongIdVO {
    private long userId;
    private long pollId;
    private long pollOptionId;
    
    
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getPollId() {
      return pollId;
    }

    public void setPollId(long pollId) {
      this.pollId = pollId;
    }

    public long getPollOptionId() {
      return pollOptionId;
    }

    public void setPollOptionId(long pollOptionId) {
      this.pollOptionId = pollOptionId;
    }

}

  
