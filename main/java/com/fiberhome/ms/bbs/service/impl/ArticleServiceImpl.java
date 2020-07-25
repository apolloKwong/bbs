package com.fiberhome.ms.bbs.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.ms.bbs.dao.ArticleDao;
import com.fiberhome.ms.bbs.entity.Article;
import com.fiberhome.ms.bbs.service.ArticleService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
@Transactional(readOnly=false)
public class ArticleServiceImpl extends BaseServiceImpl<Article> implements ArticleService {

	@Autowired
	private ArticleDao dao;

	protected ArticleDao getDao() {
		return dao;
	}

	@Override
	public List<Article> getByUserId(long userId) {
		   return dao.getByUserId(userId);
	}

	@Override
	public void changeHits(long id) {
		Article article=dao.getById(id);
	    int i=	article.getHits();
		article.setHits(i++);
		dao.update(article);
		
	}

	@Override
	public void editPSById(long id,String postState) {
		dao.editPSById(id,postState);
	}
	
	////

}
