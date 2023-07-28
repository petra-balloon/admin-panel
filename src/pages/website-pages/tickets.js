import React, { useEffect, useRef, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { API_URL, axiosApi } from "helpers/api_helper"
import Moment from "react-moment"
import EditPopUpModal from "./EditModal/EditModal"
import RedeemPopUpModal from "./RedeemModal/RedeemModal"

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
} from "reactstrap"

import { Link, useNavigate } from "react-router-dom"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import Loader from "components/Loader"

const TicketPage = () => {
  const [ticketData, setTicketData] = useState()
  const [deletedId, setDeletedId] = useState("")

  const [delete_xlarge, setDelete_xlarge] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [editTicketDetails, setEditTicketDetails] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    AllTickets()
  }, [])

  const AllTickets = async event => {
    try {
      setIsLoading(false)
      await axiosApi
        .get(`${API_URL}ticket/get-tickets`)
        .then(response => {
          console.log(response.data.data)
          setTicketData(response.data.data)
          setIsLoading(false)
        })
        .catch(function (error) {
          console.log(error)
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const CheckIn = async event => {
    try {
      setIsLoading(false)
      await axiosApi
        .post(`${API_URL}ticket/check-in`, { ticketId: event })
        .then(response => {
          console.log(response.data.data)
          //setTicketData(response.data.data)
          setIsLoading(false)
        })
        .catch(function (error) {
          console.log(error)
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const cancelTicket = async event => {
    console.log("this is cancel ticket", event)
    try {
      await axiosApi
        .post(`${API_URL}ticket/cancel-ticket`, { ticketId: event })
        .then(response => {
          console.log(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  function printTicket(Details) {
    console.log(Details)
    navigate("/print-ticket", { state: { sendData: Details } })
  }

  const data = {
    columns: [
      {
        label: "Ticket Id",
        field: "ticket_number",
        sort: "asc",
      },
      {
        label: "Name",
        field: "first_name",
        sort: "asc",
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
      },
      {
        label: "Mobile",
        field: "mobile",
        sort: "asc",
      },
      {
        label: "Country",
        field: "country",
        sort: "asc",
      },
      {
        label: "Selected Pass",
        field: "selected_pass",
        sort: "asc",
      },
      {
        label: "Reservation Details",
        field: "reservation_details",
        sort: "asc",
      },
      {
        label: "Redeem Ticket",
        field: "redeem_ticket",
        sort: "asc",
      },
      {
        label: "Reservation Date",
        field: "date",
        sort: "asc",
      },
      {
        label: "Total Amount",
        field: "total_amount",
        sort: "asc",
      },
      {
        label: "Discount Amount",
        field: "discount_amount",
        sort: "asc",
      },
      {
        label: "Shifter Name",
        field: "shifter_name",
        sort: "asc",
      },
      {
        label: "Check In",
        field: "check_in",
        sort: "asc",
      },
      {
        label: "Payment Status",
        field: "payment_status",
        sort: "asc",
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
      },
    ],
    rows: ticketData?.map(item => {
      return {
        first_name: item.first_name + " " + item.last_name,
        email: item.email,
        mobile: item.mobile,
        ticket_number: item.ticket_number,
        country: item.country,
        selected_pass: item.selected_pass,
        discount_amount: item.discount_amount,
        total_amount: item.total_amount,
        payment_status : item.payment_status,
        check_in: (
          <div>
            {item.check_in == true && <div>Check In</div>}
            {item.check_in == false && <div>Pending</div>}
          </div>
        ),
        shifter_name: (
          <div>
            {item.shifter_name == null && <div>Website</div>}
            {item.shifter_name != null && <div>{item.shifter_name}</div>}
          </div>
        ),
        date: (
          <div>
            <Moment format="D/MMM/YYYY">{item.date}</Moment>
          </div>
        ),
        reservation_details: item.reservation_details?.map(value => {
          return (
            <div>
              {value.type}
              {""}:{""}
              {value.quantity}
            </div>
          )
        }),
        redeem_ticket: item.redeem_ticket?.map(value => {
          return (
            <div>
              {value.type}
              {""}:{""}
              {value.quantity}
            </div>
          )
        }),
        action: (
          <div style={{ display: "flex" }}>
            <Button
              onClick={async () => {
                //await cancelTicket(item._id)
                //await AllTickets()
                setDeletedId(item._id)
                setDelete_xlarge(true)
              }}
              color="danger"
              className="btn btn-success waves-effect waves-light"
            >
              Cancel
            </Button>
            <Button
              style={{ marginLeft: "3px" }}
              color="success"
              className="btn btn-success waves-effect waves-light"
              onClick={async () => {
                printTicket(item)
              }}
            >
              Print
            </Button>
            <Button
              style={{ marginLeft: "3px" }}
              color="primary"
              className="btn btn-primary waves-effect waves-light"
              onClick={async () => {
                await setEditTicketDetails(item)
                await CheckIn(item._id)
                setOpenModal(true)
              }}
            >
              Redeem
            </Button>
            {/* {item.check_in == false && (
              <Button
                style={{ marginLeft: "3px" }}
                color="primary"
                className="btn btn-primary waves-effect waves-light"
                onClick={async () => {
                  await CheckIn(item._id)
                  // navigate("/boarding-pass", { state: { sendData: item } })
                  navigate("/boarding-form", { state: { sendData: item } })
                }}
              >
                CheckIn
              </Button>
            )}
            {item.check_in == true && (
              <Button
                style={{ marginLeft: "3px" }}
                color="primary"
                className="btn btn-danger waves-effect waves-light"
                onClick={async () => {
                  await CheckIn(item._id)
                  // navigate("/boarding-pass", { state: { sendData: item } })
                  navigate("/boarding-form", { state: { sendData: item } })
                }}
              >
                CheckIn
              </Button>
            )} */}
          </div>
        ),
      }
    }),
  }

  const tog_delete_large = () => {
    setDelete_xlarge(!delete_xlarge)
  }

  document.title = "Petra Balloon- Admin Dashboard"
  return (
    <React.Fragment>
      {/*       {openModal && (
        <EditPopUpModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          editTicketDetails={editTicketDetails}
          AllTickets={AllTickets}
          closeModal={() => {
            setOpenModal(false)
          }}
        />
      )} */}
      {openModal && (
        <RedeemPopUpModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          editTicketDetails={editTicketDetails}
          AllTickets={AllTickets}
          closeModal={() => {
            setOpenModal(false)
          }}
        />
      )}
      <div className="page-content">
        <Container fluid={true}>
          {/* delete pass */}
          <Row>
            <Col sm={6} md={4} xl={3}>
              <div className="my-4 text-center">
                <Modal
                  isOpen={delete_xlarge}
                  toggle={tog_delete_large}
                  size="sm"
                >
                  <ModalHeader className="mt-0" toggle={tog_delete_large}>
                    Delete Pass{" "}
                  </ModalHeader>
                  <ModalBody>
                    <Row className="justify-content-center">
                      <Col md={12} lg={12} xl={12}>
                        <Card className="overflow-hidden">
                          <div className="bg-danger">
                            <div className="text-danger text-center p-4">
                              <h5 className="text-white font-size-20">
                                Are you sure
                              </h5>
                            </div>
                          </div>

                          <CardBody className="p-4">
                            <div className="p-3">
                              <div className="mb-3 row">
                                <div className=" text-center">
                                  <button
                                    className="btn btn-primary w-md waves-effect waves-light"
                                    onClick={async () => {
                                      await cancelTicket(deletedId)
                                      await AllTickets()
                                      setDelete_xlarge(false)
                                    }}
                                  >
                                    Delete Ticket
                                  </button>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Loader isLoading={isLoading} />
                  </ModalBody>
                </Modal>
              </div>
            </Col>
          </Row>
          {/* delete pass */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Tickets</CardTitle>
                  <p className="card-title-desc"></p>

                  <MDBDataTable responsive bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Loader isLoading={isLoading} />
          {/* project cards */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default TicketPage
