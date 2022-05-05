import { createRoot } from 'react-dom/client'
import { Routes, HashRouter as Router, Route, Navigate } from 'react-router-dom'
import App from './App'
import { mainRouter } from './routes'
import './index.less'


const root = createRoot(document.getElementById('root'))
root.render(
  <Router>
    <Routes>
      <Route path='/admin/*' element={<App/>} />
      { mainRouter.map(route=><Route key={route.path} path={route.path} element={<route.element/>}/>) }

      {/* redirects */}
      <Route path='/' element={<Navigate to='/admin' replace/>} />
      <Route path='*' element={<Navigate to='/404' replace/>} />
    </Routes>
  </Router>
)
