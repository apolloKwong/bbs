package com.fiberhome.ms.bbs.ui;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fiberhome.ms.bbs.entity.ResponseData;
import com.fiberhome.ms.bbs.service.NotificationService;
import com.fiberhome.ms.bbs.websocket.MyHandler;
import com.fiberhome.smartms.BaseContextAwareResource;

/**
 * @author xuyan
 *
 */
@Path("/bbs/websocket")
// @Resource(code = 31000, model = "fitod", desc = "数据目录服务")
public class WebSocketResource extends BaseContextAwareResource {

  private static final Map<Long, HttpSession> wsMap = new HashMap<>();

  @Autowired
  private NotificationService service;

  @Autowired
  MyHandler handler;

  @javax.annotation.Resource
  private HttpServletRequest request;

  @GET
  @Path(value = "/login/{userId}")
  public ResponseData greeting(@PathParam("userId") long userId) throws Exception {
    System.out.println("登录接口,userId=" + userId);
    HttpSession session = request.getSession();
    session.setAttribute("userId", userId);
    System.out.println("1@1"+session);
    System.out.println("2@2"+session.getAttribute("userId"));
    wsMap.put(userId,session);
    return new ResponseData("200", "ok", "ok");
  }


  @GET
  @Path(value = "/close/{userId}")
  public ResponseData close(@PathParam("userId") long userId) throws Exception {
    wsMap.remove(userId);
    return new ResponseData("200", "BadgeNumber", "ok");
  }

  @GET
  @Path(value = "/send/{userId}")
  public ResponseData send(@PathParam("userId") long userId) throws Exception {
    new Thread(new Runnable() {
      @Override
      public void run() {
        try {
          sendMsg(userId);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      }
    }).start();
    return new ResponseData("200", "ok", "ok");
  }

  public void sendMsg(long userId) throws InterruptedException {
    HttpSession wsFlag = wsMap.get(userId);
    while (wsFlag != null) {
      int i = service.getBadgeNumber(userId);
      TextMessage responseData = new TextMessage(i + "");
      boolean hasSend = handler.sendMessageToUser(userId, responseData);
      Thread.sleep(5000);
      wsFlag = wsMap.get(userId);
    }
  }
}

