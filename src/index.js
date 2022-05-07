import { createRoot } from 'react-dom/client'
import { Routes, HashRouter as Router, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { mainRoutes } from './routes'
import { Loading } from './components'
import './index.less'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const App = lazy(() => import('./App'))

const root = createRoot(document.getElementById('root'))
root.render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/admin/*" element={<App />} />

          {mainRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}

          {/* redirects */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </Router>
  </ConfigProvider>
)
