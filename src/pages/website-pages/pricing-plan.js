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

const PricingPlan = () => {
  const [createPassName, setCreatePassName] = useState("")
  const [createAdultPrice, setCreateAdultPrice] = useState()
  const [createChilePrice, setCreateChildPrice] = useState()
  const [createInfantPrice, setCreateInfantPrice] = useState()
  const [createFamilyPrice, setCreateFamilyPrice] = useState()
  const [createPassDescription, setCreatePassDescription] = useState("")
  const [passImage, setPassImage] = useState(null)

  const [sunrisePlanAdult, setSunrisePlanAdult] = useState()
  const [sunrisePlanChild, setSunrisePlanChild] = useState()
  const [sunrisePlanInfant, setSunrisePlanInfant] = useState()

  const [adultDescription, setAdultDescription] = useState()
  const [childDescription, setChildDescription] = useState()
  const [infantDescription, setInfantDescription] = useState()
  const [familyDescription, setFamilyDescription] = useState()
  const [desId, setDesId] = useState()

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
  const [editPassDescription, setEditPassDescription] = useState()
  const maxLength = 118
  /*   const msg = useContext(userRoleContext)
  console.log("this is context",msg)
   */

  console.log(passImage)

  useEffect(() => {
    /*    PassDescription(); */
    PassPlan()
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

  const addNewPass = async event => {
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
          `${API_URL}pass-pricing/create`,
          {
            pass_name: createPassName,
            adult_price: createAdultPrice,
            child_price: createChilePrice,
            infant_price: createInfantPrice,
            family_price: createFamilyPrice,
            Pass_description: createPassDescription,
            file: passImage,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
          config
        )
        .then(async response => {
          if (response.data.success) {
            toastSuccess(response.data.message)
          }
          setIsLoading(false)
          setPassImage(null)
          window.location.reload()
        })
        .catch(function (error) {
          setIsLoading(false)
          setPassImage(null)
          toastError(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const PassPlan = async event => {
    try {
      setIsLoading(true)
      await axiosApi
        .get(`${API_URL}pass-pricing/get`)
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

  const updatePass = async event => {
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
          `${API_URL}pass-pricing/update`,
          {
            Pass_id: passId,
            pass_name: editPassName,
            adult_price: editAdultPrice,
            child_price: editChilePrice,
            infant_price: editInfantPrice,
            family_price: editFamilyPrice,
            Pass_description: editPassDescription,
            file: passImage,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
          config
        )
        .then(async response => {
          if (response.data.success) {
            toastSuccess(response.data.message)
            setIsLoading(false)
            setPassImage(null)
            window.location.reload()
          } else {
            setIsLoading(false)
            setPassImage(null)
            window.location.reload()
          }
        })
        .catch(function (error) {
          setIsLoading(false)
          setPassImage(null)
          toastError(error)
          window.location.reload()
        })
    } catch (error) {
      console.error(error)
    }
  }

  const deletePass = async event => {
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
          `${API_URL}pass-pricing/delete`,
          {
            Pass_id: passId,
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

  /*  const addFastPassPrice = async event => {
    console.log("this is me!!!!", fastPlanAdult)
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
          `${API_URL}pricing/fastpass/update`,
          {
            Pass_id: fastTableId,
            adult_price: fastPlanAdult,
            child_price: fastPlanChild,
            infant_price: fastPlanInfant,
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

  const addSunrisePassPrice = async event => {
    console.log("this is sunrise", sunrisePlanAdult)
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
          `${API_URL}pricing/sunrise/update`,
          {
            Pass_id: sunriseTableId,
            adult_price: sunrisePlanAdult,
            child_price: sunrisePlanChild,
            infant_price: sunrisePlanInfant,
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

  const addRegularPassPrice = async event => {
    console.log("this is sunrise", sunrisePlanAdult)
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
          `${API_URL}pricing/regularpass/update`,
          {
            Pass_id: regularTableId,
            adult_price: regularPlanAdult,
            child_price: regularPlanChild,
            infant_price: regularPlanInfant,
            family_price: regularPlanFamily,
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

  const addPassDescription = async event => {
    console.log("this is description", desId)
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
          `${API_URL}pricing/pass-description/update`,
          {
            des_id: desId,
            adult_description: adultDescription,
            child_description: childDescription,
            infant_description: infantDescription,
            family_description: familyDescription,
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
  } */

  /*   const RegularPassPlan = async event => {
    try {
      await axiosApi
        .get(`${API_URL}pricing/regularpass/get`)
        .then(response => {
          console.log(response.data.data)
          setRegularPlanAdult(response.data.data.adult_price)
          setRegularPlanChild(response.data.data.child_price)
          setRegularPlanInfant(response.data.data.infant_price)
          setRegularPlanFamily(response.data.data.family_price)
          setRegularTableId(response.data.data._id)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  }
  const FastPassPlan = async event => {
    try {
      setIsLoading(true)
      await axiosApi
        .get(`${API_URL}pricing/fastpass/get`)
        .then(response => {
          console.log(response.data.data)
          setFastPlanAdult(response.data.data.adult_price)
          setFastPlanChild(response.data.data.child_price)
          setFastPlanInfant(response.data.data.infant_price)
          setFastTableId(response.data.data._id)
          setIsLoading(false)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  }
  const SunrisePassPlan = async event => {
    try {
      await axiosApi
        .get(`${API_URL}pricing/sunrise/get`)
        .then(response => {
          console.log(response.data.data)
          setSunrisePlanAdult(response.data.data.adult_price)
          setSunrisePlanChild(response.data.data.child_price)
          setSunrisePlanInfant(response.data.data.infant_price)
          setSunriseTableId(response.data.data._id)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  } */

  /*  const PassDescription = async event => {
    try {
      await axiosApi
        .get(`${API_URL}pricing/pass-description/get`)
        .then(response => {
          console.log(response.data.data)
          setAdultDescription(response.data.data.adult_description)
          setChildDescription(response.data.data.child_description)
          setInfantDescription(response.data.data.infant_description)
          setFamilyDescription(response.data.data.family_description)
          setDesId(response.data.data._id)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  } */

  document.title = "Pass Pricing Petra Balloon"
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
                    Add New Pass{" "}
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
                                New pass should have unique name!!
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
                                  Pass Name
                                </Label>
                                <Input
                                  name="pass_name"
                                  className="form-control"
                                  placeholder="Enter Pass Name"
                                  type="text"
                                  id="pass_name"
                                  onChange={e => {
                                    setCreatePassName(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Adult Price
                                </Label>
                                <Input
                                  name="adult_price"
                                  className="form-control"
                                  placeholder="Enter Adult price"
                                  type="number"
                                  id="adult_price"
                                  onChange={e => {
                                    setCreateAdultPrice(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Child Price
                                </Label>
                                <Input
                                  name="child_price"
                                  className="form-control"
                                  placeholder="Enter Child price"
                                  type="number"
                                  id="child_price"
                                  onChange={e => {
                                    setCreateChildPrice(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Infant Price
                                </Label>
                                <Input
                                  name="infant_price"
                                  className="form-control"
                                  placeholder="Enter Infant Price"
                                  type="number"
                                  id="infant_price"
                                  onChange={e => {
                                    setCreateInfantPrice(e.target.value)
                                  }}
                                />
                              </div>
                              {/* <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Family Price
                                </Label>
                                <Input
                                  name="family_price"
                                  className="form-control"
                                  placeholder="Enter Family Price"
                                  type="number"
                                  id="family_price"
                                  onChange={e => {
                                    setCreateFamilyPrice(e.target.value)
                                  }}
                                />
                              </div> */}
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Pass Decription
                                </Label>
                                <Input
                                  name="pass_description"
                                  className="form-control"
                                  placeholder="Enter Family Price"
                                  type="text"
                                  id="pass_description"
                                  maxlength="118"
                                  onChange={e => {
                                    setCreatePassDescription(e.target.value);
                                  }}
                                />
                                {createPassDescription.length > 117 && (
                                  <p style={{ color: "red" }}>
                                    Character limit exceeded!
                                  </p>
                                )}
                                <div className="mb-3">
                                  <Label
                                    className="form-label"
                                    htmlFor="username"
                                  >
                                    Pass Image
                                  </Label>
                                  <Input
                                    name="pass_image"
                                    className="form-control"
                                    placeholder="Enter Family Price"
                                    type="file"
                                    id="pass_image"
                                    onChange={e => {
                                      setPassImage(e.target.files[0])
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="mb-3 row">
                                <div className=" text-end">
                                  <button
                                    className="btn btn-primary w-md waves-effect waves-light"
                                    onClick={async () => {
                                      await addNewPass()
                                      await PassPlan()
                                      await tog_xlarge()
                                    }}
                                  >
                                    Add Pass
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

          {/* edit pass */}
          <Row>
            <Col sm={6} md={4} xl={3}>
              <div className="my-4 text-center">
                <Modal isOpen={edit_xlarge} toggle={tog_edit_large} size="md">
                  <ModalHeader className="mt-0" toggle={tog_edit_large}>
                    Edit Pass{" "}
                  </ModalHeader>
                  <ModalBody>
                    <Row className="justify-content-center">
                      <Col md={12} lg={12} xl={12}>
                        <Card className="overflow-hidden">
                          <div className="bg-primary">
                            <div className="text-primary text-center p-4">
                              <h5 className="text-white font-size-20">
                                {editPassName}
                              </h5>
                              <p className="text-white-50">
                                New pass should have unique name!!
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
                                  Pass Name
                                </Label>
                                <Input
                                  name="pass_name"
                                  className="form-control"
                                  placeholder="Enter Pass Name"
                                  type="text"
                                  id="pass_name"
                                  onChange={e => {
                                    setEditPassName(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Adult Price
                                </Label>
                                <Input
                                  name="adult_price"
                                  className="form-control"
                                  placeholder="Enter Adult price"
                                  type="number"
                                  id="adult_price"
                                  onChange={e => {
                                    setEditAdultPrice(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Child Price
                                </Label>
                                <Input
                                  name="child_price"
                                  className="form-control"
                                  placeholder="Enter Child price"
                                  type="number"
                                  id="child_price"
                                  onChange={e => {
                                    setEditChildPrice(e.target.value)
                                  }}
                                />
                              </div>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Infant Price
                                </Label>
                                <Input
                                  name="infant_price"
                                  className="form-control"
                                  placeholder="Enter Infant Price"
                                  type="number"
                                  id="infant_price"
                                  onChange={e => {
                                    setEditInfantPrice(e.target.value)
                                  }}
                                />
                              </div>
                              {/* <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Family Price
                                </Label>
                                <Input
                                  name="family_price"
                                  className="form-control"
                                  placeholder="Enter Family Price"
                                  type="number"
                                  id="family_price"
                                  onChange={e => {
                                    setEditFamilyPrice(e.target.value)
                                  }}
                                />
                              </div> */}
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Pass Decription
                                </Label>
                                <Input
                                  name="pass_description"
                                  className="form-control"
                                  placeholder="Enter Family Price"
                                  type="text"
                                  id="pass_description"
                                  maxlength="118"
                                  onChange={e => {
                                    setEditPassDescription(e.target.value)
                                  }}                                  
                                />
                                {editPassDescription?.length > 117 && (
                                    <p style={{ color: "red" }}>
                                      Character limit exceeded!
                                    </p>
                                  )}
                              </div>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  Pass Image
                                </Label>
                                <Input
                                  name="pass_image"
                                  className="form-control"
                                  placeholder="Enter Family Price"
                                  type="file"
                                  id="pass_image"
                                  onChange={e => {
                                    setPassImage(e.target.files[0])
                                  }}
                                />
                              </div>

                              <div className="mb-3 row">
                                <div className=" text-end">
                                  <button
                                    className="btn btn-primary w-md waves-effect waves-light"
                                    onClick={async () => {
                                      await updatePass()
                                      await PassPlan()
                                      await tog_edit_large()
                                    }}
                                  >
                                    Edit Pass
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
          {/* edit pass */}

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
                                      await deletePass()
                                      await PassPlan()
                                      await tog_delete_large()
                                    }}
                                  >
                                    Delete Pass
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
                  + Add New Pass
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
                              <th className="text-nowrap" scope="row">
                                Adult Price
                              </th>
                              <td colSpan="2">{Details.adult_price}</td>
                            </tr>
                            <tr>
                              <th className="text-nowrap" scope="row">
                                Child Price
                              </th>
                              <td colSpan="2">{Details.child_price}</td>
                            </tr>
                            <tr>
                              <th className="text-nowrap" scope="row">
                                Infant Price
                              </th>
                              <td colSpan="2">{Details.infant_price}</td>
                            </tr>
                           {/*  <tr>
                              <th className="text-nowrap" scope="row">
                                Family Price
                              </th>
                              <td colSpan="2">{Details.family_price}</td>
                            </tr> */}
                            <tr>
                              <th className="text-nowrap" scope="row">
                                Pass Description
                              </th>
                              <td colSpan="2">{Details.Pass_description}</td>
                            </tr>
                            <tr>
                              <th className="text-nowrap" scope="row">
                                {" "}
                                Action
                              </th>
                              <td>
                                <Button
                                  color="success"
                                  className="btn btn-info waves-effect waves-light col-lg-4"
                                  onClick={async () => {
                                    setEdit_xlarge(true)
                                    setPassId(Details._id)
                                    setEditPassName(Details.pass_name)
                                  }}
                                >
                                  Edit
                                </Button>{" "}
                                <Button
                                  color="success"
                                  className="btn btn-danger waves-effect waves-light col-lg-4"
                                  onClick={async () => {
                                    setPassId(Details._id)
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
          {/* <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Discription</CardTitle>

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped mb-0">
                      <tbody>
                        <tr>
                          <th className="text-nowrap" scope="row">
                            Adult
                          </th>
                          <td colSpan="2">{adultDescription}</td>
                          <td colSpan="4">
                            <Row className="mb-3">
                              <div className="col-md-12">
                                <input
                                  className="form-control"
                                  type="text"
                                  defaultValue={adultDescription}
                                  onChange={e => {
                                    setAdultDescription(e.target.value)
                                  }}
                                  id="example-number-input"
                                />
                              </div>
                            </Row>
                          </td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row">
                            Child
                          </th>
                          <td colSpan="2">{childDescription}</td>
                          <td colSpan="4">
                            <Row className="mb-3">
                              <div className="col-md-12">
                                <input
                                  className="form-control"
                                  type="text"
                                  defaultValue={childDescription}
                                  onChange={e => {
                                    setChildDescription(e.target.value)
                                  }}
                                  id="example-number-input"
                                />
                              </div>
                            </Row>
                          </td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row">
                            Infant Price
                          </th>
                          <td colSpan="2">{infantDescription}</td>
                          <td colSpan="4">
                            <Row className="mb-3">
                              <div className="col-md-12">
                                <input
                                  className="form-control"
                                  type="text"
                                  defaultValue={infantDescription}
                                  onChange={e => {
                                    setInfantDescription(e.target.value)
                                  }}
                                  id="example-number-input"
                                />
                              </div>
                            </Row>
                          </td>
                        </tr>
                        <tr>
                          <th className="text-nowrap" scope="row">
                            Family
                          </th>
                          <td colSpan="2">{familyDescription}</td>
                          <td colSpan="4">
                            <Row className="mb-3">
                              <div className="col-md-12">
                                <input
                                  className="form-control"
                                  type="text"
                                  defaultValue={familyDescription}
                                  onChange={e => {
                                    setFamilyDescription(e.target.value)
                                  }}
                                  id="example-number-input"
                                />
                              </div>
                            </Row>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                          <td colSpan="4">
                            <Button
                              color="success"
                              className="btn btn-success waves-effect waves-light col-lg-12"
                              onClick={async () => {
                                await addPassDescription()
                                await PassDescription()
                              }}
                            >
                              Success
                            </Button>{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          <Loader isLoading={isLoading} />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default PricingPlan

/* PricingPlan */
