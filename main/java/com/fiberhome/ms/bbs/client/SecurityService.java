package com.fiberhome.ms.bbs.client;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.springframework.cloud.netflix.feign.FeignClient;

import com.fiberhome.ms.bbs.entity.User;

@FeignClient("security")
@Consumes("application/json")    
@Produces("application/json")
public  interface SecurityService {
	@GET
	@Path("/security/user/single/{id}")
	public User get(@PathParam("id")long id);
}
