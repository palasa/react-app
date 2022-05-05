import { lazy } from 'react'

const Dashboard = lazy(() => import('./Dashboard'))
const Login = lazy(() => import('./Login'))
const NotFound = lazy(() => import('./NotFound'))
const Settings = lazy(() => import('./Settings'))
const ArticleList = lazy(() => import('./Article'))
const ArticleEdit = lazy(() => import('./Article/Edit'))

export { Dashboard, Login, NotFound, Settings, ArticleList, ArticleEdit }
