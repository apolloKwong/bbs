package com.fiberhome.ms.bbs.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Activity;
import com.fiberhome.ms.bbs.service.ActivityService;
import com.fiberhome.smartms.ui.BaseResource;


/**
 * @author ftl
 *
 */
//@Api("bbs")
@Path("bbs/activity")
//@Resource(code = 20001, model = "activity")
public class ActivityResource extends BaseResource<Activity> {
	@Autowired
	private ActivityService service;
	@Override
	protected ActivityService getService() {
		return service;
	}

	////
	@GET
	@Path(value = "/index")
	public String index() {
		return null;
	}
}
