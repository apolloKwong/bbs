package com.fiberhome.ms.bbs.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Training;
import com.fiberhome.ms.bbs.service.TrainingService;
import com.fiberhome.smartms.ui.BaseResource;


/**
 * @author ftl
 *
 */
//@Api("bbs")
@Path("bbs/training")
//@Resource(code = 20001, model = "training")
public class TrainingResource extends BaseResource<Training> {
	@Autowired
	private TrainingService service;
	@Override
	protected TrainingService getService() {
		return service;
	}

	////
	@GET
	@Path(value = "/index")
	public String index() {
		return null;
	}
}
