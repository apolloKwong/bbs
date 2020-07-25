package com.fiberhome.ms.bbs.service.impl;

import com.fiberhome.ms.bbs.dao.ArticleDetailsDao;
import com.fiberhome.ms.bbs.entity.ArticleDetails;
import com.fiberhome.ms.bbs.service.ArticleDetailsService;
import com.fiberhome.smartms.service.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ftl
 *
 */
@Service
public class ArticleDetailsServiceImpl extends BaseServiceImpl<ArticleDetails> implements ArticleDetailsService {

	@Autowired
	private ArticleDetailsDao dao;

	protected ArticleDetailsDao getDao() {
		return dao;
	}

	
	////

}
