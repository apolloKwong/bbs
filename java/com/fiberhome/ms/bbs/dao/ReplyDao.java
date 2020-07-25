/**
 * 
 */
package com.fiberhome.ms.bbs.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.Reply;
import com.fiberhome.ms.bbs.entity.Upvote;
import com.fiberhome.smartms.BaseDao;

/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface ReplyDao extends BaseDao<Reply> {

	List<Reply> getReplyInfoByArticleId(@Param("articleId")long articleId);

	//获取父评论
	List<Reply> getComment(@Param("articleId")long articleId);
	
	//获取子评论
	List<Reply> getReply(@Param("replyId")long replyId);
	
	List<Reply> getByTargetUserId(@Param("targetUserId") long targetUserId);
	

	

}
