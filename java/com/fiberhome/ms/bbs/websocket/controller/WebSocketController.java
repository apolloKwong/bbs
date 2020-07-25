package com.fiberhome.ms.bbs.websocket.controller;

import com.fiberhome.ms.bbs.message.ClientMessage;
import com.fiberhome.ms.bbs.message.ServerMessage;
import com.fiberhome.ms.bbs.message.ToUserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

/**
 * Created by lincoln on 16-10-25
 */
@Controller
public class WebSocketController {
  public SimpMessagingTemplate template;  
  @MessageMapping("/hello")  
  @SendTo("/topic/hello")  
    public ServerMessage say(ClientMessage clientMessage){
        //方法用于广播测试
        System.out.println("clientMessage.getName() = " + clientMessage.getName());
        template.convertAndSend("/topic/hello",clientMessage);
        return new ServerMessage("Welcome , "+clientMessage.getName()+" !");
    }

    //注入SimpMessagingTemplate 用于点对点消息发送
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/message")  
//    @SendToUser("/message")  
    // 发送的订阅路径为/user/{userId}/message
    // /user/路径是默认的一个，如果想要改变，必须在config 中setUserDestinationPrefix
    public void cheatTo(ToUserMessage toUserMessage){
        //方法用于点对点测试
        System.out.println("toUserMessage.getMessage() = " + toUserMessage.getMessage());
        System.out.println("toUserMessage.getUserId() = " + toUserMessage.getUserId());  
        messagingTemplate.convertAndSendToUser(toUserMessage.getUserId(),"/message",toUserMessage.getMessage());
    }
}