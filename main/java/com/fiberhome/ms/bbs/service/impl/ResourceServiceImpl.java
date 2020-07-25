package com.fiberhome.ms.bbs.service.impl;

import com.fiberhome.ms.bbs.dao.ResourceDao;
import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.ms.bbs.service.ResourceService;
import com.fiberhome.ms.bbs.utils.SolrUtil;
import com.fiberhome.smartms.BusinessAccessException;
import com.fiberhome.smartms.Page;
import com.fiberhome.smartms.Pageable;
import com.fiberhome.smartms.service.BaseServiceImpl;
import com.fiberhome.smartms.sql.QueryFilter;
import com.fiberhome.smartms.util.DaoUtils;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author yanz
 *
 */
@Service

public class ResourceServiceImpl extends BaseServiceImpl<Resource> implements ResourceService {

  @Autowired
  private ResourceDao dao;

  protected ResourceDao getDao() {
    return dao;
  }
  @Autowired
  private SolrClient client;

  @Override
  public int getCountByUserId(long userId) {
    return dao.getCountByUserId(userId);
  }
  
  @Override
  public int getCountByFieldName(String fieldName) {
    return dao.getCountByFieldName(fieldName);
  }
  
  @Override
  public Pageable<Resource> getByUserId(long userId, QueryFilter filter, int page,
      int pageSize) throws BusinessAccessException {

    this.validatePageSize(pageSize);
    int length = this.getDao().getCountByUserId(userId);
    page = DaoUtils.realPage(page, pageSize, length);
    return length == 0
        ? new Pageable<Resource>(page, pageSize, length, Collections.emptyList())
        : new Pageable<Resource>(page, pageSize, length,
            this.getDao().getByUserId(userId, new Page((page - 1) * pageSize, pageSize)));
  }

  @Override
  public List<Resource> getByFieldName(String fieldName) {
    return dao.getByFieldName(fieldName);
  }


  @Override
  public Pageable<Resource> getByFieldName2(String fieldName, QueryFilter filter, int page,
      int pageSize) throws BusinessAccessException {

    this.validatePageSize(pageSize);
    int length = this.getDao().getCountByFieldName(fieldName);
    page = DaoUtils.realPage(page, pageSize, length);
    return length == 0
        ? new Pageable<Resource>(page, pageSize, length, Collections.emptyList())
        : new Pageable<Resource>(page, pageSize, length,
            this.getDao().getByFieldName2(fieldName, new Page((page - 1) * pageSize, pageSize)));
  }


  // @Override
  // public List<Resource> getAllByDownloads() {
  // return dao.getAllByDownloads();
  // }
  // @Override
  // public List<Resource> getAllByDate() {
  // return dao.getAllByDate();
  // }lastUpdate
  
  @Override
  public List<Resource> lastUpdate() {
    return dao.lastUpdate();
  }
  
  @Override
  public List<Resource> topEveryDay() {
    return dao.topEveryDay();
  }

  @Override
  public List<Resource> topEveryWeek() {
    return dao.topEveryWeek();
  }

  @Override
  public List<Resource> topEveryMonth() {
    return dao.topEveryMonth();
  }

  @Override
  public List<Resource> topEveryYear() {
    return dao.topEveryYear();
  }
  
  @Override
  public List<Resource> top24h() {
    return dao.top24h();
  }
  
  @Override
  public List<Resource> latest24h() {
    return dao.latest24h();
  }

  @Override
  @Transactional(readOnly = false)
  public void downloadsPlusOne(long id) {
    dao.downloadsPlusOne(id);
  }
  
  @Override
  public Pageable<SolrDocument> search(String keyword,String field, String resourceType,int page,int pageSize) throws SolrServerException, IOException {
    client = SolrUtil.getClient("new_core");
    SolrDocumentList list = SolrUtil.solrOrder(keyword,field,resourceType,0,1000,client);
    int length = list.size();
    page = DaoUtils.realPage(page, pageSize, length);
    SolrDocumentList list1 = SolrUtil.solrOrder(keyword,field,resourceType,(page-1)*pageSize,pageSize,client);
    Collection<SolrDocument> data = list1; 
    return length == 0
        ? new Pageable<SolrDocument>(page, pageSize, length, Collections.emptyList())
        : new Pageable<SolrDocument>(page, pageSize, length,data);
   
  }

}
