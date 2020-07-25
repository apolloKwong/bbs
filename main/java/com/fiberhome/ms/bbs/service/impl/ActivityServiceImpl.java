package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.ActivityDao;
import com.fiberhome.ms.bbs.entity.Activity;
import com.fiberhome.ms.bbs.service.ActivityService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class ActivityServiceImpl extends BaseServiceImpl<Activity> implements ActivityService {

	@Autowired
	private ActivityDao activityDao;

	protected ActivityDao getDao() {
		return activityDao;
	}
	
	////

}
