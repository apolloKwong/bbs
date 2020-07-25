import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';
export var stompClient;
export let stompClientSubscription;

// let errorEventCallback = function() {
//   debugger
//   console.log("error dayo");
// };
// let closeEventCallback = function() {
//   debugger
//   console.log("close dayo");
// };

export function stompConnect(cb) {
  stompClient = Stomp.over(function () {
    return new SockJS('http://localhost:8866/hello');
  });
  console.log("stompClient", stompClient);
  stompClient.reconnect_delay = 30000;//30s reconnect
  stompClient.connect({}, (frame) => {
    console.log('Con@nected: ' + frame);
    let userId = localStorage.getItem('stompUserId');
    if (userId != null) {
      console.log("stompConnect@userId", userId)
      stompClientSubscription = stompClient.subscribe(`/user/${userId}/message`, (message) => {
        var messageEntity = JSON.parse(message.body);
        console.log(messageEntity);
        cb(messageEntity);
        //10秒没收到消息就fetch wsLogin
      });
    }
    let lastSendDate = localStorage.getItem('lastSendDate');
    var lastSendDate2 = new Date(lastSendDate)
    var currentDate = new Date();

    if ((currentDate.getTime() - lastSendDate2.getTime()) >= 15000) {
      
      if (userId != null) {
      fetch(`http://localhost:8000/bbs/websocket/login/${userId}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => response.json()) //下一步操作
        .then((responseData) => {
          console.log(responseData); //打印出来
          // alert(responseData);
        })
        .catch((error) => {
          alert(error);
        })
    }}
  });
}
// // import ReconnectingWebSocket from './reconnecting-websocket.js';
// import * as Stomp from 'stompjs';
// let socket = null;
// export function wsListen(cb) {
//   ws = Stomp.over('ws://localhost:8866/hello');
//   // new ReconnectingWebSocket('ws://localhost:8866/hello');
//   console.log("ws",ws)
//   ws.onopen = event => {

//     console.log('connected');
//     console.log("onpen");
//   };

  // ws.onclose = event => {
  //   // fetch(`http://localhost:8000/bbs/websocket/close/${userId}`, {
  //   //   method: 'GET',
  //   //   credentials: 'include',
  //   // })
  //   //   .then((response) => response.json()) //下一步操作
  //   //   .then((responseData) => {
  //   //     console.log(responseData); //打印出来
  //   //     // alert(responseData);
  //   //   })
  //   //   .catch((error) => {
  //   //     alert(error);
  //   //   })
  //   console.log('disconnected');
  // };

//   ws.onerror = event => {

//     console.log(event.data);
//   };

//   ws.onmessage = event => {

//     console.log(event.data);
//     cb(event.data);
//   };
// }
// import ReconnectingWebSocket from './reconnecting-websocket.js';

// export function connect() {
//     stompClient = Stomp.over('ws://localhost:8866/hello');
// stompClient.connect({}, function (frame) {
//     setConnected(true);
//     console.log('Connected: ' + frame);
//      stompClient.subscribe('/user/3/message', function(message){  
//          var messageEntity = JSON.parse(message.body);  
//          console.log(messageEntity);
//     });  
// });
// }


