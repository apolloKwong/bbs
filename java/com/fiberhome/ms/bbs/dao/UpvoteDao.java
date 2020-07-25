/**
 * 
 */
package com.fiberhome.ms.bbs.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.ms.bbs.entity.Upvote;
import com.fiberhome.smartms.BaseDao;

/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface UpvoteDao extends BaseDao<Upvote> {

	void cancelUpvote(@Param("userId") long userId, @Param("articleId") long articleId);
	
	public long getId(@Param("userId") long userId, @Param("articleId") long articleId);
	
	List<Upvote> getByUserId(@Param("userId") long userId);

}
