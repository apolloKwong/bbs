const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const SERVICES = '/services'

module.exports = {
  name: 'bbs',
  prefix: 'as',
  footerText: 'BBS © 2017 BBS',
  logo: '/blue-xl.png',
  CORS: [],
  openPages: ['/login', '/internet', '/forum', '/personal','/modifyPassword','/writearticle'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  SERVICES,
  api: {
    userLogin: `${SERVICES}/security/login`,
    userLogout: `${SERVICES}/security/logout`,
    authInfo: `${SERVICES}/security/authInfo`,
    menus: `${SERVICES}/menu/navbar`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
