import PropTypes from "prop-types"
import React, { useEffect, useCallback, useRef } from "react"

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
  const context = useContext(userRoleContext)
  const { adminRole, UserRole } = context
  console.log("dashboard======>>>>>>>", adminRole)

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
            {adminRole == "superadmin" && (
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
                <li style={{ color: "#02a499", marginLeft: "7px" }}>
                  {props.t("Promo Code")}{" "}
                </li>
                <li>
                  <Link to="/promo-code" className="waves-effect">
                    {/* <i className="ti-face-smile"></i> */}
                    <span>{props.t("Promo Code")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/promo-reports" className="waves-effect">
                    <span>{props.t("Promo Reports")}</span>
                  </Link>
                </li>
                <li
                  className=""
                  style={{ color: "#02a499", marginLeft: "7px" }}
                >
                  {props.t("Pricing Plan")}
                </li>
                <li>
                  <li>
                    <Link to="/pricingplan">{props.t("Pricing Plan")}</Link>
                  </li>
                </li>
              </div>
            )}

            { adminRole != "government" &&(
                <div>
                  <li style={{ color: "#02a499", marginLeft: "7px" }}>
                    {props.t("Tickets")}
                  </li>
                  <li>
                    <Link to="/#" className="has-arrow waves-effect">
                      <i className="ti-package"></i>
                      <span>{props.t("Tickets")}</span>
                    </Link>
                    <ul className="sub-menu" aria-expanded="false">
                      {/* <li>
                <Link to="/project">{props.t("Projects")}</Link>
              </li>
              */}
                      <li>
                        <Link to="/tickets">{props.t("All Tickets")}</Link>
                      </li>
                      <li>
                        <Link to="/cancel-ticket">
                          {props.t("Cancel Tickets")}
                        </Link>
                      </li>
                      <li>
                        <Link to="/reservation-reports">
                          {props.t("Reservation Reports")}
                        </Link>
                      </li>
                      {/* <li>
                <Link to="/teammember">{props.t("Team Members")}</Link>
              </li>
              <li>
                <Link to="/contact">{props.t("Contact Us")}</Link>
              </li> */}
                    </ul>
                  </li>
                </div>
              )}

            {/* websie-page */}

            {/* websie-page */}

            {/* tickets */}

            {/* tickets */}

            {/*  <li className="menu-title">{props.t("Components")}</li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-package"></i>
                <span>{props.t("UI Elements")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/ui-alerts">{props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="/ui-buttons">{props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="/ui-cards">{props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="/ui-carousel">{props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="/ui-dropdowns">{props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="/ui-grid">{props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="/ui-images">{props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="/ui-lightbox">{props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="/ui-modals">{props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="/ui-offcanvas">{props.t("Offcanvas")}</Link>
                </li>
                <li>
                  <Link to="/ui-rangeslider">{props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="/ui-session-timeout">
                    {props.t("Session Timeout")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-progressbars">{props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="/ui-tabs-accordions">
                    {props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-typography">{props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="/ui-video">{props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="/ui-general">{props.t("General")}</Link>
                </li>
                <li>
                  <Link to="/ui-colors">{props.t("Colors")}</Link>
                </li>
                <li>
                  <Link to="/ui-rating">{props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="/ui-utilities">{props.t("Utilities")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="waves-effect">
                <i className="ti-receipt"></i>
                <span className="badge rounded-pill bg-success float-end">
                  9
                </span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/form-elements">{props.t("Form Elements")}</Link>
                </li>
                <li>
                  <Link to="/form-validation">
                    {props.t("Form Validation")}
                  </Link>
                </li>
                <li>
                  <Link to="/form-advanced">{props.t("Form Advanced")}</Link>
                </li>
                <li>
                  <Link to="/form-editors">{props.t("Form Editors")}</Link>
                </li>
                <li>
                  <Link to="/form-uploads">{props.t("Form File Upload")} </Link>
                </li>
                <li>
                  <Link to="/form-xeditable">{props.t("Form Xeditable")}</Link>
                </li>
                <li>
                  <Link to="/form-repeater">{props.t("Form Repeater")}</Link>
                </li>
                <li>
                  <Link to="/form-wizard">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="/form-mask">{props.t("Form Mask")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-view-grid"></i>
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/tables-basic">{props.t("Basic Tables")}</Link>
                </li>
                <li>
                  <Link to="/tables-datatable">{props.t("Data Tables")}</Link>
                </li>
                <li>
                  <Link to="/tables-responsive">
                    {props.t("Responsive Table")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-editable">{props.t("Editable Table")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ti-face-smile"></i>
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/icons-materialdesign">
                    {props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">{props.t("Font awesome")}</Link>
                </li>
                <li>
                  <Link to="/icons-ion">{props.t("Ion Icons")}</Link>
                </li>
                <li>
                  <Link to="/icons-themify">{props.t("Themify Icons")}</Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-typicons">{props.t("Typicons Icons")}</Link>
                </li>
              </ul>
            </li> */}

            {adminRole == "superadmin" && (
              <div>
                <li style={{ color: "#02a499", marginLeft: "7px" }}>
                  Sub Admins
                </li>
                <li>
                  <Link to="/subadmins">
                    <span>{props.t("Sub Admins")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/report-subadmin">
                    <span>{props.t("Sub Admins Reports")}</span>
                  </Link>
                </li>
                <li style={{ color: "#02a499", marginLeft: "7px" }}>Reports</li>
                <li>
                  <Link to="/reports" className="waves-effect">
                    <span>{props.t("Reports")}</span>
                  </Link>
                </li>
                <li style={{ color: "#02a499", marginLeft: "7px" }}>
                  Social Media
                </li>
                <li>
                  <Link to="/social-media" className="waves-effect">
                    <span>{props.t("Social Media")}</span>
                  </Link>
                </li>
              </div>
            )}

            {adminRole == "government" && (
              <div>
                <li style={{ color: "#02a499", marginLeft: "7px" }}>Sales Reports</li>
                <li>
                  <Link to="/reports" className="waves-effect">
                    <span>{props.t("Reports")}</span>
                  </Link>
                </li>
              </div>
            )}
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
