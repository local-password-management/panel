import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/pages/Dashboard'
import List from '@/components/passpages/List'
import Create from '@/components/passpages/Create'
import Edit from '@/components/passpages/Edit'
import NotFound from '@/components/pages/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          name: 'list',
          component: List
        },
        {
          path:'/create',
          name:'create',
          component:Create
        },
        {
          path:'/edit/:id',
          name:'edit',
          component:Edit
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
});

export default router;


