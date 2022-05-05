import { Routes, Route, Navigate } from 'react-router-dom'
import { Component, Suspense } from 'react'
import { adminRouter } from './routes'
import { Loading } from './components'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>这里是公共的部分</h1>
        <Suspense fallback={<Loading />}>
          <Routes>
            {adminRouter.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}

            <Route
              path="/"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="/*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </div>
    )
  }
}
