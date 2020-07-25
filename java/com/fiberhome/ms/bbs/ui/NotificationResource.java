package com.fiberhome.ms.bbs.ui;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.Notification;
import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.ms.bbs.service.NotificationService;
import com.fiberhome.smartms.BusinessAccessException;
import com.fiberhome.smartms.Pageable;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.ui.BaseResource;


/**
 * @author yanz
 *
 */
//@Api("bbs")
@Path("bbs/notification")
//@Resource(code = 20001, model = "notification")
public class NotificationResource extends BaseResource<Notification> {
	@Autowired
	private NotificationService service;
	@Override
	protected NotificationService getService() {
		return service;
	}

	////
	@GET
	@Path(value = "/index")
	public String index() {
		return null;
	}
	
	@GET
    @Path(value = "/getByUserId/list/{userId}/{page}/{pageSize}")
    @Operation(code = Operation.READ, desc = Operation.READ_DESC)
    public Pageable<Notification> getByUserId(@PathParam("userId")long userId,@PathParam("page") int page,@PathParam("pageSize") int pageSize) 
        throws BusinessAccessException {
      return this.getService().getByUserId(userId,this.getQueryFilter(), page, pageSize);
    }
	
	@DELETE
    @Path(value = "/deleteByTwoIds/{type}/{tId}")
    @Operation(code = Operation.READ, desc = Operation.READ_DESC)
    public void deleteByTwoIds(@PathParam("type") long type, @PathParam("tId") long tId) {
        getService().deleteByTwoIds(type, tId);
    }
	
	@GET
    @Path(value = "/getBadgeNumber/{recipientId}")
    @Operation(code = Operation.READ, desc = Operation.READ_DESC)
    public int getBadgeNumber(@PathParam("recipientId")long recipientId) {
      return getService().getBadgeNumber(recipientId);
    }
	
	@PUT
    @Path(value="setRead/{recipientId}")
    @Operation(code = Operation.UPDATE, desc = Operation.UPDATE_DESC)
    public void setRead(@PathParam("recipientId") long recipientId){
        getService().setRead(recipientId);
    }
	
	@PUT
    @Path(value="setSingleRead/{id}")
    @Operation(code = Operation.UPDATE, desc = Operation.UPDATE_DESC)
    public void setSingleRead(@PathParam("id") long id){
        getService().setSingleRead(id);
    }
	
}
