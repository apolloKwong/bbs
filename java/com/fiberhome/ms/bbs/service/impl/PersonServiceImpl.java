package com.fiberhome.ms.bbs.service.impl;

import java.lang.reflect.Field;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.client.SecurityService;
import com.fiberhome.ms.bbs.dao.PersonDao;
import com.fiberhome.ms.bbs.entity.Person;
import com.fiberhome.ms.bbs.entity.User;
import com.fiberhome.ms.bbs.entity.UserExtend;
import com.fiberhome.ms.bbs.service.PersonService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class PersonServiceImpl extends BaseServiceImpl<Person> implements PersonService {

	@Autowired
	private PersonDao dao;

	@Autowired
	private SecurityService securityService;

	protected PersonDao getDao() {
		return dao;
	}

	@Override
	public Long getIdByUId(long userId) {
		return dao.getIdByUId(userId);
	}

	@Override
	public UserExtend getAllInfoByUserId(long userId) {
		User user = securityService.get(userId);
		Long id = this.getIdByUId(userId);
		Person person = dao.getById(id);
		UserExtend userExtend = new UserExtend();
		Field[] fields = user.getClass().getFields();
		for (Field field :fields) {
                 System.out.println(field);
		}
		return null;
	}

}
