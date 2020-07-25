package com.fiberhome.ms.bbs.ui;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Field;
import com.fiberhome.ms.bbs.entity.PollOption;
import com.fiberhome.ms.bbs.entity.Question;
import com.fiberhome.ms.bbs.service.PollOptionService;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.ui.BaseResource;


/**
 * @author ftl
 *
 */
//@Api("bbs")
@Path("bbs/pollOption")
//@Resource(code = 20001, model = "pollOption")
public class PollOptionResource extends BaseResource<PollOption> {
	@Autowired
	private PollOptionService service;
	@Override
	protected PollOptionService getService() {
		return service;
	}

	////
	@GET
	@Path(value = "/index")
	public String index() {
		return null;
	}
	@GET
    @Path(value = "/getPollOptionsByPollId/{pollId}")
    @Operation(code = Operation.READ, desc = Operation.READ_DESC)
    public List<PollOption> getPollOptionsByPollId(@PathParam("pollId")long pollId){
      return getService().getPollOptionsByPollId(pollId);
    }
	@PUT
    @Path(value="voteCountPlusOne/{id}")
    @Operation(code = Operation.UPDATE, desc = Operation.UPDATE_DESC)
    public void voteCountPlusOne(@PathParam("id") long id){
        getService().voteCountPlusOne(id);
    }

}
