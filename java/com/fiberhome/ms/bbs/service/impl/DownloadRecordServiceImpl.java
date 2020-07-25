package com.fiberhome.ms.bbs.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.ms.bbs.dao.DownloadRecordDao;
import com.fiberhome.ms.bbs.entity.DownloadRecord;
import com.fiberhome.ms.bbs.service.DownloadRecordService;
import com.fiberhome.smartms.service.BaseServiceImpl;

/**
 * @author ftl
 *
 */
@Service
public class DownloadRecordServiceImpl extends BaseServiceImpl<DownloadRecord> implements DownloadRecordService {

	@Autowired
	private DownloadRecordDao downloadRecordDao;

	protected DownloadRecordDao getDao() {
		return downloadRecordDao;
	}
	
	////

}
