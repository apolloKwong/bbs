/**
 * 
 */
package com.fiberhome.ms.bbs.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.Article;
import com.fiberhome.smartms.BaseDao;
import com.fiberhome.smartms.sql.QueryFilter;

/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface ArticleDao extends BaseDao<Article> {

	public int getCountByUserId(@Param("query") QueryFilter query);

	List<Article> getByUserId(@Param("userId") long userId);

	public void editPSById(@Param("article_id") long article_id,@Param("postState") String postState);

}
