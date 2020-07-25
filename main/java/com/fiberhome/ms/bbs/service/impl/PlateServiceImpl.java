package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.PlateDao;
import com.fiberhome.ms.bbs.entity.Plate;
import com.fiberhome.ms.bbs.service.PlateService;
import com.fiberhome.smartms.service.BaseServiceImpl;

@Service
public class PlateServiceImpl extends BaseServiceImpl<Plate> implements PlateService {
	@Autowired
	private PlateDao plateDao;

	@Override
	protected PlateDao getDao() {
		// TODO Auto-generated method stub
		return plateDao;
	}

	@Override
	public Plate getByName(String plateName) {
		// TODO Auto-generated method stub
		return this.plateDao.getByName(plateName);
	}

}
