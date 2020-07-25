package com.fiberhome.ms.bbs.ui;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import com.fiberhome.smartms.BusinessAccessException;
import com.fiberhome.smartms.annotation.Operation;
import com.fiberhome.smartms.annotation.Resource;
import com.fiberhome.smartms.upload.ui.BaseUpLoadResource;

@Path("bbs/uploadFile")
//@Resource(code=30001)
public class UploadFileResource extends BaseUpLoadResource {
	
	@javax.annotation.Resource
	  private HttpServletResponse httpResponse;

	  public HttpServletResponse getHttpResponse() {
	    return httpResponse;
	  }
	
    @POST
    @Consumes("multipart/form-data")
	@Path("/upload")
    @Operation(code=Operation.FILE_UPLOAD,desc=Operation.FILE_UPLOAD_DESC)
    public Response uploadFile(){
    	return super.doConsume("File");
    	
    }
    
    @GET
    @Path(value = "/getfile/{date}/{batchNo}")
    public String getFile( @PathParam("date") String date,
        @PathParam("batchNo") String batchNo)
        throws BusinessAccessException {
      InputStream iStream = null;
      ServletOutputStream outputStream = null;
      try {
       	String rootPath = "D:/file";
    
        String absolutePath = rootPath + "/" + date + "/" + batchNo;
        File file = new File(absolutePath);
        if (file.exists()) {
          iStream = new FileInputStream(file);
          outputStream = getHttpResponse().getOutputStream();
          int length = 1024;
          int readLength = 0;
          byte buf[] = new byte[1024];
          readLength = iStream.read(buf, 0, length);
          while (readLength != -1) {
            outputStream.write(buf, 0, readLength);
            readLength = iStream.read(buf, 0, length);
          }
        }
      } catch (Exception e) {
        e.printStackTrace();
      } finally {
        if (outputStream != null) {
          try {
            outputStream.flush();
          } catch (Exception e) {
            e.printStackTrace();
          }
          try {
            outputStream.close();
          } catch (Exception e) {
            e.printStackTrace();
          }
        }
        if (iStream != null) {
          try {
            iStream.close();
          } catch (Exception e) {
            e.printStackTrace();
          }
        }
      }
      return null;
    }

}
