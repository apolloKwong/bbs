package com.fiberhome.ms.bbs.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.Poll;
import com.fiberhome.smartms.BaseDao;
/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface PollDao extends BaseDao<Poll> {

}
