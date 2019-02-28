import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/pages/Dashboard'
import NotFound from '@/components/pages/NotFound'
import List from '@/components/passpages/List'
import Create from '@/components/passpages/Create'
import Edit from '@/components/passpages/Edit'
import CreateField from '@/components/envpages/CreateField'

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
        },
        {
          path:'/createfield/:id',
          name:'createfield',
          component:CreateField
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


