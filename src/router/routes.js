import AuthGuard from './auth-guard'

export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'signup', component: () => import('pages/user/signup') },
      { path: 'signin', component: () => import('pages/user/signin') },
      { path: 'profile', component: () => import('pages/user/profile'), beforeEnter: AuthGuard },
      { path: 'settings', component: () => import('pages/user/settings'), beforeEnter: AuthGuard },
      { path: 'dashboard', component: () => import('pages/dashboard/dashboard'), beforeEnter: AuthGuard },
      // { path: 'messages', component: () => import('pages/message/messages'), beforeEnter: AuthGuard },
      { path: 'compose', component: () => import('pages/message/compose'), props: true, beforeEnter: AuthGuard },
      { path: 'chat', component: () => import('pages/message/Tchat'), beforeEnter: AuthGuard },
      { path: 'businesses', component: () => import('pages/businesses/busList'), beforeEnter: AuthGuard },
      { path: 'businesses/:id', component: () => import('pages/businesses/busEditor'), props: true, beforeEnter: AuthGuard },
      { path: 'bdesign', component: () => import('pages/businesses/busDesigner'), beforeEnter: AuthGuard },
      { path: 'idesign', component: () => import('pages/ideas/ideaDesigner'), beforeEnter: AuthGuard },
      { path: 'ideas', component: () => import('pages/ideas/ideas'), beforeEnter: AuthGuard },
      { path: 'invsearch', component: () => import('pages/investments/invSearch'), beforeEnter: AuthGuard },
      { path: 'invested', component: () => import('pages/investments/invBusList'), beforeEnter: AuthGuard },
      { path: 'browse', component: () => import('pages/pods/podBrowser'), beforeEnter: AuthGuard },
      { path: 'feedback', component: () => import('pages/pods/podFeedback'), beforeEnter: AuthGuard }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
