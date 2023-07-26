import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { API_URL, axiosApi } from "helpers/api_helper"
import { toastError, toastSuccess } from "components/Utils"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import Switch from "react-switch"

import { utils, writeFile } from "xlsx"

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

const SubAdminReports = props => {
  const [singlebtn, setSinglebtn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [promoData, setPromoData] = useState([])
  const [totalUpholdenDiscount, setTotalUpholdenDiscount] = useState(0)
  const [totalNUmberofUpholden, setTotalNUmberofUpholden] = useState(0)
  const [cancelTotalDiscount, setCancelTotalDicount] = useState(0)
  const [totalUpholdenAmount, setTotalUpholdenAmount] = useState(0)
  const [totalNumberOfCancelTicket, settotalNumberOfCancelTicket] = useState(0)
  const [ticketArray, setTicketArray] = useState([])
  const [menu, setMenu] = useState(false)
  const [subAdminData, setSubAdminData] = useState(false)

  const [subAdminId, setSubAdminId] = useState("")
  const [agencyCode, setAgencyCode] = useState("Select SubAdmin")
  const [singletDate, setSingleDate] = useState(new Date())

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  console.log("this is start date", startDate)

  const [switch3, setswitch3] = useState(false)

  useEffect(() => {
    // getDashboardData()
    getSubAdminData()
  }, [])

  const getSubAdminData = async event => {
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
          console.log("this is promo data", response.data.data)
          setSubAdminData(response.data.data)
          setIsLoading(false)
        })
        .catch(function (error) {
          toastError(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  function generateXLSXFile() {
    // Create a new workbook
    const workbook = utils.book_new()

    const dataArray = ticketArray.map(item => [
      item.ticket_number,
      item.first_name,
      item.last_name,
      item.mobile,
      item.email,
      item.selected_pass,
      item.created_at,
      item.date,
      item.total_amount,
      item.ticket_status,
      [item.reservation_details.map(i => i.type + i.quantity)],
    ])
    // Create a new worksheet
    /*  const worksheet = utils.aoa_to_sheet([
      ['Name', 'Age', 'Email'],
      ['John', 25, 'john@example.com'],
      ['Jane', 30, 'jane@example.com'],
      ['Sam', 40, 'sam@example.com'],
    ]); */
    /*   const worksheet = utils.aoa_to_sheet([
        ['Name', 'Age', 'Email'],
        ['John', 25, 'john@example.com'],
        ['Jane', 30, 'jane@example.com'],
        ['Sam', 40, 'sam@example.com'],
      ]); */

    const worksheet = utils.aoa_to_sheet([
      [
        "Ticket Number",
        "First Name",
        "Last Name",
        "Mobile Number",
        "Email",
        "Selected Pass",
        "Booking Date",
        "Reservation Date",
        "Total Amount",
        "Status",
        "Reservation Details",
      ],
      ...dataArray,
    ])

    // Add the worksheet to the workbook
    utils.book_append_sheet(workbook, worksheet, "Sheet1")

    // Generate the XLSX file
    writeFile(workbook, "mydata.xlsx")
  }

  const toggle = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    // getDashboardData()
    //getPromoData()
  }, [])

  const getReportDataSingleDate = async event => {
    setIsLoading(true)
    const token = JSON.parse(localStorage.getItem("authUser"))
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    try {
      var url = "ticket/singledate-reports/subadmin"

      await axiosApi
        .post(
          `${API_URL}${url}`,
          { singleDate: singletDate, shifter_id: subAdminId },
          config
        )
        .then(async response => {
          console.log(
            "this is promo data>>>>>>>>>>>>>>>>>>>>>>>",
            response.data.data
          )
          setTotalUpholdenDiscount(response.data.data.upholdenDiscount)
          setTotalUpholdenAmount(response.data.data.upholdenTotal)
          setTotalNUmberofUpholden(response.data.data.totalNUmberofUpholden)
          setCancelTotalDicount(response.data.data.cancelTotal)
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
  const getReportDataBetweenDate = async event => {
    setIsLoading(true)
    const token = JSON.parse(localStorage.getItem("authUser"))
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    try {
      var url = "ticket/betweendate-reports/subadmin"

      await axiosApi
        .post(
          `${API_URL}${url}`,
          { startDate: startDate, endDate: endDate, shifter_id: subAdminId },
          config
        )
        .then(async response => {
          console.log(
            "this is promo data>>>>>>>>>>>>>>>>>>>>>>>",
            response.data.data
          )
          setTotalUpholdenDiscount(response.data.data.upholdenDiscount)
          setTotalUpholdenAmount(response.data.data.upholdenTotal)
          setTotalNUmberofUpholden(response.data.data.totalNUmberofUpholden)
          setCancelTotalDicount(response.data.data.cancelTotal)
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

  document.title = "Sub Admin Report | Petra Balloon"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col lg={2}>
                <h6 className="page-title">Sub Admin Reports</h6>
                <Button
                  onClick={generateXLSXFile}
                  color="info"
                  className="btn btn-info waves-effect waves-light"
                >
                  Generate XLSX File
                </Button>{" "}
                {/* <button onClick={generateXLSXFile}>Generate XLSX File</button> */}
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
                    {subAdminData &&
                      subAdminData.map(Details => (
                        <DropdownItem
                          onClick={() => {
                            setSubAdminId(Details._id)
                            setAgencyCode(Details.fullName)
                          }}
                        >
                          {Details.fullName}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col>
                <label>Single Date Reports</label>
                <DatePicker
                  selected={singletDate}
                  onChange={date => setSingleDate(date)}
                />
              </Col>
              <Col>
                <div>
                  <label>Single Day</label>
                </div>
                <Button
                  color="success"
                  className="btn btn-success waves-effect waves-light"
                  onClick={async () => {
                    await getReportDataSingleDate()
                  }}
                >
                  Submit
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
                <div>
                  <label>Between Dates</label>
                </div>
                <Button
                  color="success"
                  className="btn btn-success waves-effect waves-light"
                  onClick={async () => {
                    await getReportDataBetweenDate()
                  }}
                >
                  Submit
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
                      Upholden Amount
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      <i className="mdi mdi-arrow-down text-danger ms-2">
                        {totalUpholdenAmount}
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
                      Cancel Ticket
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
                              </td>
                              <td>{Details.total_amount}</td>
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

export default withTranslation()(SubAdminReports)
