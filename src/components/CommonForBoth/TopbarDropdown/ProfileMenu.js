import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// users

import user2 from "assets/images/users/user-2.jpg"

import { API_URL, Image_URL, axiosApi } from "helpers/api_helper"


const ProfileMenu = props => {
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Admin")
  const [profilePic, setProfilePic] = useState()
  const [isprofilePic, setIsProfilePic] = useState(false)
  const [fullname, setFullName] = useState("")

  useEffect(() => {
    UserRoleAcess()
    // setAccessArrayState()
  }, [])
console.log("imageurl>????????????????",Image_URL)
  const UserRoleAcess = async () => {
    const token = JSON.parse(localStorage.getItem("authUser"))
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    try {
      await axiosApi
        .post(`${API_URL}admin/user-role`, {}, config)
        .then(async response => {
          console.log("response.data.data.image!!!!!!!!!!!!!!!",response.data.data.profilePic)
          setProfilePic(response.data.data.profilePic)
          if (response.data.data.profilePic) {
            setIsProfilePic(true)
          }

          setFullName(response.data.data.fullName)
          console.log(
            ">>>>>>>>>>>>>>>>>>>>>>>>>>headerrrrrrrrrr",
            response.data.data
          )
        })
        .catch(function (error) {
          /* toastError(error) */
        })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.displayName)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.username)
      }
    }
  }, [props.success])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          {isprofilePic && (
            <img
              className="rounded-circle header-profile-user"
              src={`${Image_URL}${profilePic}`}
              alt="Header Avatar"
            />
          )}
          {!isprofilePic && (
            <img
              className="rounded-circle header-profile-user"
              src={user2}
              alt="Header Avatar"
            />
          )}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem>
            <div>{fullname}</div>
          </DropdownItem>
          {/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem>  */}
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
