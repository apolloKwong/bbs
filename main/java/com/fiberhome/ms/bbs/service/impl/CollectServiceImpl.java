package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.ms.bbs.dao.CollectDao;
import com.fiberhome.ms.bbs.entity.Collect;
import com.fiberhome.ms.bbs.service.CollectService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
@Transactional
public class CollectServiceImpl extends BaseServiceImpl<Collect> implements CollectService {

	@Autowired
	private CollectDao dao;

	protected CollectDao getDao() {
		return dao;
	}

	@Override
	public void cancelCollect(long userId, long articleId) {
		dao.cancelCollect(userId, articleId);
	}
	
	@Override
    public long getId(long userId, long articleId) {
        return dao.getId(userId, articleId);
    }
	////

}
