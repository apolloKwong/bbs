/**
 * 
 * 
 * @author ftl
 *
 */
package com.fiberhome.ms.bbs.entity;

import java.util.Date;

import com.fiberhome.smartms.model.LongIdVO;

public class Collect extends LongIdVO {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ist..t_collect.COLLECT_DATE
     *
     * @generated Wed Jan 24 14:52:37 CST 2018
     */
    private Date collectDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ist..t_collect.USER_ID
     *
     * @generated Wed Jan 24 14:52:37 CST 2018
     */
    private long userId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ist..t_collect.ARTICLE_ID
     *
     * @generated Wed Jan 24 14:52:37 CST 2018
     */
    private long articleId;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ist..t_collect.COLLECT_DATE
     *
     * @return the value of ist..t_collect.COLLECT_DATE
     *
     * @generated Wed Jan 24 14:52:37 CST 2018
     */
    private String senderName;
    private String articleName;
    private int status;
    public Date getCollectDate() {
        return collectDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ist..t_collect.COLLECT_DATE
     *
     * @param collectDate the value for ist..t_collect.COLLECT_DATE
     *
     * @generated Wed Jan 24 14:52:37 CST 2018
     */
    public void setCollectDate(Date collectDate) {
        this.collectDate = collectDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ist..t_collect.USER_ID
     *
     * @return the value of ist..t_collect.USER_ID
     *
     * @generated Wed Jan 24 14:52:37 CST 2018
     */
    public long getUserId() {
        return userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ist..t_collect.USER_ID
     *
     * @param userId the value for ist..t_collect.USER_ID
     *
     * @generated Wed Jan 24 14:52:37 CST 2018
     */
    public void setUserId(long userId) {
        this.userId = userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ist..t_collect.ARTICLE_ID
     *
     * @return the value of ist..t_collect.ARTICLE_ID
     *
     * @generated Wed Jan 24 14:52:37 CST 2018
     */
    public long getArticleId() {
        return articleId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ist..t_collect.ARTICLE_ID
     *
     * @param articleId the value for ist..t_collect.ARTICLE_ID
     *
     * @generated Wed Jan 24 14:52:37 CST 2018
     */
    public void setArticleId(long articleId) {
        this.articleId = articleId;
    }

    public String getSenderName() {
      return senderName;
    }

    public void setSenderName(String senderName) {
      this.senderName = senderName;
    }

    public String getArticleName() {
      return articleName;
    }

    public void setArticleName(String articleName) {
      this.articleName = articleName;
    }

    public int getStatus() {
      return status;
    }

    public void setStatus(int status) {
      this.status = status;
    }
}
