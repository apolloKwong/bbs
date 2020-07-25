package com.fiberhome.ms.bbs.ui;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.PollRecord;
import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.ms.bbs.service.PollRecordService;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.ui.BaseResource;


/**
 * @author ftl
 *
 */
//@Api("bbs")
@Path("bbs/pollRecord")
//@Resource(code = 20001, model = "pollRecord")
public class PollRecordResource extends BaseResource<PollRecord> {
	@Autowired
	private PollRecordService service;
	@Override
	protected PollRecordService getService() {
		return service;
	}

	////
	@GET
	@Path(value = "/index")
	public String index() {
		return null;
	}
	@GET
    @Path(value = "/checkIfPolled/list/{pollId}/{userId}")
    @Operation(code = Operation.READ, desc = Operation.READ_DESC)
    public PollRecord checkIfPolled(@PathParam("pollId")long pollId,@PathParam("userId")long userId) {
      return getService().checkIfPolled(pollId, userId);
    }
}
