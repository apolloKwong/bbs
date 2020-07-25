import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'views/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./views/error'),
  })
  const routes = [
      {
      path: '/dashboard',
        models: () => [import('./models/dashboard')],
          component: () => import('./views/dashboard/'),
          },{
      path: '/login',
        models: () => [import('./models/login')],
          component: () => import('./views/login/'),
          },{
      path: '/internet',
       // models: () => [import('./models/internet')],
          component: () => import('./views/internet/'),
          },{
      path: '/writearticle',
        // models: () => [import('./models/writearticle')],
          component: () => import('./views/writearticle/'),
          },{
      path: '/forum',
        // models:() => [import('./models/plate')],
          component:() =>import('./views/forum/'),
        },{
      path: '/plate',
        models:() => [import('./models/plate')],
          component:() =>import('./views/plate/'),
          },
      

{
  path: '/security/users',
    models: () => [import('./models/security/user')],
      component: () => import('./views/security/user/'),
      }, {
  path: '/setting',
    models: () => [import('./models/setting')],
      component: () => import('./views/setting/'),
      }, {
  path: '/security/roles',
    models: () => [import('./models/security/role')],
      component: () => import('./views/security/role/'),
      }, {
  path: '/security/group',
    models: () => [import('./models/security/group')],
      component: () => import('./views/security/group/'),
      }, {
  path: '/security/org',
    models: () => [import('./models/security/org')],
      component: () => import('./views/security/org/'),
      }, {
  path: '/menus',
    models: () => [import('./models/menu')],
      component: () => import('./views/menu/'),
      }, {
  path: '/lookup',
    models: () => [import('./models/lookup')],
      component: () => import('./views/lookup/'),
      }, {
  path: '/lookup/:id',
    models: () => [import('./models/lookupArea')],
      component: () => import('./views/lookup/area/'),
      }, {
  path: '/i18n',
    models: () => [import('./models/i18n')],
      component: () => import('./views/i18n/'),
      }, {
  path: '/registry',
    models: () => [import('./models/registry')],
      component: () => import('./views/registry/'),
      }, {
  path: '/job',
    models: () => [import('./models/job')],
      component: () => import('./views/job/'),
      }, {
  path: '/workflow/Todo',
    models: () => [import('./models/workflow/todo')],
      component: () => import('./views/workflow/todo/'),
      }, {
  path: '/workflow/Handin',
    models: () => [import('./models/workflow/handin')],
      component: () => import('./views/workflow/handin/'),
      }, {
  path: '/workflow/Spons',
    models: () => [import('./models/workflow/spon')],
      component: () => import('./views/workflow/spon/'),
      }, {
  path: '/workflow/Done',
    models: () => [import('./models/workflow/done')],
      component: () => import('./views/workflow/done/'),
      }, {
  path: '/workflow/ProcDef',
    models: () => [import('./models/workflow/procdef')],
      component: () => import('./views/workflow/procdef/'),
      },{
  path: '/workflow/inst/:id',
    models: () => [import('./models/workflow/approveForm')],
      component: () => import('./views/workflow/approveForm/'),
      },{
  path: '/book',
    models: () => [import('./models/book')],
      component: () => import('./views/book/'),
      },{
  path: '/book/edit/:id',
    models: () => [import('./models/book')],
      component: () => import('./views/book/Edit.js'),
      },{
  path: '/devops',
    models: () => [import('./models/devops')],
      component: () => import('./views/devops/'),
      },{
  path: '/operationLog',
    models: () => [import('./models/operationLog')],
      component: () => import('./views/operationLog/'),
    },
    {path:'/personal',
    models:()=>[import('./models/person')],
    component:()=>import('./views/personal/'),


  },{
    path:'/modifyPassword',
   models:()=>[import('./models/modifyPassword')],
    component:()=>import('./views/modifyPassword/'),
  }
  
    ]

    
      


return (
  <ConnectedRouter history={history}>
    <App>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
        {
          routes.map(({ path, ...dynamics }, key) => (
            <Route key={key}
              exact
              path={path}
              component={dynamic({
                app,
                ...dynamics,
              })}
            />
          ))
        }
        <Route component={error} />
      </Switch>
    </App>
  </ConnectedRouter>
)
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
