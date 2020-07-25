package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.PollRecordDao;
import com.fiberhome.ms.bbs.entity.Field;
import com.fiberhome.ms.bbs.entity.PollRecord;
import com.fiberhome.ms.bbs.service.PollRecordService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class PollRecordServiceImpl extends BaseServiceImpl<PollRecord> implements PollRecordService {

	@Autowired
	private PollRecordDao pollRecordDao;

	protected PollRecordDao getDao() {
		return pollRecordDao;
	}
	@Override
    public PollRecord checkIfPolled(long pollId, long userId) {
        // TODO Auto-generated method stub
        return pollRecordDao.checkIfPolled(pollId, userId);
    }
	////

}
