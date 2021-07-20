import Vue from 'vue'
import VueRouter from 'vue-router'

import routerPath from "./routes/routePath"

const Home = () => import("@/views/home/Home")
const Search = () => import("@/views/search/Search")

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect: routerPath.HOME
  },
  {
    path: routerPath.HOME,
    component: Home
  },
  {
    path: routerPath.SEARCH,
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
