/**
 * 
 */
package com.fiberhome.ms.bbs.dao;

import com.fiberhome.ms.bbs.entity.Collect;
import com.fiberhome.smartms.BaseDao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface CollectDao extends BaseDao<Collect> {

	void cancelCollect(@Param("userId")long userId,@Param("articleId") long articleId);
	
	public long getId(@Param("userId") long userId, @Param("articleId") long articleId);

}
