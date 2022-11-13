/* eslint-disable */

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/App'
import store from './store'
import { BrowserRouter } from 'react-router-dom'

import 'normalize.css'
import 'antd/dist/antd.min.css'

import './index.module.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
