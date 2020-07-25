/**
 * 
 */
package com.fiberhome.ms.bbs.dao;

import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.smartms.BaseDao;
import com.fiberhome.smartms.Page;
import com.fiberhome.smartms.sql.QueryFilter;

import java.util.List;

import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.solr.common.SolrDocument;
import org.springframework.stereotype.Repository;

/**
 * @author yanz
 *
 */
@Mapper
@Repository
public interface ResourceDao extends BaseDao<Resource> {

  public int getCountByUserId(@Param("query") QueryFilter query);
  @MapKey("count")
  public int getCountByUserId(@Param("userId") long userId);
  
  @MapKey("count")
  public int getCountByFieldName(@Param("fieldName") String fieldName);

  List<Resource> getByUserId(@Param("userId") long userId, @Param("page") Page arg1);

  List<Resource> getByFieldName(@Param("fieldName") String fieldName);

  List<Resource> getByFieldName2(@Param("fieldName") String fieldName, @Param("page") Page arg1);

  // List<Resource> getAllByDownloads();
  // List<Resource> getAllByDate();lastUpdate
  List<Resource> lastUpdate();
  
  List<Resource> topEveryDay();

  List<Resource> topEveryWeek();

  List<Resource> topEveryMonth();

  List<Resource> topEveryYear();
  
  List<Resource> top24h();
  
  List<Resource> latest24h();

  public void downloadsPlusOne(@Param("id") long id);
}
