/**
 * 
 */
package com.fiberhome.ms.bbs.ui;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Article;
import com.fiberhome.ms.bbs.entity.Reply;
import com.fiberhome.ms.bbs.service.ReplyService;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.ui.BaseResource;

/**
 * @author ftl
 *
 */
@Path("bbs/reply")
//@Resource(code = 20001, model = "Smart2", desc = "Reply Resource")
public class ReplyResource extends BaseResource<Reply> {
	@Autowired
	private ReplyService service;

	protected ReplyService getService() {
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
	@Path(value = "/getReplyInfoByArticleId/{articleId}")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public List<Reply> getReplyInfoByArticleId(@PathParam("articleId")long articleId) {
		return getService().getReplyInfoByArticleId(articleId);
	}
	
	@GET
	@Path(value = "/getReplyDetails/{articleId}")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public List<Reply> getReplyDetails(@PathParam("articleId")long articleId) {
		return getService().getReplyDetails(articleId);
	}
}
