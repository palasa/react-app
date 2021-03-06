import { Routes, Route, Navigate } from 'react-router-dom'
import { Component, Suspense } from 'react'
import { adminRoutes } from './routes'
import { Loading, Frame } from './components'

export default class App extends Component {
  render() {
    return (
      <Frame>
        <Suspense fallback={<Loading />}>
          <Routes>
            {adminRoutes.map(route => (
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
      </Frame>
    )
  }
}
