package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.ClassificationsDao;
import com.fiberhome.ms.bbs.entity.Classifications;
import com.fiberhome.ms.bbs.service.ClassificationsService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class ClassificationsServiceImpl extends BaseServiceImpl<Classifications> implements ClassificationsService {

	@Autowired
	private ClassificationsDao dao;

	protected ClassificationsDao getDao() {
		return dao;
	}
	
	////

}
