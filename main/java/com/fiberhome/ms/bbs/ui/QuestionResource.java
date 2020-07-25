/**
 * 
 */
package com.fiberhome.ms.bbs.ui;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Question;
import com.fiberhome.ms.bbs.service.QuestionService;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.ui.BaseResource;

/**
 * @author ftl
 *
 */
@Path("bbs/question")
//@Resource(code = 20001, model = "Smart2", desc = "Question Resource")
public class QuestionResource extends BaseResource<Question> {
	@Autowired
	private QuestionService service;

	protected QuestionService getService() {
		return service;
	}
	
	////
	@GET
	@Path(value = "/index")
	//@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index() {
		return null;
	} 
	
	@GET
    @Path(value = "/getQuestionsByClassId/{classId}")
    @Operation(code = Operation.READ, desc = Operation.READ_DESC)
    public List<Question> getQuestionsByClassId(@PathParam("classId")long classId){
      return getService().getQuestionsByClassId(classId);
    }
}
