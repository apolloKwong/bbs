/**
 * 
 */
package com.fiberhome.ms.bbs.ui;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.UriInfo;

import org.apache.ibatis.annotations.Param;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.common.SolrDocument;
import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.ms.bbs.service.ResourceService;
import com.fiberhome.ms.bbs.utils.commandTool;
import com.fiberhome.smartms.BusinessAccessException;
import com.fiberhome.smartms.Pageable;
import com.fiberhome.smartms.annotation.ApiQueryParam;
import com.fiberhome.smartms.annotation.Compress;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.sql.QueryFilter;
import com.fiberhome.smartms.ui.BaseResource;

/**
 * @author yanz
 *
 */
@Path("bbs/resource")
//@Resource(code = 20001, model = "Smart2", desc = "Resource Resource")
public class ResourceResource extends BaseResource<Resource> {
    @Autowired
    private ResourceService service;
    @Context
    protected UriInfo uriInfo;
   

    protected ResourceService getService() {
        return service;
    }
    
    ////
    @GET
    @Path(value = "/index")
    @Operation(code = Operation.READ, desc = Operation.READ_DESC)
    public String index() {
     
        return null;
    }
    
     
      @GET
      @Path(value = "/getByUserId/list/{userId}/{page}/{pageSize}")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public Pageable<Resource> getByUserId(@PathParam("userId")long userId,@PathParam("page") int page,@PathParam("pageSize") int pageSize) 
          throws BusinessAccessException {
        return this.getService().getByUserId(userId,this.getQueryFilter(), page, pageSize);
      }
      
      @GET
      @Path(value = "/getByFieldName/list/{fieldName}")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public List<Resource> getByFieldName(@PathParam("fieldName")String fieldName) {
        
        return getService().getByFieldName(fieldName);
      }

      @GET
      @Path(value = "getByFieldName2/list/{fieldName}/{page}/{pageSize}")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public Pageable<Resource> getByFieldName2(@PathParam("fieldName")String fieldName,@PathParam("page") int page,@PathParam("pageSize") int pageSize)
          throws BusinessAccessException {
          return this.getService().getByFieldName2(fieldName,this.getQueryFilter(), page, pageSize);
      }
//      @GET
//      @Path(value = "/getAllByDownloads/list")
//      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
//      public List<Resource> getAllByDownloads() {
//        
//        return getService().getAllByDownloads();
//      }
//      
//      @GET
//      @Path(value = "/getAllByDate/list")
//      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
//      public List<Resource> getAllByDate() {
//        
//        return getService().getAllByDate();
//      }LastUpdate
      @GET
      @Path(value = "/lastUpdate/list")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public List<Resource> lastUpdate() {
        
        return getService().lastUpdate();
      }
      @GET
      @Path(value = "/topEveryDay/list")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public List<Resource> topEveryDay() {
        
        return getService().topEveryDay();
      }
      @GET
      @Path(value = "/topEveryWeek/list")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public List<Resource> topEveryWeek() {
        
        return getService().topEveryWeek();
      }
      @GET
      @Path(value = "/topEveryMonth/list")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public List<Resource> topEveryMonth() {
        
        return getService().topEveryMonth();
      }

      @GET
      @Path(value = "/topEveryYear/list")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public List<Resource> topEveryYear() {
        
        return getService().topEveryYear();
      }
      @GET
      @Path(value = "/top24h/list")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public List<Resource> top24h() {
        
        return getService().top24h();
      }
      @GET
      @Path(value = "/latest24h/list")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public List<Resource> latest24h() {
        
        return getService().latest24h();
      }
      @PUT
      @Path(value="downloadsPlusOne/{id}")
      @Operation(code = Operation.UPDATE, desc = Operation.UPDATE_DESC)
      public void downloadsPlusOne(@PathParam("id") long id){
          getService().downloadsPlusOne(id);
      }
      @GET
      @Path(value = "search/{page}/{pageSize}")
      @Operation(code = Operation.READ, desc = Operation.READ_DESC)
      public Pageable<SolrDocument> search(@PathParam("page") int page,@PathParam("pageSize") int pageSize) throws SolrServerException, IOException {
        MultivaluedMap<String, String> revecive=  this.uriInfo.getQueryParameters();
        String keyword = URLDecoder.decode(revecive.getFirst("keyword"),"utf-8");
        System.out.println(keyword);
        String field = URLDecoder.decode(revecive.getFirst("field"),"utf-8");
        field = commandTool.fieldFilterQueryMaker(field);
        System.out.println(field);
        String resourceType = URLDecoder.decode(revecive.getFirst("resourceType"),"utf-8");
        resourceType = commandTool.resourceTypeFilterQueryMaker(resourceType);
        System.out.println(resourceType);
       return getService().search(keyword,field,resourceType,page, pageSize);
      }
}
