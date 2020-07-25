package com.fiberhome.ms.bbs.dao;

import java.util.List;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.Notification;
import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.smartms.BaseDao;
import com.fiberhome.smartms.Page;
import com.fiberhome.smartms.sql.QueryFilter;

/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface NotificationDao extends BaseDao<Notification> {

  @MapKey("count")
  public int getCountByUserId(@Param("userId") long userId);

  @MapKey("count")
  public int getBadgeNumber(@Param("recipientId") long recipientId);

  void deleteByTwoIds(@Param("type") long type, @Param("tId") long tId);

  List<Notification> getByUserId(@Param("userId") long userId, @Param("page") Page arg1);

  public void setRead(@Param("recipientId") long recipientId);

  public void setSingleRead(@Param("id") long id);

}
