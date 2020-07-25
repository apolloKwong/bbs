package com.fiberhome.ms.bbs.service;


import com.fiberhome.ms.bbs.entity.Field;
import com.fiberhome.ms.bbs.entity.PollRecord;
import com.fiberhome.smartms.BaseService;


/**
 * @author ftl
 *
 */
public interface PollRecordService extends BaseService<PollRecord> {
  PollRecord checkIfPolled(long pollId, long userId);
}
