/**
 * 
 */
package com.fiberhome.ms.bbs.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.ms.bbs.entity.Article;
import com.fiberhome.smartms.BaseService;

/**
 * @author ftl
 *
 */
@Transactional
public interface ArticleService extends BaseService<Article> {

	List<Article> getByUserId(long userId);

	void changeHits(long id);

	void editPSById(long id,String postState);

}
