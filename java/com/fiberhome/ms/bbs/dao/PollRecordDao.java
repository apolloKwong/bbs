package com.fiberhome.ms.bbs.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.PollRecord;
import com.fiberhome.smartms.BaseDao;

/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface PollRecordDao extends BaseDao<PollRecord> {
  public PollRecord checkIfPolled(@Param("pollId")long pollId, @Param("userId")long userId);
}
