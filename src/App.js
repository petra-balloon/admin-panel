import PropTypes from "prop-types"
import React, { useContext, useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { connect } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// Import Routes all
import {
  userRoutes,
  authRoutes,
  subAdminRoutes,
  governmentRoutes,
} from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
//import { userRole } from "helpers/api_helper"
import Dashboard from "pages/Dashboard"
import Login from "pages/Authentication/Login"
import UserRoleState from "./context/userRole/userRole-state"
import PricingPlan from "pages/website-pages/pricing-plan"
import userRoleContext from "context/userRole/userRole-context"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

// Activating fake backend

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = () => {
  /* const [adminRole, setAdminRole] = useState("") */

  const context = useContext(userRoleContext)
  const { adminRole, UserRole, accessArray } = context
  console.log("adminRole======>>>>>>>", adminRole)
  console.log("AcesssArrayRole======>>>>>>>", accessArray)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authUser"))

    if (token === null || undefined) {
    } else {
      UserRole(token)
    }
  }, [])

  // This is the hasPermission function, which checks if the user has permission to access a specific route.
  const hasPermission = routePath => {
    // For the sake of the example, we'll hard-code a user's permissions here.
    // In a real-world application, this array should come from your backend after authentication.
    //const userPermissions = ["/reports", "/tickets"]

    return accessArray.includes(routePath)
  }

  // Now, let's filter the routes based on the user's permissions.
  const filteredRoutes = userRoutes.filter(route => hasPermission(route.path))

  // Now, filteredRoutes will only contain the routes that the user has permission to access.

  // You can use filteredRoutes to render your routes. For example, using React Router:

  return (
    <React.Fragment>
      <Routes>
        <Route>
          {authRoutes.map((route, idx) => {
            return (
              <Route
                path={route.path}
                element={<NonAuthLayout>{route.component}</NonAuthLayout>}
                key={idx}
                exact={true}
              />
            )
          })}
        </Route>
        <Route>
          {userRoutes.map((route, idx) => (
            <Route
              path={adminRole == "superadmin"  && route.path}
              element={
                <Authmiddleware>
                  {adminRole == "superadmin"  &&  route.component}
                </Authmiddleware>
              }
              exact={true}
            />
          ))}
          {filteredRoutes.map((route, idx) => (
            <Route
              path={adminRole == "subadmin" && route.path}
              element={
                <Authmiddleware>
                  {adminRole == "subadmin" && route.component}
                </Authmiddleware>
              }
              exact={true}
            />
          ))}
        </Route>
        {/* <Route path={"/dashboard"} element={<Dashboard />} exact={true} /> */}
        {/* <Route path={"/logins"} element={<Login />} exact={true} /> */}

        {/*     <Route>
          {userRoutes.map((route, idx) => (
            <Route
              path={adminRole == "superadmin" && route.path}
              element={
                <Authmiddleware>
                  {adminRole == "superadmin" && route.component}
                </Authmiddleware>
              }
              exact={true}
            />
          ))}
        </Route> */}
        {/*  <Route>
          {subAdminRoutes.map((route, idx) => (
            <Route
              path={adminRole == "subadmin" && route.path}
              element={
                <Authmiddleware>
                  {adminRole == "subadmin" && route.component}
                </Authmiddleware>
              }
              exact={true}
            />
          ))}
        </Route> */}
        {/*  <Route>
          {governmentRoutes.map((route, idx) => (
            <Route
              path={adminRole == "government" && route.path}
              element={
                <Authmiddleware>
                  {adminRole == "government" && route.component}
                </Authmiddleware>
              }
              exact={true}
            />
          ))}
        </Route> */}
      </Routes>
      <ToastContainer />
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
