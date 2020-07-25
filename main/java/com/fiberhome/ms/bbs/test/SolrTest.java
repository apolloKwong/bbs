package com.fiberhome.ms.bbs.test;

import java.io.IOException;
import org.apache.http.conn.socket.*;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.junit.Test;

import com.fiberhome.ms.bbs.utils.SolrUtil;

public class SolrTest {
  @Test
  public void test() throws SolrServerException, IOException {
    SolrClient solrClient = SolrUtil.getClient("new_core");
    SolrUtil.solrOrder("*:*","fieldName:10 OR fieldName:1 OR fieldName:11 OR fieldName:12 OR fieldName:2 OR fieldName:3 OR fieldName:13 OR fieldName:14 OR fieldName:4 OR fieldName:5 OR fieldName:15 OR fieldName:6 OR fieldName:7 OR fieldName:8 OR fieldName:9","resourceType:3 OR resourceType:2 OR resourceType:1 OR resourceType:4",0,100,solrClient);
  }
}
