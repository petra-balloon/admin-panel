import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { API_URL, axiosApi } from "helpers/api_helper"
import { toastError, toastSuccess } from "components/Utils"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
} from "reactstrap"
import { Link } from "react-router-dom"

// Custom Scrollbar
import SimpleBar from "simplebar-react"

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png"
import servicesIcon2 from "../../assets/images/services-icon/02.png"
import servicesIcon3 from "../../assets/images/services-icon/03.png"
import servicesIcon4 from "../../assets/images/services-icon/04.png"

import "chartist/dist/scss/chartist.scss"

//i18n
import { withTranslation } from "react-i18next"
import Moment from "react-moment"
import Loader from "components/Loader"

const PromoReports = props => {
  const [singlebtn, setSinglebtn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [promoData, setPromoData] = useState([])
  const [totalUpholdenDiscount, setTotalUpholdenDiscount] = useState(0)
  const [totalNUmberofUpholden, setTotalNUmberofUpholden] = useState(0)
  const [cancelTotalDiscount, setCancelTotalDicount] = useState(0)
  const [totalNumberOfCancelTicket, settotalNumberOfCancelTicket] = useState(0)
  const [ticketArray, setTicketArray] = useState([])
  const [menu, setMenu] = useState(false)

  const [agencyId, setAgencyId] = useState("")
  const [agencyCode, setAgencyCode] = useState("Select Agency")
  const [singletDate, setSingleDate] = useState(new Date())

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  console.log("this is start date", startDate)

  const toggle = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    // getDashboardData()
    getPromoData()
  }, [])

  const getPromoData = async event => {
    setIsLoading(true)
    const token = JSON.parse(localStorage.getItem("authUser"))
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    try {
      await axiosApi
        .get(`${API_URL}promocode/get`, {}, config)
        .then(async response => {
          console.log("this is promo data", response.data.data)
          setPromoData(response.data.data)
          setIsLoading(false)
        })
        .catch(function (error) {
          toastError(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const getPromoDataSingleDate = async event => {
    setIsLoading(true)
    const token = JSON.parse(localStorage.getItem("authUser"))
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    try {
      await axiosApi
        .post(
          `${API_URL}promocode/singledate-promo`,
          { promo_id: agencyId, singleDate: singletDate },
          config
        )
        .then(async response => {
          console.log(
            "this is promo data>>>>>>>>>>>>>>>>>>>>>>>",
            response.data.data
          )
          setTotalUpholdenDiscount(response.data.data.upholdenDiscount)
          setTotalNUmberofUpholden(response.data.data.totalNUmberofUpholden)
          setCancelTotalDicount(response.data.data.cancelTotalDiscount)
          settotalNumberOfCancelTicket(
            response.data.data.totalNumberOfCancelTicket
          )
          setTicketArray(response.data.data.todayTicketList)
          setIsLoading(false)
        })
        .catch(function (error) {
          toastError(error)
        })
    } catch (error) {
      console.error(error)
    }
  }
  const getPromoDataBetweenDate = async event => {
    setIsLoading(true)
    const token = JSON.parse(localStorage.getItem("authUser"))
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    try {
      await axiosApi
        .post(
          `${API_URL}promocode/betweendate-promo`,
          { promo_id: agencyId, startDate: startDate, endDate: endDate },
          config
        )
        .then(async response => {
          console.log(
            "this is promo data>>>>>>>>>>>>>>>>>>>>>>>",
            response.data.data
          )
          setTotalUpholdenDiscount(response.data.data.upholdenDiscount)
          setTotalNUmberofUpholden(response.data.data.totalNUmberofUpholden)
          setCancelTotalDicount(response.data.data.cancelTotalDiscount)
          settotalNumberOfCancelTicket(
            response.data.data.totalNumberOfCancelTicket
          )
          setTicketArray(response.data.data.todayTicketList)
          setIsLoading(false)
        })
        .catch(function (error) {
          toastError(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  /*   const getDashboardData = async event => {
    setIsLoading(true)
    const token = JSON.parse(localStorage.getItem("authUser"))
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    try {
      await axiosApi
        .post(`${API_URL}promocode/today-promo`, {}, config)
        .then(async response => {
          console.log("this is dashboard data", response.data.data)
          setTotalTodayAmount(response.data.data.todayTotal)
          setTotalNUmberofUpholden(response.data.data.totalNUmberofUpholden)
          setCancelTotalAmount(response.data.data.cancelTotal)
          settotalNumberOfCancelTicket(response.data.data.totalNumberOfCancelTicket)
          setTicketArray(response.data.data.todayTicketList)
          setIsLoading(false)
        })
        .catch(function (error) {
          toastError(error)
        })
    } catch (error) {
      console.error(error)
    }
  } */

  document.title = "Dashboard | Petra Balloon"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col lg={2}>
                <h6 className="page-title">promo Dashboard</h6>
              </Col>
              <Col lg={2}>
                <Dropdown
                  isOpen={singlebtn}
                  toggle={() => setSinglebtn(!singlebtn)}
                >
                  <DropdownToggle className="btn btn-secondary" caret>
                    {agencyCode} <i className="mdi mdi-chevron-down" />
                  </DropdownToggle>
                  <DropdownMenu>
                    {promoData &&
                      promoData.map(Details => (
                        <DropdownItem
                          onClick={() => {
                            setAgencyId(Details._id)
                            setAgencyCode(Details.promo_code)
                          }}
                        >
                          {Details.agency_name} | {Details.promo_name} |{" "}
                          {Details.promo_code}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col>
                <DatePicker
                  selected={singletDate}
                  onChange={date => setSingleDate(date)}
                />
              </Col>
              <Col>
                <Button
                  color="success"
                  className="btn btn-success waves-effect waves-light"
                  onClick={async () => {
                    await getPromoDataSingleDate()
                    await getPromoData()
                  }}
                >
                  Success
                </Button>{" "}
              </Col>
              <Col>
                <label>Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                />
              </Col>
              <Col>
                <label>End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                />
              </Col>
              <Col>
                <Button
                  color="success"
                  className="btn btn-success waves-effect waves-light"
                  onClick={async () => {
                    await getPromoDataBetweenDate()
                    await getPromoData()
                  }}
                >
                  Success
                </Button>{" "}
              </Col>
            </Row>
          </div>
          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Tickets UpHolden
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {totalNUmberofUpholden}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-success">
                      {/* <p className="mb-0">+ 12%</p> */}
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Total Discount
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      <i className="mdi mdi-arrow-down text-danger ms-2">
                        {totalUpholdenDiscount}
                      </i>
                    </h4>
                    <div className="mini-stat-label bg-danger">
                      <p className="mb-0">100%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Cancel Dicount
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {totalNumberOfCancelTicket}{" "}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-info">
                      {/* <p className="mb-0"> 00%</p> */}
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon4} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Cancel Amount
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {cancelTotalDiscount}{" "}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-warning">
                      {/*  <p className="mb-0">+ 84%</p> */}
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Latest Receipts</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Ticket Number(#)</th>
                          <th scope="col">Name</th>
                          <th scope="col">Selected Pass</th>
                          <th scope="col">Reservation Date</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Discount</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ticketArray &&
                          ticketArray.map(Details => (
                            <tr>
                              <th scope="row">{Details.ticket_number}</th>
                              <td>
                                <div>
                                  {Details.first_name} {Details.last_name}
                                </div>
                              </td>
                              <td>
                                <div>{Details.selected_pass}</div>
                              </td>
                              <td>
                                <Moment format="D/MMM/YYYY">
                                  {Details.created_date}
                                </Moment> 
                                {/* {moment(Details.date).format(D/MMM/YYYY)} */}
                              </td>
                              <td>{Details.total_amount}</td>
                              <td>{Details.discount_amount}</td>
                              <td>
                                {Details.ticket_status == "upholden" && (
                                  <span className="badge bg-success">
                                    upholden
                                  </span>
                                )}
                                {Details.ticket_status == "cancel" && (
                                  <span className="badge bg-danger">
                                    Cancel
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Loader isLoading={isLoading} />
        </Container>
      </div>
    </React.Fragment>
  )
}

/* Dashboard.propTypes = {
  t: PropTypes.any,
} */

export default withTranslation()(PromoReports)
