package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.FieldDao;
import com.fiberhome.ms.bbs.entity.Field;
import com.fiberhome.ms.bbs.service.FieldService;
import com.fiberhome.smartms.service.BaseServiceImpl;

@Service
public class FieldServiceImpl extends BaseServiceImpl<Field> implements FieldService {
	@Autowired
	private FieldDao fieldDao;

	@Override
	protected FieldDao getDao() {
		// TODO Auto-generated method stub
		return fieldDao;
	}

	@Override
	public Field getByName(String fieldName) {
		// TODO Auto-generated method stub
		return this.fieldDao.getByName(fieldName);
	}

}
