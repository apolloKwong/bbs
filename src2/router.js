import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'views/app'
// import mApp from 'models/app'
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
    }, 
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./views/login/'),
    },
    {
      path: '/portalLogin',
      models: () => [import('./models/portalLogin')],
      component: () => import('./views/portalLogin/'),
    },
    {
      path: '/home',
      models: () => [import('./models/home')],
      component: () => import('./views/home/'),
    }, {
      path: '/writearticle',
      models: () => [import('./models/write')],
      component: () => import('./views/writearticle/'),
    }, {
      path: '/forum',
      models: () => [import('./models/forum')],
      component: () => import('./views/forum/'),
    }, {
      path: '/plate',
      models: () => [import('./models/plate')],
      component: () => import('./views/plate/'),
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
    }, {
      path: '/workflow/inst/:id',
      models: () => [import('./models/workflow/approveForm')],
      component: () => import('./views/workflow/approveForm/'),
    }, {
      path: '/book',
      models: () => [import('./models/book')],
      component: () => import('./views/book/'),
    }, {
      path: '/book/edit/:id',
      models: () => [import('./models/book')],
      component: () => import('./views/book/Edit.js'),
    }, {
      path: '/devops',
      models: () => [import('./models/devops')],
      component: () => import('./views/devops/'),
    }, {
      path: '/operationLog',
      models: () => [import('./models/operationLog')],
      component: () => import('./views/operationLog/'),
    },
    {
      path: '/personal',
      models: () => [import('./models/person')],
      component: () => import('./views/personal/'),
    }, {
      path: '/modifyPassword',
      models: () => [import('./models/modifyPassword')],
      component: () => import('./views/modifyPassword/'),
    }, {
      path: '/userPostings',
      models: () => [import('./models/userPostings')],
      component: () => import('./views/userPostings/'),
    }, {
      path: '/userPostings/articleDetail/:id',
      models: () => [import('./models/article/articleDetail')],
      component: () => import('./views/userPostings/articleDetail'),
    }, {
      path: '/userPostings/resourceDetail/:id',
      models: () => [import('./models/resource/resourceDetail')],
      component: () => import('./views/userPostings/resourceDetail'),
    }, {
      path: '/share',
      models: () => [import('./models/resource/share')],
      component: () => import('./views/share/'),
    }, {
      path: '/share/field/:id',
      models: () => [import('./models/resource/field')],
      component: () => import('./views/share/field'),
    }, {
      path: '/searchResource/:field/:resourceType/:keyword',
      models: () => [import('./models/resource/searchResource')],
      component: () => import('./views/searchResource'),
    }, {
      path: '/upload/resourceupload',
      models: () => [import('./models/resource/resourceUpload')],
      component: () => import('./views/upload/resourceUpload/'),
    },{
    path: '/questionbar/question',
    models:() => [import('./models/questionbar/question')],
      component:() =>import('./views/questionbar/question/'), 
    },{
    path: '/questionbar/questioning',
    //  models:() => [import('./models/questionbar/questioning')],
      component:() =>import('./views/questionbar/questioning/'),  
    },{
    path: '/questionbar/questionandanswer',
    //  models:() => [import('./models/questionbar/questionandanswer')],
      component:() =>import('./views/questionbar/questionandanswer/'),
    },{
    path: '/questionbar/questionsearching',
    //  models:() => [import('./models/questionbar/questionsearching')],
      component:() =>import('./views/questionbar/questionsearching/'),
    },{
      path: '/laborVoice/:name',
        models: () => [import('./models/laborVoice')],
        component: () => import('./views/laborVoice'),
    },{
      path: '/teamBuilding/:name',
        models: () => [import('./models/teamBuilding/teamBuilding')],
        component: () => import('./views/teamBuilding'),
    }, {
    path: '/teamBuilding/activity/activityDetail/:id',
      models: () => [import('./models/teamBuilding/activityDetail')],
      component: () => import('./views/teamBuilding/activityDetail'),
    }, {
    path: '/teamBuilding/training/trainingDetail/:id',
      models: () => [import('./models/teamBuilding/trainingDetail')],
      component: () => import('./views/teamBuilding/trainingDetail'),
    }, {
      path: '/teamBuilding/poll/pollDetail/:id',
      models: () => [import('./models/teamBuilding/pollDetail')],
      component: () => import('./views/teamBuilding/pollDetail'),
    }, {
      path: '/upload/activityUpload',
      models: () => [import('./models/teamBuilding/activityUpload')],
      component: () => import('./views/upload/activityUpload'),
    }, {
      path: '/upload/trainingUpload',
      models: () => [import('./models/teamBuilding/trainingUpload')],
      component: () => import('./views/upload/trainingUpload'),
    }, {
    path: '/upload/newPoll',
      models: () => [import('./models/teamBuilding/newPoll')],
      component: () => import('./views/upload/newPoll'),
    }, {
      path: '/notifications',
        models: () => [import('./models/notifications')],
        component: () => import('./views/notifications'),
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
