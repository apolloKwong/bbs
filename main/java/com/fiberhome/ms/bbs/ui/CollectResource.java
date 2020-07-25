/**
 * 
 */
package com.fiberhome.ms.bbs.ui;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Collect;
import com.fiberhome.ms.bbs.service.CollectService;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.ui.BaseResource;

/**
 * @author ftl
 *
 */
@Path("bbs/collect")
//@Resource(code = 20001, model = "Smart2", desc = "Collect Resource")
public class CollectResource extends BaseResource<Collect> {
	@Autowired
	private CollectService service;

	protected CollectService getService() {
		return service;
	}
	
	////
	@GET
	@Path(value = "/index")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index() {
		return null;
	}
	
	@DELETE
	@Path(value = "/cancelCollect/{userId}/{articleId}")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public void cancelCollect(@PathParam("userId") long userId, @PathParam("articleId") long articleId) {
		getService().cancelCollect(userId, articleId);
	}
	
	@GET
    @Path(value = "/getId/{userId}/{articleId}")
    @Operation(code = Operation.READ, desc = Operation.READ_DESC)
    public long getId(@PathParam("userId") long userId, @PathParam("articleId") long articleId) {
        return getService().getId(userId, articleId);
    }
}
