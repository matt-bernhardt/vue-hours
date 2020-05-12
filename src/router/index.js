import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

function dynamicHoursData (route) {
  // return [{ id: 'foo', title: { $t: 'Bar' } }]
  return {
    sheets: []
  }
}

function dynamicPropsFn (route) {
  console.log('This is dynamicPropsFn')
  console.log(route)
  const now = new Date()
  return {
    name: (now.getFullYear() + parseInt(route.params.years)) + '!',
    sheets: [],
    foo: [],
    spreadsheetId: '1hK_4p-jx7dxW3RViRcBDSF_4En2QGgxx-Zy7zXkNIQg'
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: dynamicPropsFn
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    props: dynamicHoursData
  },
  {
    path: '/grid',
    name: 'Grid',
    component: () => import(/* webpackChunkName: "about" */ '../views/Grid.vue'),
    props: { sheets: Array }
  }
]

const router = new VueRouter({
  routes
})

export default router
