import React, { useEffect, useState, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import logosmImg from "../../assets/images/logopetra.png"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import Moment from "react-moment"
import moment from "moment"
import ReactDOM from "react-dom"
import QRCode from "react-qr-code"
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Button,
  CardText,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Form,
  FormFeedback,
  Input,
} from "reactstrap"

//images
/* import { API_URL, axiosApi } from "helpers/api_helper"
import Loader from "components/Loader"
import { toastError, toastSuccess } from "components/Utils"

import { Link } from "react-router-dom" */

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const PrintTicket = () => {
  const [detailsArray, setDetailArray] = useState([])
  const [adultCount, setAdultCount] = useState(0)
  const [childCount, setChildCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)
  const [familyCount, setFamilyCount] = useState(0)

  document.title = "Pass Pricing Petra Balloon"

  const location = useLocation()
  console.log(location.state.sendData)
  const ticketData = location.state.sendData

  const specificDate = ticketData.date
  const formattedDate = moment(specificDate).format("DD/MMM/YYYY")

  useEffect(() => {
    setDetailArray(ticketData.reservation_details)
    ticketData.reservation_details.map(Bill => {
      console.log(Bill)
      if (Bill.type == "adult") {
        setAdultCount(Bill.quantity)
      }
      if (Bill.type == "child") {
        setChildCount(Bill.quantity)
      }
      if (Bill.type == "infant") {
        setInfantCount(Bill.quantity)
      }
      if (Bill.family == "family") {
        setFamilyCount(Bill.quantity)
      }
    })
  }, [ticketData])

  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {},
  })

  let navigate = useNavigate()
  function handleBack() {
    navigate("/tickets")
  }

  // qr code
  const ticketHTML = `Petra Balloon
  Ticket No  : ${ticketData.ticket_number}     Date : ${formattedDate}
  Name  : ${ticketData.first_name} ${ticketData.last_name}
  Mobile : ${ticketData.mobile}
  Pass Type : ${ticketData.selected_pass}
  Adult : ${adultCount}
  Child : ${childCount}
  Infant: ${infantCount}
  family: ${familyCount}
  Discount Amount : ${ticketData.discount_amount}
  Total Amount : ${ticketData.total_amount}
`
  console.log("ticketHTML", ticketHTML)
  const encodedTicketHTML = encodeURIComponent(ticketHTML)
  const dataURI = `data:text/html;charset=UTF-8,${encodedTicketHTML}`
  //end qr code
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 64,
              width: "100%",
            }}
          ></div>

          <button
            onClick={() => handlePrint()}
            style={{
              backgroundColor: "#3280F8",
              float: "right",
              color: "white",
            }}
          >
            Print
          </button>
          <button
            onClick={() => handleBack()}
            style={{ backgroundColor: "green", color: "white" }}
          >
            Back
          </button>
        </Container>
        <div className="ticket-outer-class" ref={componentRef}>
          <div style={{ display: "flex" }}>
            <div className="img-div">
              {/* <img
                style={{ height: "206px" }}
                src="assets/img/team/4.jpg"
              ></img> */}
            </div>
            <div className="outer-ticket-content-div">
              <div className="logo-div-tiket"></div>

              <div className="ticket-div-info" style={{marginLeft:"60px", height:"130px"}} >
                <div className="qr-code-div">
                  <QRCode size={150} value={ticketHTML} />
                </div>
                <div className="inside-content-div">
                  {formattedDate} - {ticketData.ticket_number} <br></br> <b>{ticketData.selected_pass}</b>
                </div>
              </div>
              <div className="company-info-div"></div>
            </div>
          </div>
        </div>
        {/* <Container fluid={true}>
          <>
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 64,
                width: "100%",
              }}
            >
            </div>

            <button
              onClick={() => handlePrint()}
              style={{
                backgroundColor: "#3280F8",
                float: "right",
                color: "white",
              }}
            >
              Print
            </button>
            <button
              onClick={() => handleBack()}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Back
            </button>
            <div
              ref={componentRef}
              style={{
                height: "1000px",
                width: "100%",
                marginTop: "30px",
              }}
            >
              <img src={logosmImg}></img>
              <div
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "70px" }}>Petra Balloon</div>
                <div style={{ fontSize: "20px" }}>petraballoon@gmail.com</div>
                <div style={{ padding: "4px", fontSize: "25px" }}>
                  <b style={{ marginRight: "3px" }}>Addresss: </b> PETRA BALLOON
                  PETRA BALLOON ST. PETRA 71810 JORDAN
                </div>
                <div style={{ padding: "4px", fontSize: "30px" }}>
                  <b style={{ marginRight: "3px" }}>Phone :</b>
                  +962 3 215 6600
                </div>
                <div style={{ padding: "8px", fontSize: "30px" }}>
                  <b>Ticket</b>
                </div>
              </div>
              <div style={{ padding: "30px" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "25px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Ticket No : </b>
                    {ticketData.ticket_number}
                  </div>
                  <div style={{ width: "50%", textAlign: "end" }}>
                    <b>Date :</b>{" "}
                    <Moment format="D/MMM/YYYY">{ticketData.date}</Moment>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "25px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Customer Info</b>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "25px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Name :</b> {ticketData.first_name} {ticketData.last_name}{" "}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "25px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Mobile : </b>
                    {ticketData.mobile}{" "}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "25px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Pass Type : </b>
                    {ticketData.selected_pass}{" "}
                  </div>
                </div>
              </div>

              <div style={{ padding: "30px" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "40px",
                    fontSize: "20px",
                    borderBottom: "1px solid black",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Member Type</b>
                  </div>
                  <div
                    style={{
                      width: "25%",
                      textAlign: "center",
                      padding: "3px",
                    }}
                  >
                    <b>Quantity</b>
                  </div>

                  <div
                    style={{
                      width: "25%",
                      textAlign: "center",
                      padding: "3px",
                    }}
                  >
                    <b>Subtotal</b>
                  </div>
                </div>
                {detailsArray &&
                  detailsArray.map(Bill => (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        width: "100%",
                        height: "25px",
                        fontSize: "18px",
                      }}
                    >
                      <div style={{ width: "50%" }}>{Bill.type}</div>
                      <div style={{ width: "25%", textAlign: "center" }}>
                        {Bill.quantity}
                      </div>
                      <div style={{ width: "25%", textAlign: "center" }}>
                        {Bill.Sub_total}
                      </div>
                    </div>
                  ))}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "20px",
                    fontSize: "12px",
                    borderBottom: "1px solid",
                  }}
                ></div>
              </div>
              <div style={{ padding: "30px" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  >
                    <QRCode size={150} value={ticketHTML} />
                  </div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                      borderBottom: "1px solid lightgray",
                    }}
                  >
                    <div style={{ width: "50%" }}>
                      <b>Discount : </b>
                    </div>{" "}
                    <div style={{ width: "50%" }}>
                      {" "}
                      JOD {ticketData.discount_amount}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  >
                  </div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "20px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                  
                  </div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                      borderBottom: "1px solid gray",
                    }}
                  >
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "20px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                  
                  </div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    <div style={{ width: "50%" }}>
                      <b>Total:</b>
                    </div>{" "}
                    <div style={{ width: "50%" }}>
                      {" "}
                      JOD {ticketData.total_amount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Container> */}
      </div>
    </React.Fragment>
  )
}

export default PrintTicket

/* PricingPlan */
