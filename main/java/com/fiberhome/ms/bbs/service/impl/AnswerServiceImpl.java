package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.AnswerDao;
import com.fiberhome.ms.bbs.entity.Answer;
import com.fiberhome.ms.bbs.service.AnswerService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class AnswerServiceImpl extends BaseServiceImpl<Answer> implements AnswerService {

	@Autowired
	private AnswerDao dao;

	protected AnswerDao getDao() {
		return dao;
	}
	
	////

}
