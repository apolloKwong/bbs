/**
 * 
 */
package com.fiberhome.ms.bbs.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Answer;
import com.fiberhome.ms.bbs.service.AnswerService;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.ui.BaseResource;

/**
 * @author ftl
 *
 */
@Path("bbs/answer")
//@Resource(code = 20001, model = "Smart2", desc = "Answer Resource")
public class AnswerResource extends BaseResource<Answer> {
	@Autowired
	private AnswerService service;

	protected AnswerService getService() {
		return service;
	}
	
	////
	@GET
	@Path(value = "/index")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index() {
		return null;
	}
}
