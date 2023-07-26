import React, { useEffect, useState, useContext } from "react"
import userRoleContext from "context/userRole/userRole-context"

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
import { API_URL, axiosApi } from "helpers/api_helper"
import Loader from "components/Loader"
import { toastError, toastSuccess } from "components/Utils"

import { Link } from "react-router-dom"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const PromoCode = () => {
  const [createPromoName, setCreatePromoName] = useState("")
  const [createAgencyName, setCreateAgencyName] = useState()
  const [createDiscountPercentage, setDiscountPercentage] = useState()
  const [promoCode, setPromoCode] = useState()
  
  const [promoId, setPromoId] = useState()

  const [apiPassData, setApiPassData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [modal_xlarge, setmodal_xlarge] = useState(false)
  const [edit_xlarge, setEdit_xlarge] = useState(false)
  const [delete_xlarge, setDelete_xlarge] = useState(false)

  //edit pass
  const [passId, setPassId] = useState("")
  const [editPassName, setEditPassName] = useState("")
  const [editAdultPrice, setEditAdultPrice] = useState()
  const [editChilePrice, setEditChildPrice] = useState()
  const [editInfantPrice, setEditInfantPrice] = useState()
  const [editFamilyPrice, setEditFamilyPrice] = useState()

  /*   const msg = useContext(userRoleContext)
  console.log("this is context",msg)
   */
  useEffect(() => {
    /*    PassDescription(); */
    getPromo()
  }, [])

  const tog_xlarge = () => {
    setmodal_xlarge(!modal_xlarge)
    removeBodyCss()
  }

  const tog_edit_large = () => {
    setEdit_xlarge(!edit_xlarge)
  }
  const tog_delete_large = () => {
    setDelete_xlarge(!delete_xlarge)
  }

  const addNewPromo = async event => {
    console.log("this is me!!!!")
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
          `${API_URL}promocode/create`,
          {
            promo_name: createPromoName,
            agency_name: createAgencyName,
            discount_percentage: createDiscountPercentage,
            promo_code:promoCode
          }, 
          config
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

  const getPromo = async event => {
    try {
      setIsLoading(true)
      await axiosApi
        .get(`${API_URL}promocode/get`)
        .then(response => {
          console.log(response.data.data)
          setApiPassData(response.data.data)
          setIsLoading(false)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const deletePromo = async event => {
    console.log("this is update ", passId)
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
          `${API_URL}promocode/delete`,
          {
            promo_id: promoId,
          },
          config
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

  document.title = "promo code Petra Balloon"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* modal add pass  */}
          <Row>
            <Col sm={6} md={4} xl={3}>
              <div className="my-4 text-center">
                <Modal isOpen={modal_xlarge} toggle={tog_xlarge} size="md">
                  <ModalHeader className="mt-0" toggle={tog_xlarge}>
                    Add New Promo Code{" "}
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
                                New Promo should have unique name!!
                              </p>
                            </div>
                          </div>

                          <CardBody className="p-4">
                            <div className="p-3">
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="Pass Name"
                                >
                                  Promo Name
                                </Label>
                                <Input
                                  name="promo_name"
                                  className="form-control"
                                  placeholder="Enter Promo Name"
                                  type="text"
                                  id="promo_name"
                                  onChange={e => {
                                    setCreatePromoName(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Agency Name
                                </Label>
                                <Input
                                  name="agency_name"
                                  className="form-control"
                                  placeholder="Enter Agency Name"
                                  type="text"
                                  id="agency_name"
                                  onChange={e => {
                                    setCreateAgencyName(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                  type="number"
                                >
                                  Discount Percentage
                                </Label>
                                <Input
                                  name="discount_percentage"
                                  className="form-control"
                                  placeholder="Enter discount percentage"
                                  type="number"
                                  id="discount_percentage"
                                  onChange={e => {
                                    setDiscountPercentage(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                  type="number"
                                >
                                  Promo Code
                                </Label>
                                <Input
                                  name="promo_code"
                                  className="form-control"
                                  placeholder="Enter Promo Code"
                                  type="text"
                                  id="promo_code"
                                  onChange={e => {
                                    setPromoCode(e.target.value)
                                  }}
                                />
                              </div>

                              <div className="mb-3 row">
                                <div className=" text-end">
                                  <button
                                    className="btn btn-primary w-md waves-effect waves-light"
                                    onClick={async () => {
                                      await addNewPromo()
                                      await getPromo()
                                      await tog_xlarge()
                                    }}
                                  >
                                    Add Promo
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
          {/* modal add pass */}
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
                    Delete Promo{" "}
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
                                      await deletePromo()
                                      await getPromo()
                                      await tog_delete_large()
                                    }}
                                  >
                                    Delete Promo
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
            <Col lg={10}></Col>
            <Col lg={2} style={{ marginTop: "0.5rem" }}>
              <Card>
                <Button
                  onClick={tog_xlarge}
                  color="success"
                  className="btn btn-success waves-effect waves-light"
                >
                  + Add Promo Code
                </Button>{" "}
              </Card>
            </Col>
          </Row>

          <Row>
            {apiPassData &&
              apiPassData.map(Details => (
                <Col lg={6}>
                  <Card>
                    <CardBody>
                      <CardTitle className="h4">{Details.pass_name}</CardTitle>

                      <div className="table-responsive">
                        <table className="table table-bordered table-striped mb-0">
                          <tbody>
                            <tr>
                              <td><b style={{marginRight:"20px"}}>Promo Name:</b>{Details.promo_name}</td>
                            </tr>
                            <tr>
                            <td><b style={{marginRight:"20px"}}>Agency Name:</b>{Details.agency_name}</td>
                            </tr>
                            <tr>
                            <td><b style={{marginRight:"20px"}}>Discount Percentage:</b>{Details.discount_percentage}</td>
                            </tr>
                            <tr>
                            <td><b style={{marginRight:"20px"}}>Promo Code:</b>{Details.promo_code}</td>
                            </tr>
                            <tr>
                              <td>
                                <Button
                                  color="success"
                                  className="btn btn-danger waves-effect waves-light col-lg-4"
                                   onClick={async () => {
                                    setPromoId(Details._id)
                                    setDelete_xlarge(true)
                                  }} 
                                >
                                  Delete
                                </Button>{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
          </Row>
          <Loader isLoading={isLoading} />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default PromoCode

/* PricingPlan */
