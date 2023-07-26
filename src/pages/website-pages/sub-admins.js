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

const SubAdmins = () => {
  const [userLogin, setUserLogin] = useState([])
  const [allSubadmin, setAllSubAdmin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [modal_xlarge, setmodal_xlarge] = useState(false)

  useEffect(() => {
    getSubadmin()
  }, [])

  const deleteSubAdmin = async Id => {
    setIsLoading(true)
    await axiosApi
      .post(`${API_URL}admin/delete`, {
        _id: Id,
      })
      .then(async response => {
        if (response.data.status) {
          toastSuccess(response.data.message)
          setIsLoading(false)
        } else {
          toastError(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const tog_xlarge = () => {
    setmodal_xlarge(!modal_xlarge)
    removeBodyCss()
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: userLogin.email,
      password: userLogin.password,
      username: userLogin.username,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your User Name"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      AddSubAdmin(values.email, values.password, values.username)
      // dispatch(loginUser(values, props.router.navigate))
    },
  })

  const AddSubAdmin = async (email, password, username) => {
    setIsLoading(true)
    const token = JSON.parse(localStorage.getItem("authUser"))
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    await axiosApi
      .post(
        `${API_URL}admin/addsubadmin`,
        {
          emailAddress: email,
          password: password,
          fullName: username,
          role: "subadmin",
        },
        config
      )
      .then(async response => {
        if (response.data.status) {
          toastSuccess(response.data.message)
          setmodal_xlarge(!modal_xlarge)
          await getSubadmin();
          setIsLoading(false)
        } else {
          toastError(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

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
          setAllSubAdmin(response.data.data)
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

  document.title = "Login | Petra Ballon"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* modal add project */}
          <Row>
            <Col sm={6} md={4} xl={3}>
              <div className="my-4 text-center">
                <Modal isOpen={modal_xlarge} toggle={tog_xlarge} size="md">
                  <ModalHeader className="mt-0" toggle={tog_xlarge}>
                    Add New SubAdmin{" "}
                  </ModalHeader>
                  <ModalBody>
                    <Row className="justify-content-center">
                      <Col md={12} lg={12} xl={12}>
                        <Card className="overflow-hidden">
                          <div className="bg-primary">
                            <div className="text-primary text-center p-4">
                              <h5 className="text-white font-size-20">
                                Welcome
                              </h5>
                              <p className="text-white-50">
                                Add New Sub Admin!!
                              </p>
                            </div>
                          </div>

                          <CardBody className="p-4">
                            <div className="p-3">
                              <Form
                                className="mt-4"
                                onSubmit={e => {
                                  e.preventDefault()
                                  validation.handleSubmit()
                                  return false
                                }}
                                action="#"
                              >
                                <div className="mb-3">
                                  <Label
                                    className="form-label"
                                    htmlFor="username"
                                  >
                                    Username
                                  </Label>
                                  <Input
                                    name="username"
                                    className="form-control"
                                    placeholder="Enter Username"
                                    type="text"
                                    id="username"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.username || ""}
                                    invalid={
                                      validation.touched.username &&
                                      validation.errors.username
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.username &&
                                  validation.errors.username ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.username}
                                    </FormFeedback>
                                  ) : null}
                                </div>
                                <div className="mb-3">
                                  <Label
                                    className="form-label"
                                    htmlFor="username"
                                  >
                                    Email
                                  </Label>
                                  <Input
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter Username"
                                    type="email"
                                    id="username"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email || ""}
                                    invalid={
                                      validation.touched.email &&
                                      validation.errors.email
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.email &&
                                  validation.errors.email ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.email}
                                    </FormFeedback>
                                  ) : null}
                                </div>

                                <div className="mb-3">
                                  <Label
                                    className="form-label"
                                    htmlFor="userpassword"
                                  >
                                    Password
                                  </Label>
                                  <Input
                                    name="password"
                                    value={validation.values.password || ""}
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.password &&
                                      validation.errors.password
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation.touched.password &&
                                  validation.errors.password ? (
                                    <FormFeedback type="invalid">
                                      {validation.errors.password}
                                    </FormFeedback>
                                  ) : null}
                                </div>

                                <div className="mb-3 row">
                                  <div className="col-sm-6">
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="customControlInline"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="customControlInline"
                                      >
                                        Remember me
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-sm-6 text-end">
                                    <button
                                      className="btn btn-primary w-md waves-effect waves-light"
                                      type="submit"
                                    >
                                      Add SubAdmin
                                    </button>
                                  </div>
                                </div>
                              </Form>
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
          {/* modal add project */}

          <Row>
            <Col lg={10}></Col>
            <Col lg={2} style={{ marginTop: "0.5rem" }}>
              <Card>
                <Button
                  onClick={tog_xlarge}
                  color="success"
                  className="btn btn-success waves-effect waves-light"
                >
                  + Add New SubAdmin
                </Button>{" "}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={2}></Col>
            <Col xl={8}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">All SubAdmin</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Name</th>
                          <th>Role</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allSubadmin &&
                          allSubadmin.map(Details => (
                            <tr>
                              <td>{Details.fullName}</td>
                              <td>{Details.role}</td>
                              <td>{Details.emailAddress}</td>
                              <td>
                                {" "}
                                <Button
                                  onClick={async () => {
                                    await deleteSubAdmin(Details._id);
                                    await getSubadmin();
                                  }}
                                  color="danger"
                                  className="btn btn-info waves-effect waves-light"
                                >
                                  Delete
                                </Button>{" "}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={2}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default SubAdmins
