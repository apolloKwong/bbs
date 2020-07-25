package com.fiberhome.ms.bbs.service;


import com.fiberhome.ms.bbs.entity.Notification;
import com.fiberhome.smartms.BaseService;
import com.fiberhome.smartms.Pageable;
import com.fiberhome.smartms.sql.QueryFilter;


/**
 * @author ftl
 *
 */
public interface NotificationService extends BaseService<Notification> {
  
  int getCountByUserId(long userId);
  
  int getBadgeNumber(long recipientId);
  
  void deleteByTwoIds(long type, long tId);
  
  void setRead(long recipientId);
  void setSingleRead(long id);
  
  Pageable<Notification> getByUserId(long userId, QueryFilter filter, int page, int pageSize);
}
