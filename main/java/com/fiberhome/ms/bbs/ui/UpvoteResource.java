/**
 * 
 */
package com.fiberhome.ms.bbs.ui;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Upvote;
import com.fiberhome.ms.bbs.service.UpvoteService;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.ui.BaseResource;

/**
 * @author ftl
 *
 */
@Path("bbs/upvote")
// @Resource(code = 20001, model = "Smart2", desc = "Upvote Resource")
public class UpvoteResource extends BaseResource<Upvote> {
	@Autowired
	private UpvoteService service;

	protected UpvoteService getService() {
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
	@Path(value = "/cancelUpvote/{userId}/{articleId}")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public void cancelUpvote(@PathParam("userId") long userId, @PathParam("articleId") long articleId) {
		getService().cancelUpvote(userId, articleId);
	}
	
	
	@GET
    @Path(value = "/getId/{userId}/{articleId}")
    @Operation(code = Operation.READ, desc = Operation.READ_DESC)
    public long getId(@PathParam("userId") long userId, @PathParam("articleId") long articleId) {
        return getService().getId(userId, articleId);
    }
	
	

}
