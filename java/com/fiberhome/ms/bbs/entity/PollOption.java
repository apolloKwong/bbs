package com.fiberhome.ms.bbs.entity;

import com.fiberhome.smartms.model.LongIdVO;
import java.util.Date;

public class PollOption extends LongIdVO {
    private long pollId;
    private String content;
    private int status;
    private int voteCount;
    
    


    public int getStatus() {
      return status;
    }

    public void setStatus(int status) {
      this.status = status;
    }

    public int getVoteCount() {
      return voteCount;
    }

    public void setVoteCount(int voteCount) {
      this.voteCount = voteCount;
    }

    public String getContent() {
      return content;
    }

    public void setContent(String content) {
      this.content = content;
    }

    public long getPollId() {
      return pollId;
    }

    public void setPollId(long pollId) {
      this.pollId = pollId;
    }
}

  
