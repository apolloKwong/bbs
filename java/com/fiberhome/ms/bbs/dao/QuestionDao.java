/**
 * 
 */
package com.fiberhome.ms.bbs.dao;

import java.util.List;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.Question;
import com.fiberhome.smartms.BaseDao;

/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface QuestionDao extends BaseDao<Question> {
  List<Question> getQuestionsByClassId(@Param("classId")long classId);

}
