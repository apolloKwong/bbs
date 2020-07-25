/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import _ from 'lodash'
import { parse } from 'qs'
import config from 'config'
import { l2t, InitUser, InitI18N, i18n } from 'utils'
import { query, logout,menusQuery } from 'services/app'
import { getByLang } from 'services/i18n'
import queryString from 'query-string'
import en from 'antd/lib/locale-provider/en_US';
import tw from 'antd/lib/locale-provider/zh_TW';

const locales = {
   en,
   tw,
}

const { prefix } = config


function removeEmtpy(menus,menuMap){
    return _.remove(menus,function(menu){
       menu.target = '_self'
       
       menu.id = menu.id + ""
       menu.name = i18n(menu.name)
       var children = menu.children
       if(children){
           removeEmtpy(children,menuMap)
           if(children.length){
               menuMap[menu.id]= menu
               return false
           }
       }else if(menu.url !='' || menu.anchor !=''){
           menuMap[menu.id]= menu;
           return false
       }
       return true
   });
}

export default {
  namespace: 'app',
  state: {
    user: {},
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
      const { locationPathname } = yield select(_ => _.app)
      try{
            const { data:user } = yield call(query, payload)
            const { data:list } = yield call(menusQuery)
            const { data:i18ns } = yield call(getByLang,user.language)
            
            
            InitUser(user)
            InitI18N(i18ns)
            
            let menus = l2t(list);
            let menu = _.find(menus, function(menu) {return menu.id == 2;});
            
            let menuMap = {}
            
            removeEmtpy(menu.children,menuMap);
            
            yield put({
              type: 'updateState',
              payload: {
                locale:locales[user.language],
                user,
                menuMap,
                menu: menu.children,
              },
            })
            if (location.pathname === '/login') {
                yield put(routerRedux.push({
                    pathname: '/dashboard',
                }))
            }
      }catch(e){
          if(e.statusCode == 401 ){
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
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },

    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
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
