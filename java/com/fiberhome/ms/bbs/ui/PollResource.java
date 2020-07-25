package com.fiberhome.ms.bbs.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Poll;
import com.fiberhome.ms.bbs.service.PollService;
import com.fiberhome.smartms.ui.BaseResource;


/**
 * @author ftl
 *
 */
//@Api("bbs")
@Path("bbs/poll")
//@Resource(code = 20001, model = "poll")
public class PollResource extends BaseResource<Poll> {
	@Autowired
	private PollService service;
	@Override
	protected PollService getService() {
		return service;
	}

	////
	@GET
	@Path(value = "/index")
	public String index() {
		return null;
	}
}
