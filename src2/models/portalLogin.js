import { routerRedux } from 'dva/router'
import { queryURL } from 'utils'
import { login } from 'services/login'
import * as user from 'services/security/user'

export default {
  namespace: 'plogin',
  state: {},
  effects: {
    * wsLogin({
    payload,
  }, { put, call, select }) {
    const authInfo = yield call(user.getAuthInfo)
    const userId = authInfo.data.userId
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

  },
  
    * login ({
      payload,
    }, { put, call, select }) {
      const {success,data} = yield call(login, payload)
      // const { locationQuery } = yield select(_ => _.app)
      // yield put({ type: 'hideLoginLoading' })
      if (success) {
       
        // const { from } = locationQuery
        yield put({ type: 'app/query' })
        // if (from && from !== '/portalLogin') {
        //     yield put(routerRedux.push(from))
        // } else {
        //     yield put(routerRedux.push('/forum'))
        // }
      } else {
        throw data
      }
    },
  },
}
