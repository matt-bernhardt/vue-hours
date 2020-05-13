import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/grid',
    name: 'Grid',
    component: () => import(/* webpackChunkName: "about" */ '../views/Grid.vue')
  },
  {
    path: '/study',
    name: 'Study',
    component: () => import(/* webpackChunkName: "about" */ '../views/Study.vue')
  },
  {
    path: '/location',
    name: 'Location index',
    component: () => import(/* webpackChunkName: "about" */ '../views/LocationIndex.vue')
  },
  {
    path: '/location/:id',
    name: 'Single location',
    component: () => import(/* webpackChunkName: "about" */ '../views/Location.vue')
  },
  {
    path: '/department',
    name: 'Department',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Department.vue')
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import(/* webpackChunkName: "about" */ '../views/Data.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
