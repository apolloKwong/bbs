import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'
import showLogin from 'components/Login'
import { getUser } from 'utils'

import 'babel-polyfill'






let errors = {
    401:()=>{
        let user = getUser()
        showLogin({username:user.account})
    },
    403:()=>{
        message.error('无权操作',3);
    },
    404:()=>{
        message.error('资源不存在',3);
    },
    400:(request)=>{
       var vo = request.responseJSON || (JSON.parse(request.responseText));
        if(vo){
            if(vo.stackTrace){
               logger.error(vo.stackTrace);
            }
            message.error(vo.message,3);
        }else{
            message.error(request.statusText,3);
        }
    },
    500:()=>{
        message.error('服务器内部错误',3);
    },
    600:()=>{
        message.error('网络连接错误',3);
    },
    0:()=>{
        message.error('网络连接错误',3);
    }  
}


// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError (error) {
    let fn =  errors[error.statusCode]
    if(fn){
        fn(error)
    }else{
        message.error(error.message)
    }
  },
})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
