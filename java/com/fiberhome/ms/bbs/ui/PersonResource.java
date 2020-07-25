/**
 * 
 */
package com.fiberhome.ms.bbs.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.client.SecurityService;
import com.fiberhome.ms.bbs.entity.Person;
import com.fiberhome.ms.bbs.entity.User;
import com.fiberhome.ms.bbs.entity.UserExtend;
import com.fiberhome.ms.bbs.service.PersonService;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.ui.BaseResource;

/**
 * @author ftl
 *
 */
@Path("bbs/person")
@Resource(code = 20001, model = "Smart2", desc = "Person Resource")
public class PersonResource extends BaseResource<Person> {
	@Autowired
	private PersonService service;
	

	protected PersonService getService() {
		return service;
	}

	////
	@GET
	@Path(value = "/index")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public String index() {
		return null;
	}

	// 根据userId获取id
	@GET
	@Path(value = "/getIdByUId/{userId}")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public Long getIdByUId(@PathParam("userId") long userId) {

		return getService().getIdByUId(userId);
	}
	
	@GET
	@Path(value="/getAllInfoByUserId/{userId}")
	@Operation(code = Operation.READ, desc = Operation.READ_DESC)
	public UserExtend getAllInfoByUserId(@PathParam("userId")long userId){
		return service.getAllInfoByUserId(userId);
	}
	
}
