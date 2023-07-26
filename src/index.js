import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"

import store from "./store"
import UserRoleState from "context/userRole/userRole-state"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <UserRoleState>
        <App />
      </UserRoleState>
    </BrowserRouter>
  </Provider>
)

serviceWorker.unregister()
