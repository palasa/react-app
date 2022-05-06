import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit,
} from '../views'

import {
  DashboardOutlined,
  ReadOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons'

export const mainRoutes = [
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/404',
    element: NotFound,
  },
]

export const adminRoutes = [
  {
    path: '/dashboard',
    element: Dashboard,
    title: '仪表盘',
    icon: <DashboardOutlined />,
    isNav: true,
  },
  {
    path: '/article',
    element: ArticleList,
    title: '文章列表',
    icon: <ReadOutlined />,
    isNav: true,
  },
  {
    path: '/article/edit/:id',
    element: ArticleEdit,
    title: '文章管理',
    icon: <EditOutlined />,
    isNav: true,
  },
  {
    path: '/settings',
    element: Settings,
    icon: <UserOutlined />,
    title: '设置',
    isNav: true,
  },
]
