import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Protected from './Protected'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const isAuth = false

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              exact
              path="/404"
              name="Page 404"
              element={
                // <Protected isAuthorized={isAuth}>
                <Page404 />
                // </Protected>
              }
            />
            <Route path="*" name="Home" element={<DefaultLayout />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
