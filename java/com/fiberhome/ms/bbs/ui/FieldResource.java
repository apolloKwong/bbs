package com.fiberhome.ms.bbs.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Field;
import com.fiberhome.ms.bbs.service.FieldService;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.ui.BaseResource;

import io.swagger.annotations.Api;

@Api("bbs")
@Path("/bbs/field")
@Resource(code=20001,model="field")
public class FieldResource extends BaseResource<Field> {

	@Autowired
	private FieldService fieldService;

	@Override
	protected FieldService getService() {

		return fieldService;
	}

	@GET
	@Path("/getByName/{fieldName}")
	public Field getByName(@PathParam("fieldName") String fieldName) {
		return this.fieldService.getByName(fieldName);
	}
}
