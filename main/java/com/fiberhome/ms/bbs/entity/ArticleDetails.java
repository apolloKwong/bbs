/**
 * 
 * 
 * @author ftl
 *
 */
package com.fiberhome.ms.bbs.entity;

import java.util.Date;
import java.util.List;

import com.fiberhome.smartms.annotation.Lookup;
import com.fiberhome.smartms.model.LongIdVO;

public class ArticleDetails extends LongIdVO {

	private long userId;
	
	//article实体
	@Lookup(type = "category")
	private String plateName;
	private String articleName;
	private String content;
	private Date postDate;
	private String postState;
	private int sort;
	private String top;
	
	//person实体
    private String userMale;
    private String userDescription;
    private String userImage;
    
    //新增字段
    private String userName;
	private String plateNameReal;
	
	//评论信息
	private List<Reply> replyComment;
	
	//点赞
	private int upvoteCount;
	private List<Upvote> upvoteList;

	public List<Collect> getCollectList() {
		return collectList;
	}

	public void setCollectList(List<Collect> collectList) {
		this.collectList = collectList;
	}

	//收藏
	private List<Collect> collectList;
	
	public List<Upvote> getUpvoteList() {
		return upvoteList;
	}

	public void setUpvoteList(List<Upvote> upvoteList) {
		this.upvoteList = upvoteList;
	}

	public int getUpvoteCount() {
		return upvoteCount;
	}

	public void setUpvoteCount(int upvoteCount) {
		this.upvoteCount = upvoteCount;
	}

	public List<Reply> getReplyComment() {
		return replyComment;
	}

	public void setReplyComment(List<Reply> replyComment) {
		this.replyComment = replyComment;
	}


	public String getPlateNameReal() {
		return plateNameReal;
	}

	public void setPlateNameReal(String plateNameReal) {
		this.plateNameReal = plateNameReal;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserMale() {
		return userMale;
	}

	public void setUserMale(String userMale) {
		this.userMale = userMale;
	}

	public String getUserDescription() {
		return userDescription;
	}

	public void setUserDescription(String userDescription) {
		this.userDescription = userDescription;
	}

	public String getUserImage() {
		return userImage;
	}

	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	private int hits;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getArticleName() {
		return articleName;
	}

	public String getPlateName() {
		return plateName;
	}

	public void setPlateName(String plateName) {
		this.plateName = plateName;
	}

	public void setArticleName(String articleName) {
		this.articleName = articleName;
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

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	public String getTop() {
		return top;
	}

	public void setTop(String top) {
		this.top = top;
	}

	public int getHits() {
		return hits;
	}

	public void setHits(int hits) {
		this.hits = hits;
	}
}
