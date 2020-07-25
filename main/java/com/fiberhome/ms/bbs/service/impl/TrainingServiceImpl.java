package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.TrainingDao;
import com.fiberhome.ms.bbs.entity.Training;
import com.fiberhome.ms.bbs.service.TrainingService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class TrainingServiceImpl extends BaseServiceImpl<Training> implements TrainingService {

	@Autowired
	private TrainingDao trainingDao;

	protected TrainingDao getDao() {
		return trainingDao;
	}
	
	////

}
