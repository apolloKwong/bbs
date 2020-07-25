package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.PollDao;
import com.fiberhome.ms.bbs.entity.Poll;
import com.fiberhome.ms.bbs.service.PollService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class PollServiceImpl extends BaseServiceImpl<Poll> implements PollService {

	@Autowired
	private PollDao pollDao;

	protected PollDao getDao() {
		return pollDao;
	}
	
	////

}
