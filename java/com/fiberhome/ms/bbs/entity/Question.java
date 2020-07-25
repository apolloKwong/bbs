/**
 * 
 * 
 * @author ftl
 *
 */
package com.fiberhome.ms.bbs.entity;


import java.util.Date;

import com.fiberhome.smartms.model.LongIdVO;

public class Question extends LongIdVO {
   
    private long classId;

    private long userId;

   
    private Date questionDate;
    private String content;
    public String getContent() {
      return content;
    }

    public void setContent(String content) {
      this.content = content;
    }


    private int resolved;

   
    private int questionState;

    public long getClassId() {
        return classId;
    }

    public void setClassId(long classId) {
        this.classId = classId;
    }

    
    public long getUserId() {
        return userId;
    }

    
    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Date getQuestionDate() {
        return questionDate;
    }

   
    public void setQuestionDate(Date questionDate) {
        this.questionDate = questionDate;
    }

    
    public int getResolved() {
        return resolved;
    }

   
    public void setResolved(int resolved) {
        this.resolved = resolved;
    }

   
    public int getQuestionState() {
        return questionState;
    }

    
    public void setQuestionState(int questionState) {
        this.questionState = questionState;
    }
}
