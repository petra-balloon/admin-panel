import React, { useEffect, useRef, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { API_URL, axiosApi } from "helpers/api_helper"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  Button,
} from "reactstrap"

import { Link, useNavigate } from "react-router-dom"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const CancelTicketPage = () => {
  const [ticketData, setTicketData] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    cancelTicket()
  }, [])

  const cancelTicket = async event => {
    console.log("this is cancel ticket", event)
    try {
      await axiosApi
        .get(`${API_URL}ticket/cancel-ticket/get`, {})
        .then(response => {
          console.log(response.data.data)
          setTicketData(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const data = {
    columns: [
      {
        label: "Ticket Id",
        field: "ticket_number",
        sort: "asc",
      },
      {
        label: "First Name",
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
        label: "Status",
        field: "status",
        sort: "asc",
      },
    ],
    rows: ticketData?.map(item => {
      return {
        first_name: item.first_name,
        email: item.email,
        mobile: item.mobile,
        ticket_number: item.ticket_number,
        country: item.country,
        selected_pass: item.selected_pass,
        discount_amount: item.discount_amount,
        total_amount: item.total_amount,
        reservation_details: item.reservation_details?.map(value => {
          return (
            <div>
              {value.type}
              {""}:{""}
              {value.quantity}
            </div>
          )
        }),
        status: <div style={{color:"red"}}>{item.ticket_status}</div>,
      }
    }),
  }

  document.title = "Petra Balloon- Admin Dashboard"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* edit project */}

          {/* modal add project */}
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Cancel Tickets </CardTitle>
                  <p className="card-title-desc"></p>

                  <MDBDataTable responsive bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Loader isLoading={isLoading} /> */}
          {/* project cards */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CancelTicketPage
