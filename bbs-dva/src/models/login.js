import { routerRedux } from 'dva/router'
import { queryURL } from 'utils'
import { login } from 'services/login'

export default {
  namespace: 'login',
  state: {},
  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const {success,data} = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      yield put({ type: 'hideLoginLoading' })
      if (success) {
       
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && from !== '/login') {
            yield put(routerRedux.push(from))
        } else {
            yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
  },
}
