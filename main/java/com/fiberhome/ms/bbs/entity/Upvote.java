/**
 * 
 * 
 * @author ftl
 *
 */
package com.fiberhome.ms.bbs.entity;

import java.util.Date;

import com.fiberhome.smartms.model.LongIdVO;

public class Upvote extends LongIdVO {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ist..t_upvote.USER_ID
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    private int userId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ist..t_upvote.ARTICLE_ID
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    private int articleId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ist..t_upvote.UPVOTE
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    private String upvote;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ist..t_upvote.UPVOTE_DATE
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    private Date upvoteDate;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ist..t_upvote.USER_ID
     *
     * @return the value of ist..t_upvote.USER_ID
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    public int getUserId() {
        return userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ist..t_upvote.USER_ID
     *
     * @param userId the value for ist..t_upvote.USER_ID
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    public void setUserId(int userId) {
        this.userId = userId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ist..t_upvote.ARTICLE_ID
     *
     * @return the value of ist..t_upvote.ARTICLE_ID
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    public int getArticleId() {
        return articleId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ist..t_upvote.ARTICLE_ID
     *
     * @param articleId the value for ist..t_upvote.ARTICLE_ID
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    public void setArticleId(int articleId) {
        this.articleId = articleId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ist..t_upvote.UPVOTE
     *
     * @return the value of ist..t_upvote.UPVOTE
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    public String getUpvote() {
        return upvote;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ist..t_upvote.UPVOTE
     *
     * @param upvote the value for ist..t_upvote.UPVOTE
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    public void setUpvote(String upvote) {
        this.upvote = upvote;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ist..t_upvote.UPVOTE_DATE
     *
     * @return the value of ist..t_upvote.UPVOTE_DATE
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    public Date getUpvoteDate() {
        return upvoteDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ist..t_upvote.UPVOTE_DATE
     *
     * @param upvoteDate the value for ist..t_upvote.UPVOTE_DATE
     *
     * @generated Wed Jan 24 14:53:31 CST 2018
     */
    public void setUpvoteDate(Date upvoteDate) {
        this.upvoteDate = upvoteDate;
    }

}
