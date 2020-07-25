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
import com.fiberhome.ms.bbs.message.ToUserMessage;
import com.fiberhome.ms.bbs.service.NotificationService;
import com.fiberhome.ms.bbs.websocket.controller.WebSocketController;
import com.fiberhome.smartms.BaseContextAwareResource;

/**
 * @author xuyan
 *
 */
@Path("/bbs/websocket")
// @Resource(code = 31000, model = "fitod", desc = "数据目录服务")
public class WebSocketResource extends BaseContextAwareResource {

  private static final Map<Long, Integer> wsMap = new HashMap<>();

  @Autowired
  private NotificationService service;

  @Autowired
  WebSocketController handler;

  @GET
  @Path(value = "/login/{userId}")
  public ResponseData greeting(@PathParam("userId") long userId) throws Exception {
    System.out.println("登录接口,userId=" + userId);
    boolean flag=wsMap.containsKey(userId);
    if (flag) {
      int loginCount = wsMap.get(userId);
      wsMap.put(userId,loginCount+1);
      System.out.println("登录loginCount" + loginCount);
    } else {
      wsMap.put(userId,1);
    }
    System.out.println("开始发送"+userId);
    if (wsMap.get(userId) == 1) {
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
    return new ResponseData("200", "login", "ok");
    } else {
    return new ResponseData("200", "login", "not ok");
    }
  }


  @GET
  @Path(value = "/close/{userId}")
  public ResponseData close(@PathParam("userId") long userId) throws Exception {
    boolean flag=wsMap.containsKey(userId);
    if (flag) {
    int loginCount = wsMap.get(userId);
    if (loginCount > 1) {
      wsMap.put(userId,loginCount-1);
    } else {      
      wsMap.put(userId,loginCount-1);
      wsMap.remove(userId);
    }
    return new ResponseData("200", "close", "ok");
    } else {
    return new ResponseData("200", "no one close what", "ok");
    }
  }

//  @GET
//  @Path(value = "/send/{userId}")
//  public ResponseData send(@PathParam("userId") long userId) throws Exception {
//    int wsFlag = wsMap.get(userId);
//    System.out.println("开始发送"+userId);
//    new Thread(new Runnable() {
//      @Override
//      public void run() {
//        try {
//          sendMsg(userId);
//        } catch (InterruptedException e) {
//          e.printStackTrace();
//        }
//      }
//    }).start();
//    return new ResponseData("200", "send", "ok");
//  }

  public void sendMsg(long userId) throws InterruptedException {
    int loginCount = wsMap.get(userId);
    while (loginCount > 0) {
      int i = service.getBadgeNumber(userId);
      ToUserMessage toUserMessage = new ToUserMessage();
      toUserMessage.setUserId(userId+"");
      toUserMessage.setMessage(i+"");
      handler.cheatTo(toUserMessage);
      Thread.sleep(4000);
      if (wsMap.containsKey(userId)) {
        loginCount = wsMap.get(userId);
      } else {
        loginCount = 0;
      }
    }
  }
}

