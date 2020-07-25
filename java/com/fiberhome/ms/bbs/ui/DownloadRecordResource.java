package com.fiberhome.ms.bbs.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.ms.bbs.entity.DownloadRecord;
import com.fiberhome.ms.bbs.service.DownloadRecordService;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.ui.BaseResource;

import io.swagger.annotations.Api;

/**
 * @author ftl
 *
 */
@Api("bbs")
@Path("bbs/downloadRecord")
@Resource(code = 20001, model = "downloadRecord")
public class DownloadRecordResource extends BaseResource<DownloadRecord> {
	@Autowired
	private DownloadRecordService service;

	protected DownloadRecordService getService() {
		return service;
	}
	
	////
	@GET
	@Path(value = "/index")
	public String index() {
		return null;
	}
}
