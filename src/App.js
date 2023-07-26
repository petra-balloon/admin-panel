import PropTypes from "prop-types"
import React, { useContext, useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { connect } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// Import Routes all
import { userRoutes, authRoutes, subAdminRoutes } from "./routes/allRoutes"

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
  const { adminRole, UserRole } = context
  console.log("adminRole======>>>>>>>", adminRole)

  useEffect(() => {
      const token = JSON.parse(localStorage.getItem("authUser"))

    if (token === null || undefined) {
    } else {
      UserRole(token)
    }
  }, [])
  /*   const showUserRole = async () => {
    const token = JSON.parse(localStorage.getItem("authUser"))
    if (token !== null) {
      const response = await userRole(token)
      console.log("response==>>>>", response)
      setAdminRole(response.data.role)
    } 
  } */

  // const UserRole = async event => {
  //   /* setIsLoading(true) */
  //   const token = JSON.parse(localStorage.getItem("authUser"))
  //   console.log("token>>>>>>>>>>>>>>>>>>", token)
  //   const config = {
  //     headers: {
  //       authorization: `bearer ${token}`,
  //     },
  //   }
  //   try {
  //     await axiosApi
  //       .post(`${API_URL}admin/user-role`, {}, config)
  //       .then(async response => {
  //         console.log(response.data.data.role)
  //         setAdminRole(response.data.data.role)
  //         if (response.data.success) {
  //           /*  toastSuccess(response.data.message) */
  //           console.log(response.data)
  //         }
  //         /* setIsLoading(false) */
  //       })
  //       .catch(function (error) {
  //         /* toastError(error) */
  //       })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
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
        {/* <Route path={"/dashboard"} element={<Dashboard />} exact={true} /> */}
        {/* <Route path={"/logins"} element={<Login />} exact={true} /> */}

        <Route>
          {
            userRoutes.map((route, idx) => (
              <Route
                path={adminRole == "superadmin" &&route.path}
                element={<Authmiddleware>{adminRole == "superadmin" && route.component}</Authmiddleware>}
                exact={true}
              />
            ))}
        </Route>
        <Route>
          {
            subAdminRoutes.map((route, idx) => (
              <Route
                path={adminRole == "subadmin" &&route.path}
                element={<Authmiddleware>{adminRole == "subadmin" && route.component}</Authmiddleware>}
                exact={true}
              />
            ))}
        </Route>
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
