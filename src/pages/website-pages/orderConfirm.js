import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
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
} from "reactstrap"

import * as Yup from "yup"
import { useFormik } from "formik"

// actions
import { loginUser, apiError } from "../../store/actions"

import Loader from "components/Loader"
import userRoleContext from "context/userRole/userRole-context"
import { API_URL, axiosApi } from "helpers/api_helper"
import { toastError, toastSuccess } from "components/Utils"

const OrderConfirm = () => {

  useEffect(() => {
    ComfirmOrder()
  }, [])

  const ComfirmOrder = async event => {
    // Get the current URL search (query string)
    const currentSearch = window.location.search

    // Parse the URL search to extract the query parameters
    const urlParams = new URLSearchParams(currentSearch)

    // Get the value of the orderId parameter
    const orderId = urlParams.get("orderId")

    // Now, 'orderId' will contain the value '12345'
    console.log("Order ID:!!!!!!!!!!!!::::::::", orderId)

    await axios
      .post(`${API_URL}payment/payment-route`, { orderId: orderId })
      .then(async response => {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <React.Fragment>
      <div style={{ marginTop: "200px" }}>
        <Container>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label" htmlFor="username">
                  OrderConfirm
                </Label>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default OrderConfirm
