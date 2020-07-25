/**
 * 
 * 
 * @author yanz
 *
 */
package com.fiberhome.ms.bbs.entity;


import java.util.Date;

import com.fiberhome.smartms.annotation.Lookup;
import com.fiberhome.smartms.model.LongIdVO;
import org.apache.solr.client.solrj.beans.Field;

public class Resource extends LongIdVO {
    @Field
    private long id;
    
    private long userId;
    @Lookup(type = "field")
    private String fieldName;
    @Field
    private String resourceName;
    
    @Lookup(type = "resourceType")
    private String resourceType;
    
    @Field
    private String content;
    
    private Date postDate;
    private String postState;
    private String url;
    private int downloads;
    private long size;
    

    
    //person实体
    private String userMale;
    private String userDescription;
    private String userImage;
    
    //新增字段
    private String userName;
    private String fieldNameReal;
    private String resourceTypeName;
    private int pageSize;
    private int page;
    
    
    
    public String getUserName() {
      return userName;
    }

    public void setUserName(String userName) {
      this.userName = userName;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUrl() {
      return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }
    public String getResourceType() {
        return resourceType;
    }

  public void setResourceType(String resourceType) {
      this.resourceType = resourceType;
  }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    public String getPostState() {
        return postState;
    }

    public void setPostState(String postState) {
        this.postState = postState;
    }


    public int getDownloads() {
        return downloads;
    }

    public void setDownloads(int downloads) {
        this.downloads = downloads;
    }

    public String getUserMale() {
      return userMale;
    }

    public void setUserMale(String userMale) {
      this.userMale = userMale;
    }

    public String getUserDescription() {
      return userDescription;
    }

    public void setUserDescription(String userDescription) {
      this.userDescription = userDescription;
    }

    public String getUserImage() {
      return userImage;
    }

    public void setUserImage(String userImage) {
      this.userImage = userImage;
    }

    public String getFieldNameReal() {
      return fieldNameReal;
    }

    public void setFieldNameReal(String fieldNameReal) {
      this.fieldNameReal = fieldNameReal;
    }

    public String getResourceTypeName() {
      return resourceTypeName;
    }

    public void setResourceTypeName(String resourceTypeName) {
      this.resourceTypeName = resourceTypeName;
    }

    public int getPageSize() {
      return pageSize;
    }

    public void setPageSize(int pageSize) {
      this.pageSize = pageSize;
    }

    public int getPage() {
      return page;
    }

    public void setPage(int page) {
      this.page = page;
    }

    public long getSize() {
      return size;
    }

    public void setSize(long size) {
      this.size = size;
    }
}
