/* global window */
import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { Layout, Loader } from 'components'
import { classnames, config } from 'utils'
import { withRouter, routerRedux } from 'dva/router'
import '../themes/index.less'
import './app.less'
import contentstyle from './appContent.less'
import Error from './error'
import Scrollbars from 'components/scrollbars';
import { LocaleProvider } from 'antd';
import { HomeHeader, HomeContent, Background, HomeFooter } from '../components/HomeLayout'

const { prefix, openPages, } = config
const { Header, Bread, Footer, Sider, styles } = Layout
let lastHref

const App = ({ children, dispatch, app, loading, location }) => {
  const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menu, menuMap, permissions, locale } = app
  let { pathname } = location
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const { iconFontJS, iconFontCSS, logo } = config
  //const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname))
  //const hasPermission = current.length ? permissions.visit.includes(current[0].id) : false
  const hasPermission = true
  const href = window.location.href

  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  const headerProps = {
    menu,
    user,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout() {
      dispatch({ type: 'app/logout' })
    },
    setting() {
      dispatch(routerRedux.push({
        pathname: '/setting',
      }))
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' })
    },
    changeOpenKeys(openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const siderProps = {
    menu,
    menuMap,
    location,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme() {
      dispatch({ type: 'app/switchTheme' })
    },
    changeOpenKeys(openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  const breadProps = {
    menu: menuMap,
    location,
  }

  if (openPages && openPages.includes(pathname)) {
    if (pathname == '/login') {
      return (<div>
        <Loader fullScreen spinning={loading.effects['app/query']} />
        {children}
      </div>)
    } else
      return (
        <LocaleProvider locale={locale}>
          <div>
            <Loader fullScreen spinning={loading.effects['app/query']} />
            <div>
              <Background />
              <HomeHeader />
              <div className={contentstyle.content}>
                {hasPermission ? children : <Error />}
              </div>
              <HomeFooter />
            </div>
          </div>
        </LocaleProvider>
      )
  }
  return (
    <LocaleProvider locale={locale}><div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
        {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
          {siderProps.menu.length === 0 ? null : <Sider {...siderProps} />}
        </aside> : ''}
        <div className={styles.main}>
          <Header {...headerProps} />
          <Bread {...breadProps} />
          <div className={styles.container}>
            <Scrollbars autoHide>
              <div className={styles.content}>
                {hasPermission ? children : <Error />}
              </div>
            </Scrollbars>
          </div>
          <Footer />
        </div>
      </div>
    </div></LocaleProvider>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
