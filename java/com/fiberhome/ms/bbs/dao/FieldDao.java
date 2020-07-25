package com.fiberhome.ms.bbs.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.Field;
import com.fiberhome.smartms.BaseDao;
@Mapper
@Repository
public interface FieldDao extends BaseDao<Field> {

	Field getByName(@Param("fieldName")String fieldName);

}
