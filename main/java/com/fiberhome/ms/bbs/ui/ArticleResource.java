/**
 * 
 */
package com.fiberhome.ms.bbs.ui;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.fiberhome.ms.bbs.entity.Article;
import com.fiberhome.ms.bbs.service.ArticleService;
import com.fiberhome.smartms.Pageable;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.sql.QueryFilter;
import com.fiberhome.smartms.ui.BaseResource;
import com.fiberhome.smartms.util.QueryUtils;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author ftl
 *
 */
@Path("bbs/article")
//@Resource(code = 20001, model = "Smart2", desc = "Article Resource")
public class ArticleResource extends BaseResource<Article> {
	@Autowired
	private ArticleService service;

	protected ArticleService getService() {
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
	  @Path(value = "/getByUserId/list/{userId}")
	  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
	  public List<Article> getByUserId(@PathParam("userId")long userId) {
	    
	    return getService().getByUserId(userId);
	  }
	  
	  @PUT
	  @Path(value="changeHits/{id}")
	  @Operation(code = Operation.UPDATE, desc = Operation.UPDATE_DESC)
	  public void changeHits(@PathParam("id") long id){
		  getService().changeHits(id);
	  }
	  
	  @PUT
	  @Path(value="editPSById/{id}/{postState}")
	  @Operation(code = Operation.UPDATE, desc = Operation.UPDATE_DESC)
	  public void editPSById(@PathParam("id") long id,@PathParam("postState") String postState){
		  getService().editPSById(id,postState);
	  }
	  
}
