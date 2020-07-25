/**
 * 
 */
package com.fiberhome.ms.bbs.service;

import java.io.IOException;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.common.SolrDocument;

import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.smartms.BaseService;
import com.fiberhome.smartms.Pageable;
import com.fiberhome.smartms.sql.QueryFilter;

/**
 * @author yanz
 *
 */
public interface ResourceService extends BaseService<Resource> {

  int getCountByUserId(long userId);
  
  int getCountByFieldName(String fieldName);

  Pageable<Resource> getByUserId(long userId, QueryFilter filter, int page, int pageSize);
  
  List<Resource> getByFieldName(String fieldName);

  Pageable<Resource> getByFieldName2(String fieldName, QueryFilter filter, int page, int pageSize);
  
  List<Resource> lastUpdate();
  
  List<Resource> topEveryDay();

  List<Resource> topEveryWeek();

  List<Resource> topEveryMonth();

  List<Resource> topEveryYear();
  
  List<Resource> top24h();
  
  List<Resource> latest24h();

  void downloadsPlusOne(long id);

  Pageable<SolrDocument> search(String keyword,String field, String resourceType,int page, int pageSize) throws SolrServerException, IOException;



}
