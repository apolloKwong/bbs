package com.fiberhome.ms.bbs.service.impl;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.ms.bbs.dao.NotificationDao;
import com.fiberhome.ms.bbs.entity.Notification;
import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.ms.bbs.service.NotificationService;
import com.fiberhome.smartms.BusinessAccessException;
import com.fiberhome.smartms.Page;
import com.fiberhome.smartms.Pageable;
import com.fiberhome.smartms.service.BaseServiceImpl;
import com.fiberhome.smartms.sql.QueryFilter;
import com.fiberhome.smartms.util.DaoUtils;

/**
 * @author ftl
 *
 */
@Service
@Transactional
public class NotificationServiceImpl extends BaseServiceImpl<Notification> implements NotificationService {

	@Autowired
	private NotificationDao notificationDao;

	protected NotificationDao getDao() {
		return notificationDao;
	}
	@Override
    public int getBadgeNumber(long recipientId) {
      return notificationDao.getBadgeNumber(recipientId);
    }
   
	 @Override
	  public int getCountByUserId(long userId) {
	    return notificationDao.getCountByUserId(userId);
	  }
	 
	  @Override
	  public Pageable<Notification> getByUserId(long userId, QueryFilter filter, int page,
	      int pageSize) throws BusinessAccessException {

	    this.validatePageSize(pageSize);
	    int length = this.getDao().getCountByUserId(userId);
	    page = DaoUtils.realPage(page, pageSize, length);
	    return length == 0
	        ? new Pageable<Notification>(page, pageSize, length, Collections.emptyList())
	        : new Pageable<Notification>(page, pageSize, length,
	            this.getDao().getByUserId(userId, new Page((page - 1) * pageSize, pageSize)));
	  }
	  
	  @Override
	    public void deleteByTwoIds(long type, long tId) {
	    notificationDao.deleteByTwoIds(type, tId);
	    }
	  
	  @Override
	  @Transactional(readOnly = false)
	  public void setRead(long recipientId) {
	    notificationDao.setRead(recipientId);
	  }
	  
	  @Override
      @Transactional(readOnly = false)
      public void setSingleRead(long id) {
        notificationDao.setSingleRead(id);
      }
	////

}
