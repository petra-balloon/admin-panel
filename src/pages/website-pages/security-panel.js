import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Switch from "react-switch"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Form,
  FormFeedback,
  Input,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

import * as Yup from "yup"
import { useFormik } from "formik"

// actions
import { loginUser, apiError } from "../../store/actions"

import Loader from "components/Loader"
import userRoleContext from "context/userRole/userRole-context"
import { API_URL, axiosApi } from "helpers/api_helper"
import { toastError, toastSuccess } from "components/Utils"

const SecurityPanel = () => {
  const [tocken, setToken] = useState("")
  const [tockenId, setTokenId] = useState("")
  const [newtocken, setNewToken] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [singlebtn, setSinglebtn] = useState(false)
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

  const [subAdminData, setSubAdminData] = useState(false)
  const [subAdminName, setSubAdminName] = useState("")
  const [subAdminId, setSubAdminId] = useState("")
  const [agencyCode, setAgencyCode] = useState("Select SubAdmin")
  const [accessRoutes, setAccessRoutes] = useState([])

  const Offsymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        No
      </div>
    )
  }

  const OnSymbol = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "#fff",
          paddingRight: 2,
        }}
      >
        {" "}
        Yes
      </div>
    )
  }

  useEffect(() => {
    getSubadmin()
  }, [])

  //get subDamin

  const getSubadmin = async event => {
    setIsLoading(true)
    const token = JSON.parse(localStorage.getItem("authUser"))
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    try {
      await axiosApi
        .post(`${API_URL}admin/get-subadmin`, {}, config)
        .then(async response => {
          console.log("this is sunadmin", response.data.data)
          setSubAdminData(response.data.data)
          if (response.data.success) {
            /*  toastSuccess(response.data.message) */
            console.log(response.data)
          }
          setIsLoading(false)
        })
        .catch(function (error) {
          toastError(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const UpdateArray = async event => {
    try {
      //accessRoutes.push(event)
      if (!accessRoutes.includes(event)) {
        accessRoutes.push(event)
      }
      console.log("this is change>>>>>>?????????????", accessRoutes)
    } catch (error) {
      console.log(error)
    }
  }

  const getSubadminAcess = async event => {
    setIsLoading(true)
    console.log("event!!!!!!!!!!!!!", event)
    setDashboard(false);
    setPromoCode(false);
    setPromoReports(false);
    setPricingPlan(false);
    setPricingPlan(false);
    setAllTickets(false);
    setCancelTicket(false);
    setReservationReport(false);
    setSubAdmin(false);
    setSubAdminReports(false);
    setReports(false);
    setSocialMedia(false);
    setSecurity(false);


    try {
      await axiosApi
        .post(`${API_URL}admin/user-get-access`, { _id: event })
        .then(async response => {
          // console.log("this is sunadmin", response.data.data)
          console.log("consoel.log!!!!!!!!!!!!!!!!!!!!",response.data.data.acessArray)
          setAccessRoutes(response.data.data.acessArray)
          var stateAccessArray = response.data.data.acessArray
          stateAccessArray.forEach(url => {
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
          console.log("this is tocken!!!!!!!!!", response.data.data)
          setIsLoading(false)
        })
        .catch(function (error) {
          toastError(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const addAcessArray = async event => {
    setIsLoading(true)
    try {
      await axiosApi
        .post(`${API_URL}admin/edit-subadmin`, {
          _id: subAdminId,
          acessArray: accessRoutes,
        })
        .then(async response => {
          if (response.data.success) {
            toastSuccess(response.data.message)
          }
          setIsLoading(false)
        })
        .catch(function (error) {
          setIsLoading(false)
          toastError(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <React.Fragment>
      <div style={{ marginTop: "100px" }}>
        <Container>
          <Row>
            <Col lg={4}>
              {subAdminName != "" && (
                <div style={{ color: "red" }}>
                  use now editing credentials of {subAdminName}
                </div>
              )}
            </Col>
            <Col lg={4}>
              <Dropdown
                isOpen={singlebtn}
                toggle={() => setSinglebtn(!singlebtn)}
              >
                <DropdownToggle className="btn btn-secondary" caret>
                  {agencyCode} <i className="mdi mdi-chevron-down" />
                </DropdownToggle>
                <DropdownMenu>
                  {subAdminData &&
                    subAdminData.map(Details => (
                      <DropdownItem
                        onClick={async () => {
                          setSubAdminId(Details._id)
                          setAgencyCode(Details.fullName)
                          setSubAdminName(Details.fullName)
                          await getSubadminAcess(Details._id)
                        }}
                      >
                        {Details.fullName}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <div style={{ marginTop: "100px" }}></div>
          <Row>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Dashboard
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setDashboard(!dashboard)
                  if (dashboard == false) {
                    await UpdateArray("/dashboard")
                  }
                }}
                checked={dashboard}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Promo Code
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setPromoCode(!promoCode)
                  if (promoCode == false) {
                    await UpdateArray("/promo-code")
                  }
                }}
                checked={promoCode}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Promo Reports
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setPromoReports(!promoReports)
                  if (promoReports == false) {
                    await UpdateArray("/promo-reports")
                  }
                }}
                checked={promoReports}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Pricing Plan
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setPricingPlan(!pricingPlan)
                  if (pricingPlan == false) {
                    await UpdateArray("/pricingplan")
                  }
                }}
                checked={pricingPlan}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  All Tickets
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setAllTickets(!allTickets)
                  if (allTickets == false) {
                    await UpdateArray("/tickets")
                  }
                }}
                checked={allTickets}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Cancel Tickets
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setCancelTicket(!cancelTickets)
                  if (cancelTickets == false) {
                    await UpdateArray("/cancel-ticket")
                  }
                }}
                checked={cancelTickets}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Reservation Report
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setReservationReport(!reservationReport)
                  if (reservationReport == false) {
                    await UpdateArray("/reservation-reports")
                  }
                }}
                checked={reservationReport}
              />
            </Col>
            <Col lg={1}></Col>

            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Sub Admins
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setSubAdmin(!subAdmin)
                  if (subAdmin == false) {
                    await UpdateArray("/subadmins")
                  }
                }}
                checked={subAdmin}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Sub Admin Reports
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setSubAdminReports(!subAdminReports)
                  if (subAdminReports == false) {
                    await UpdateArray("/report-subadmin")
                  }
                }}
                checked={subAdminReports}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Report
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setReports(!reports)
                  if (reports == false) {
                    await UpdateArray("/reports")
                  }
                }}
                checked={reports}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Social Media
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setSocialMedia(!social)
                  if (social == false) {
                    await UpdateArray("/social-media")
                  }
                }}
                checked={social}
              />
            </Col>
            <Col lg={1}></Col>
            <Col lg={2}>
              <div className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "20px" }}
                >
                  Security
                </Label>
              </div>
            </Col>
            <Col lg={1}>
              <Switch
                uncheckedIcon={<Offsymbol />}
                checkedIcon={<OnSymbol />}
                onColor="#02a499"
                onChange={async () => {
                  setSecurity(!security)
                  if (security == false) {
                    await UpdateArray("/security-panel")
                  }
                }}
                checked={security}
              />
            </Col>
            <Col lg={1}></Col>
          </Row>
          <Row>
            <Col lg={4}></Col>
            <Col lg={4}>
              <button
                className="btn btn-primary w-md waves-effect waves-light"
                style={{ marginTop: "50px" }}
                onClick={async () => {
                  await addAcessArray()
                }}
              >
                Edit Access
              </button>
            </Col>
          </Row>
          <Loader isLoading={isLoading} />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default SecurityPanel
