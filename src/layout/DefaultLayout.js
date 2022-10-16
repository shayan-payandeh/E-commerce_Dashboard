import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Provider } from 'react-redux'
import configureStore from 'src/functions/redux/configureStore'

const DefaultLayout = (props) => {
  const store = configureStore()
  // console.log('store', store.getState())
  return (
    <Provider store={store}>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    </Provider>
  )
}

export default DefaultLayout
