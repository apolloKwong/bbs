package com.fiberhome.ms.bbs.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Plate;
import com.fiberhome.ms.bbs.service.PlateService;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.ui.BaseResource;

import io.swagger.annotations.Api;

@Api("bbs")
@Path("/bbs/plate")
@Resource(code=20001,model="plate")
public class PlateResource extends BaseResource<Plate> {

	@Autowired
	private PlateService plateService;

	@Override
	protected PlateService getService() {

		return plateService;
	}

	@GET
	@Path("/getByName/{plateName}")
	public Plate getByName(@PathParam("plateName") String plateName) {
		return this.plateService.getByName(plateName);
	}
}
