import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

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

const SocialMedia = () => {
  const [tocken, setToken] = useState("")
  const [tockenId, setTokenId] = useState("")
  const [newtocken, setNewToken] = useState("")

  const [isLoading, setIsLoading] = useState(false)

 
  useEffect(() => {
    getTocken()
  }, [])

  const getTocken = async event => {
    setIsLoading(true)
    try {
      await axiosApi
        .get(`${API_URL}social-token/get`, {})
        .then(async response => {
          // console.log("this is sunadmin", response.data.data)
          setToken(response.data.data[0].tocken)
          setTokenId(response.data.data[0]._id)
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

  const addNewTocken = async event => {
    setIsLoading(true)
    try {
      await axiosApi
        .post(
          `${API_URL}social-token/edit-tocken`,
          {
            tocken:newtocken,
            tockenId: tockenId
          }, 
        )
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
      <div style={{ marginTop: "200px" }}>
        <Container>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label" htmlFor="username">
                  Instagram Tocken
                </Label>
                <div>{tocken}</div>
                <Input
                  name="insta_tocken"
                  className="form-control"
                  placeholder="Enter Instagram Tocken"
                  type="text"
                  id="text"
                  onChange={e => {
                    setNewToken(e.target.value)
                  }}
                />
              </div>
              <Button
                color="primary"
                className="btn btn-primary waves-effect waves-light"
                onClick={async () => {
                  await addNewTocken();
                  await getTocken();
                }}
              >
                Edit tocken
              </Button>
            </Col>
          </Row>
          <Loader isLoading={isLoading} />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default SocialMedia
