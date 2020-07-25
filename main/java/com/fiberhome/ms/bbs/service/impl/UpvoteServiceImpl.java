package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.ms.bbs.dao.UpvoteDao;
import com.fiberhome.ms.bbs.entity.Upvote;
import com.fiberhome.ms.bbs.service.UpvoteService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
@Transactional
public class UpvoteServiceImpl extends BaseServiceImpl<Upvote> implements UpvoteService {

	@Autowired
	private UpvoteDao dao;

	protected UpvoteDao getDao() {
		return dao;
	}

	@Override
	public void cancelUpvote(long userId, long articleId) {
		dao.cancelUpvote(userId, articleId);
	}
	
	@Override
    public long getId(long userId, long articleId) {
        return dao.getId(userId, articleId);
    }

	////

}
