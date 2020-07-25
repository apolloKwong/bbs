package com.fiberhome.ms.bbs.utils;

import java.io.IOException;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrResponse;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.beans.DocumentObjectBinder;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;

public class SolrUtil {
  public static SolrClient getClient(String coreName) {
    return new HttpSolrClient("http://localhost:8983/solr/" + coreName);
  }

  public static <T> boolean saveIndex(T solrEntity, SolrClient solrClient) {

    DocumentObjectBinder dBinder = new DocumentObjectBinder();
    SolrInputDocument document = dBinder.toSolrInputDocument(solrEntity);
    try {
      solrClient.add(document);
      solrClient.commit();
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
    return true;
  }

  public static SolrResponse query(String keywords, SolrClient solrClient)
      throws SolrServerException, IOException {
    SolrQuery query = new SolrQuery();
    query.setQuery(keywords);
    SolrResponse response = solrClient.query(query);
    return response;

  }
  // 排序查询

  public static SolrDocumentList solrOrder(String keywords,String field,String resourceType,int page,int pageSize,SolrClient solr) throws SolrServerException, IOException {
    SolrQuery query = new SolrQuery();
    query.setQuery(keywords); // 查询所有索引
    query.setParam("fq",field,resourceType);
    query.setParam("wt", "json");
    query.setParam("df", "searchText");
    query.setStart(page);
    query.setRows(pageSize);
    query.addSort("id", SolrQuery.ORDER.asc); // 按id升序排列
    QueryResponse rsp = solr.query(query);
    SolrDocumentList list = rsp.getResults();
/*    for (int i = 0; i < list.size(); i++) {
      // 显示查询到的所有字段及字段内容
      System.out.println(list.get(i));
      // 显示查询到的特定字段内容，下面几个函数也可这样显示
      SolrDocument doc = list.get(i);
      System.out.println(doc.get("id") + " " + doc.get("resourceName") +
          " " + doc.get("content"));
    }*/
    return list;
    
  }
  
}
