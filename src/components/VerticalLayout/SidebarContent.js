import PropTypes from "prop-types"
import React, { useEffect, useCallback, useRef, useState } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import withRouter from "components/Common/withRouter"
import { Link, useLocation } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { useContext } from "react"
import userRoleContext from "context/userRole/userRole-context"

const SidebarContent = props => {
  const [dashboard, setDashboard] = useState(false)
  const [promoCode, setPromoCode] = useState(false)
  const [promoReports, setPromoReports] = useState(false)
  const [pricingPlan, setPricingPlan] = useState(false)
  const [allTickets, setAllTickets] = useState(false)
  const [cancelTickets, setCancelTicket] = useState(false)
  const [reservationReport, setReservationReport] = useState(false)
  const [subAdmin, setSubAdmin] = useState(false)
  const [subAdminReports, setSubAdminReports] = useState(false)
  const [reports, setReports] = useState(false)
  const [social, setSocialMedia] = useState(false)
  const [security, setSecurity] = useState(false)
  const context = useContext(userRoleContext)
  const { adminRole, UserRole, accessArray } = context
  console.log("dashboard======>>>>>>>", adminRole)
  console.log("dashboard======>>>>>>>", accessArray)

  useEffect(() => {
    setAccessArrayState()
  }, [])

  const setAccessArrayState = async () => {
    await accessArray?.forEach(url => {
      switch (url) {
        case "/dashboard":
          setDashboard(true)
          break
        case "/promo-code":
          setPromoCode(true)
          break
        case "/promo-reports":
          setPromoReports(true)
          break
        case "/pricingplan":
          setPricingPlan(true)
          break
        case "/tickets":
          setAllTickets(true)
          break
        case "/cancel-ticket":
          setCancelTicket(true)
          break
        case "/reservation-reports":
          setReservationReport(true)
          break
        case "/subadmins":
          setSubAdmin(true)
          break
        case "/report-subadmin":
          setSubAdminReports(true)
          break
        case "/reports":
          setReports(true)
          break
        case "/social-media":
          setSocialMedia(true)
          break
        case "/security-panel":
          setSecurity(true)
          break
        default:
          break
      }
    })
  }

  const location = useLocation()
  const ref = useRef()
  const path = location.pathname

  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag
        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active") // li
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement // ul
            if (parent4) {
              parent4.classList.remove("mm-show") // ul
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show") // li
                parent5.childNodes[0].classList.remove("mm-active") // a tag
              }
            }
          }
        }
      }
    }
  }

  const activeMenu = useCallback(() => {
    const pathName = location.pathname
    const fullPath = pathName
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (fullPath === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    new MetisMenu("#side-menu")
    activeMenu()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
              {adminRole === "superadmin" || dashboard ? (
                <div>
                  <li style={{ color: "#02a499", marginLeft: "7px" }}>
                    {props.t("Main")}{" "}
                  </li>

                  <li>
                    <Link to="/dashboard" className="waves-effect">
                      <i className="ti-home"></i>
                      <span>{props.t("Dashboard")}</span>
                    </Link>
                  </li>
                </div>
              ) : null}
              {adminRole === "superadmin" || promoCode || promoReports ? (
                <li style={{ color: "#02a499", marginLeft: "7px" }}>
                  {props.t("Promo Code")}{" "}
                </li>
              ) : null}

              {adminRole === "superadmin" || promoCode ? (
                <li>
                  <Link to="/promo-code" className="waves-effect">
                    {/* <i className="ti-face-smile"></i> */}
                    <span>{props.t("Promo Code")}</span>
                  </Link>
                </li>
              ) : null}
              {adminRole === "superadmin" || promoReports ? (
                <li>
                  <Link to="/promo-reports" className="waves-effect">
                    <span>{props.t("Promo Reports")}</span>
                  </Link>
                </li>
              ) : null}
              {adminRole === "superadmin" || pricingPlan ? (
                <div>
                  {" "}
                  <li
                    className=""
                    style={{ color: "#02a499", marginLeft: "7px" }}
                  >
                    {props.t("Pricing Plan")}
                  </li>
                    <li>
                      <Link to="/pricingplan">{props.t("Pricing Plan")}</Link>
                    </li>
                </div>
              ) : null}
              {adminRole === "superadmin" || allTickets ? (
                <li style={{ color: "#02a499", marginLeft: "7px" }}>
                  {props.t("Tickets")}
                </li>
              ) : null}
              {adminRole === "superadmin" ||
              allTickets ||
              cancelTickets ||
              reservationReport ? (
                <li>
                  <Link to="/tickets">{props.t("All Tickets")}</Link>
                </li>
              ) : null}
              {/*  <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="ti-package"></i>
                  <span>{props.t("Tickets")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false"> */}
              {/* <li>
                <Link to="/project">{props.t("Projects")}</Link>
              </li>
              */}
              {adminRole === "superadmin" || cancelTickets ? (
                <li>
                  <Link to="/cancel-ticket">{props.t("Cancel Tickets")}</Link>
                </li>
              ) : null}
              {adminRole === "superadmin" || reservationReport ? (
                <li>
                  <Link to="/reservation-reports">
                    {props.t("Reservation Reports")}
                  </Link>
                </li>
              ) : null}
              {adminRole === "superadmin" || subAdmin || subAdminReports ? (
                <li style={{ color: "#02a499", marginLeft: "7px" }}>
                  Sub Admins
                </li>
              ) : null}
              {adminRole === "superadmin" || subAdmin ? (
                <li>
                  <Link to="/subadmins">
                    <span>{props.t("Sub Admins")}</span>
                  </Link>
                </li>
              ) : null}
              {adminRole === "superadmin" || subAdminReports ? (
                <li>
                  <Link to="/report-subadmin">
                    <span>{props.t("Sub Admins Reports")}</span>
                  </Link>
                </li>
              ) : null}
              {adminRole === "superadmin" || reports ? (
                <div>
                  <li style={{ color: "#02a499", marginLeft: "7px" }}>
                    Sales Reports
                  </li>
                  <li>
                    <Link to="/reports" className="waves-effect">
                      <span>{props.t("Reports")}</span>
                    </Link>
                  </li>
                </div>
              ) : null}
              {adminRole === "superadmin" || social ? (
                <div>
                  <li style={{ color: "#02a499", marginLeft: "7px" }}>
                    Social Media
                  </li>
                  <li>
                    <Link to="/social-media" className="waves-effect">
                      <span>{props.t("Social Media")}</span>
                    </Link>
                  </li>
                </div>
              ) : null}
            {/* <div>
              <li style={{ color: "#02a499", marginLeft: "7px" }}>
                Sales Reports
              </li>
              <li>
                <Link to="/reports" className="waves-effect">
                  <span>{props.t("Reports")}</span>
                </Link>
              </li>
            </div> */}
            {adminRole === "superadmin" || security ? (
            <div>
              <li style={{ color: "#02a499", marginLeft: "7px" }}>Settings</li>
              <li>
                <Link to="/security-panel" className="waves-effect">
                  <span>{props.t("Security")}</span>
                </Link>
              </li>
            </div>
            ) : null}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
