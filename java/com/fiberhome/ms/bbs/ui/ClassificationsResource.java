/**
 * 
 */
package com.fiberhome.ms.bbs.ui;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Classifications;
import com.fiberhome.ms.bbs.entity.Question;
import com.fiberhome.ms.bbs.service.ClassificationsService;
import com.fiberhome.ms.bbs.service.QuestionService;
import com.fiberhome.smartms.BusinessAccessException;
import com.fiberhome.smartms.Pageable;
import com.fiberhome.smartms.annotation.ApiQueryParam;
import com.fiberhome.smartms.annotation.Compress;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.ui.BaseResource;

/**
 * @author ftl
 *
 */
@Path("bbs/classification")
//@Resource(code = 20001, model = "Smart2", desc = "Classifications Resource")
public class ClassificationsResource extends BaseResource<Classifications> {
	@Autowired
	private ClassificationsService service;

	protected ClassificationsService getService() {
		return service;
	}
	
	@Autowired
    private QuestionService questionService;
	
	////
	@GET
	@Path(value = "/index")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index() {
		return null;
	}
	
	@GET
    @Path("/getCorrespondingQuestions/list/{page}/{pageSize}")
    @Operation(code = 3, desc = "read")
    @Compress
    @ApiQueryParam
    public Pageable<Classifications> listPage(@PathParam("page") int page, @PathParam("pageSize") int pageSize)
            throws BusinessAccessException {
	    Pageable<Classifications> pageList = getService().getAll(this.getQueryFilter(), page, pageSize);
	    if (null != pageList && pageList.getLength() > 0) {
            List<Classifications> oldLst = (List<Classifications>) pageList.getData();
            for (Classifications ad : oldLst) {
                List<Question> questions = questionService.getQuestionsByClassId(ad.getId());
                if(null != questions && questions.size()>0){
                  ad.setQuestions(questions);
                 }
             }
         }
	    
	    return pageList;
    }
	
	
	
}
