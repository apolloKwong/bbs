/**
 * 
 */
package com.fiberhome.ms.bbs.service;

import java.util.List;

import com.fiberhome.ms.bbs.entity.Article;
import com.fiberhome.ms.bbs.entity.Person;
import com.fiberhome.ms.bbs.entity.UserExtend;
import com.fiberhome.smartms.BaseService;

/**
 * @author ftl
 *
 */
public interface PersonService extends BaseService<Person> {

	Long getIdByUId(long userId);

	UserExtend getAllInfoByUserId(long userId);

	
}
