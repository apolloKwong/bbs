package com.fiberhome.ms.bbs.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.ms.bbs.entity.DownloadRecord;
import com.fiberhome.smartms.BaseDao;
/**
 * @author xxxx
 *
 */
@Mapper
@Repository
public interface DownloadRecordDao extends BaseDao<DownloadRecord> {

      
}
