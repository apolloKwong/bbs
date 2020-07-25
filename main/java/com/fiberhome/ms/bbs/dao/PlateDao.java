package com.fiberhome.ms.bbs.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.Plate;
import com.fiberhome.smartms.BaseDao;
@Mapper
@Repository
public interface PlateDao extends BaseDao<Plate> {

	Plate getByName(@Param("plateName")String plateName);

}
