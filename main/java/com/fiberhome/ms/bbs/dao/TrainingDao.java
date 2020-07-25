package com.fiberhome.ms.bbs.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.Training;
import com.fiberhome.smartms.BaseDao;
/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface TrainingDao extends BaseDao<Training> {

}
