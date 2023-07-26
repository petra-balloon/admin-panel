import React, { useEffect, useRef, useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  CardImg,
  CardDeck,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap"

import { Link, useNavigate } from "react-router-dom"

import { API_URL, axiosApi } from "helpers/api_helper"
import Loader from "components/Loader"

const TeamMember = () => {
  const [modal_xlarge, setmodal_xlarge] = useState(false)
  const [edit_modal_xlarge, setedit_modal_xlarge] = useState(false)
  const [selectedFiles, setselectedFiles] = useState(null)
  const [memberName, setMemberName] = useState("")
  const [designation, setDesignation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [teamMembers, setTeamMembers] = useState([])
  const ref = useRef()
  const refClose = useRef()
  const showFile = () => {
    ref.current.click()
  }

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const addTeamMembers = async event => {
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
          `${API_URL}team/addmember`,
          {
            name: memberName,
            designation: designation,
            picture: selectedFiles,
          },
          config
        )
        .then(async response => {
          setMemberName("")
          setselectedFiles(null)
          setDesignation("")
          await fetchTeamMembers()
          setIsLoading(false)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTeamMember = async event => {
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
          `${API_URL}team/deletemember`,
          {
            teamId: event,
          },
          config
        )
        .then(async response => {
          await fetchTeamMembers()
          setIsLoading(false)
        })
        .catch(function (error) {})
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTeamMembers = async () => {
    try {
      await axiosApi
        .get(`${API_URL}team/getmembers`)
        .then(response => {
          setTeamMembers(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const tog_xlarge = () => {
    setmodal_xlarge(!modal_xlarge)
    removeBodyCss()
  }
  const edit_tog_xlarge = () => {
    setedit_modal_xlarge(!edit_modal_xlarge)
    removeBodyCss()
  }

  const fileSelected = e => {
    const target = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(target)
    reader.onload = () => {
      setselectedFiles(reader.result)
    }
  }
  const navigate = useNavigate()
  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  document.title =
    "Form Elements | verticalsols - React Admin & Dashboard Template"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* edit project */}
          {/* <Row>
            <Col sm={6} md={4} xl={3}>
              <div className="my-4 text-center">
                <Modal
                  isOpen={edit_modal_xlarge}
                  toggle={edit_modal_xlarge}
                  size="xl"
                >
                  <ModalHeader className="mt-0" toggle={edit_tog_xlarge}>
                    Edit Project{" "}
                  </ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col lg={6}>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Project Title
                        </label>
                        <div className="col-md-10">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Artisanal kale"
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Client Name
                        </label>
                        <div className="col-md-10">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Artisanal kale"
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-6 col-form-label"
                        >
                          Start and Completion Dates (Range)
                        </label>
                        <div className="col-md-10">
                          <Flatpickr
                            className="form-control d-block"
                            placeholder="dd M,yyyy"
                            options={{
                              mode: "range",
                              dateFormat: "Y-m-d",
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label
                            htmlFor="example-text-input"
                            className="col-md-6 col-form-label"
                          >
                            Project Category
                          </label>
                          <div className="col-md-10">
                            <Select
                              value={selectedGroup}
                              onChange={() => {
                                handleSelectGroup()
                              }}
                              options={optionGroup}
                              classNamePrefix="select2-selection"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-6 col-form-label"
                        >
                          Project Description
                        </label>
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      </Col>
                      <Col lg={6} className="border-bottom">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-6 col-form-label"
                        >
                          Project Image
                        </label>
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles)
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div
                                className="dz-message needsclick"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="mb-3">
                                  <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                                </div>
                                <h4>Drop files here or click to upload.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {selectedFiles.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            )
                          })}
                        </div>
                      </Col>
                      <Col lg={4} style={{ marginTop: "1rem" }}></Col>
                      <Col lg={4} style={{ marginTop: "1rem" }}>
                        <Button
                          color="primary"
                          className="btn btn-danger btn-lg w-100 waves-effect waves-light"
                        >
                          Update
                        </Button>
                      </Col>
                      <Col lg={4} style={{ marginTop: "1rem" }}></Col>
                    </Row>
                  </ModalBody>
                </Modal>
              </div>
            </Col>
          </Row> */}
          {/* edit project */}
          {/* modal add project */}
          <Row>
            <Col sm={6} md={4} xl={3}>
              <div className="my-4 text-center">
                <Modal isOpen={modal_xlarge} toggle={tog_xlarge} size="xl">
                  <ModalHeader className="mt-0" toggle={tog_xlarge}>
                    Add New Project{" "}
                  </ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col lg={6}>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-md-10">
                          <textarea
                            className="form-control"
                            type="textarea"
                            placeholder="Artisanal kale"
                            onChange={e => {
                              setMemberName(e.target.value)
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Designation
                        </label>
                        <div className="col-md-10">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Artisanal kale"
                            onChange={e => {
                              setDesignation(e.target.value)
                            }}
                          />
                        </div>
                      </Col>

                      <Col lg={6} className="border-bottom">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-6 col-form-label"
                        >
                          Picture
                        </label>
                        {selectedFiles !== null ? (
                          <>
                            <img
                              src={selectedFiles}
                              style={{
                                width: "100%",
                                height: "230px",
                                objectFit: "contain",
                              }}
                            />
                            <div className="mb-3" onClick={showFile}>
                              <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                            </div>
                          </>
                        ) : (
                          <div className="dropzone" onClick={showFile}>
                            <div className="dz-message needsclick">
                              <div className="mb-3">
                                <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        )}
                        <input
                          type="file"
                          onChange={e => {
                            fileSelected(e)
                          }}
                          style={{ display: "none" }}
                          ref={ref}
                        />
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        ></div>
                      </Col>
                      <Col lg={4} style={{ marginTop: "1rem" }}></Col>
                      <Col lg={4} style={{ marginTop: "1rem" }}>
                        <Button
                          color="primary"
                          className="btn btn-danger btn-lg w-100 waves-effect waves-light"
                          onClick={async () => {
                            await addTeamMembers()
                            setmodal_xlarge(false)
                          }}
                        >
                          Submit
                        </Button>
                      </Col>

                      <Col lg={4} style={{ marginTop: "1rem" }}></Col>
                    </Row>
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
                  + Add Team Member
                </Button>{" "}
              </Card>
            </Col>
          </Row>
          {/* project cards */}
          <Row>
            {teamMembers.length === 0 ? (
              <h5>No Members to Show</h5>
            ) : (
              teamMembers.map(value => {
                const showImage =
                  "https://verticalsols-image.s3.ap-south-1.amazonaws.com"
                // if (value.description.length > 150)
                //   value.description = value.description.substring(0, 150)
                return (
                  <Col className="col-xl-4 col-xs-12">
                    <h4 className="my-3">Members</h4>
                    <CardDeck className="card-deck-wrapper">
                      <div className="card-group">
                        <Card className="mb-4">
                          <CardImg
                            top
                            className="img-fluid"
                            alt="verticalsols"
                            src={`${showImage}/${value.picture}`}
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "contain",
                            }}
                          />
                          <CardBody>
                            <CardTitle className="h4">{value.name}</CardTitle>
                            <p className="card-text">{value.designation}</p>
                            <Row>
                              <Col lg={6}>
                                <Button
                                  color="danger"
                                  className="btn btn-success waves-effect waves-light"
                                >
                                  Edit Member
                                </Button>
                              </Col>
                              <Col lg={4}>
                                <Button
                                  color="danger"
                                  className="btn btn-success waves-effect waves-light"
                                  onClick={async () => {
                                    await deleteTeamMember(value._id)
                                  }}
                                >
                                  Delete
                                </Button>
                              </Col>
                            </Row>
                            <p className="card-text">
                              <small className="text-muted"></small>
                            </p>
                          </CardBody>
                        </Card>
                      </div>
                    </CardDeck>
                  </Col>
                )
              })
            )}
          </Row>
          <Loader isLoading={isLoading} />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default TeamMember
