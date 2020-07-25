/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import _ from 'lodash'
import { parse } from 'qs'
import config from 'config'
import { l2t, InitUser, InitI18N, i18n } from 'utils'
import { query, logout, menusQuery } from 'services/app'
import { getByLang } from 'services/i18n'
import queryString from 'query-string'
import en from 'antd/lib/locale-provider/en_US'
import tw from 'antd/lib/locale-provider/zh_TW'
import * as user1 from 'services/user1'
import * as user from 'services/security/user'
import pathToRegexp from 'path-to-regexp'
import * as notification from 'services/notification'
import { stompClient, stompConnect, stompClientSubscription } from 'services/socket'
const locales = {
  en,
  tw,
}

const { prefix } = config
function removeEmtpy (menus, menuMap) {
  return _.remove(menus, (menu) => {
    menu.target = '_self'

    menu.id = menu.id + ""
    menu.name = i18n(menu.name)
    var children = menu.children
    if (children) {
      removeEmtpy(children, menuMap)
      if (children.length) {
        menuMap[menu.id] = menu
        return false
      }
    } else if (menu.url != '' || menu.anchor != '') {
      menuMap[menu.id] = menu;
      return false
    }
    return true
  })
}

export default {
  namespace: 'app',
  state: {
    user: {},
    feed: 0,
    permissions: {
      visit: [],
    },
    menuMap: {},
    menu: [],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },
    setupWs ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/login').exec(pathname)
        let userId = localStorage.getItem('stompUserId')
        if (userId !== null && match === null) {
          stompConnect((data) => {
            dispatch({
              type: 'saveFeed',
payload: {
                data,
              },
            })
            localStorage.setItem('lastSendDate', new Date())
            console.log('lastSendDate in dispatch', localStorage.getItem('lastSendDate'))
          })
        }
      })
    },
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },
  },
  effects: {
    * query ({
      payload,
    }, { call, put, select }) {
      const { locationPathname, locationQuery } = yield select(_ => _.app)
      try {
        const { data: user } = yield call(query, payload)
        const id = user.userId

        console.log('userid', id)
        localStorage.setItem('stompUserId', id)

        const extendData = yield call(user1.get, { id })
        user.userImage = extendData.data.userImage
        user.description = extendData.data.userDescription
        const { data: list } = yield call(menusQuery)
        const { data: i18ns } = yield call(getByLang, user.language)
        // const Badge = yield call(notification.getBadgeNumber, { recipientId: id })
        // const BadgeData = Badge.data
        InitUser(user)
        InitI18N(i18ns)
        let menus = l2t(list)
        let menu = _.find(menus, (menu) => { return menu.id == 2; })

        let menuMap = {}
        removeEmtpy(menu.children, menuMap)
        yield put({
          type: 'updateState',
          payload: {
            locale: locales[user.language],
            // Badge,
            user,
            menuMap,
            menu: menu.children,
          },
        })

        const { from } = locationQuery

        if (from && from !== '/login' && from !== '/portalLogin') {
          yield put(routerRedux.push(from))
        } else if (locationPathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        } else if (locationPathname === '/portalLogin') {
          yield put(routerRedux.push('/home'))
        }
      } catch (e) {
        if (e.statusCode == 401) {
          localStorage.removeItem('stompUserId')
          localStorage.removeItem('lastSendDate')
          yield put(routerRedux.push({
            pathname: '/login',
            search: queryString.stringify({
              from: locationPathname,
            }),
          }))
        }
      }
    },


    * logout ({
      payload,
    }, { call, put }) {
      const authInfo = yield call(user.getAuthInfo)
      const userId = authInfo.data.userId
      fetch(`http://localhost:8000/bbs/websocket/close/${userId}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => response.json()) // 下一步操作
        .then((responseData) => {
          console.log(responseData) //打印出来
          // alert(responseData);
        })
        .catch((error) => {
          alert(error)
        })
      // ws.close();
      localStorage.removeItem('stompUserId')
      localStorage.removeItem('lastSendDate')
      stompClientSubscription.unsubscribe()
      stompClient.disconnect()
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },

    * setRead ({ payload }, { select, call, put }) {
      const { data: user } = yield call(query, payload)
      const id = user.userId
      yield call(notification.setRead, { id })
    },
    * setSingleRead ({ payload }, { select, call, put }) {
      yield call(notification.setSingleRead, { id: payload })
    },

    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

    * saveFeed ({
      payload,
    }, { put, call, select }) {
      const { data } = payload
      yield put({
        type: 'saveUpdates',
payload: {
          data,
        },
      })
    },
  },
  reducers: {

    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    saveUpdates (state, {
      payload: {
        data: feed,
      },
    }) {
      return {
        ...state,
        feed,
      }
    },
    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },

  },
}
