/**
 * 
 */
package com.fiberhome.ms.bbs.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.Person;
import com.fiberhome.smartms.BaseDao;

/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface PersonDao extends BaseDao<Person> {

	Long getIdByUId(@Param("userId")long userId);


}
