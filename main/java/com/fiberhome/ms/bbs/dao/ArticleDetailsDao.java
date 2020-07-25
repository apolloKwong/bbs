/**
 * 
 */
package com.fiberhome.ms.bbs.dao;

import com.fiberhome.ms.bbs.entity.ArticleDetails;
import com.fiberhome.smartms.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface ArticleDetailsDao extends BaseDao<ArticleDetails> {

}
