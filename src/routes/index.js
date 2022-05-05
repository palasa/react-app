import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit
} from '../views'

export const mainRouter = [
  {
    path: '/login',
    element: Login
  },
  {
    path: '/404',
    element: NotFound
  },

]

export const adminRouter = [
  {
    path: '/dashboard',
    element: Dashboard
  },
  {
    path: '/settings',
    element: Settings
  },
  {
    path: '/article',
    element: ArticleList
  },
  {
    path: '/article/edit/:id',
    element: ArticleEdit
  }
]