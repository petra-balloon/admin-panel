import React, { useRef, useState } from "react"

import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormFeedback,
} from "reactstrap"

import {
  EditorState,
  convertToRaw,
  ContentState,
  Modifier,
  convertFromHTML,
} from "draft-js"
import draftToHtml from "draftjs-to-html"

import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { API_URL, axiosApi } from "helpers/api_helper"
import Loader from "components/Loader"
import { toastError, toastSuccess } from "components/Utils"
const EditBlogs = ({
  value,
  edit_modal_xlarge,
  closeModal,
  setedit_modal_xlarge,
  fetchHtml,
}) => {
  let editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(convertFromHTML("<p></p>"))
  )

  const [descriptionState, setDescriptionState] = useState(editorState)
  const handleEditorChange = newEditorState => {
    setDescriptionState(newEditorState)
  }

  const [description, setDescription] = useState(value.description)
  const [blogTitle, setBlogTitle] = useState(value.blogTitle)
  const [blogCategorie, setBlogCategorie] = useState(value.blogCategorie)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFiles, setselectedFiles] = useState(null)

  const [selectedFilesError, setSelectedFilesError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [blogCategorieError, setBlogCategorieError] = useState("")

  const contentState = descriptionState.getCurrentContent()
  const raw = convertToRaw(contentState)
  const html = draftToHtml(raw)

  const ref = useRef()
  const refClose = useRef()
  const showFile = () => {
    ref.current.click()
  }

  const handleImageUpload = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        await axiosApi
          .post(`${API_URL}blogs/addeditorpic`, {
            editorImage: reader.result,
          })
          .then(async response => {
            resolve({
              data: {
                link: `https://verticalsols-image.s3.ap-south-1.amazonaws.com/${response.data.data}`,
              },
            })
          })
      }
      reader.onerror = error => reject(error)
    })
  }

  const fileSelected = e => {
    const target = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(target)
    reader.onload = () => {
      setselectedFiles(reader.result)
    }
  }
  const editBlogs = async event => {
    const token = JSON.parse(localStorage.getItem("authUser"))
    const config = {
      headers: {
        authorization: `bearer ${token}`,
      },
    }
    try {
      setIsLoading(true)
      await axiosApi
        .post(
          `${API_URL}blogs/editblog`,
          {
            blogId: value._id,
            blogThumbnail: selectedFiles,
            blogDescription: html,
            description: description,
            blogCategorie: blogCategorie,
            blogTitle: blogTitle,
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
          toastError(error)
          setIsLoading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const checkValidationOnClick = () => {
    let isValid = true

    if (description === "") {
      setDescriptionError("Please write a description")
      isValid = false
    }
    if (blogCategorie === "") {
      setBlogCategorieError("Please Select a a Blog Categorie")
      isValid = false
    }
    return isValid
  }

  const imageurl = "https://verticalsols-image.s3.ap-south-1.amazonaws.com/"
  return (
    <Row>
      <Col sm={6} md={4} xl={3}>
        <div className="my-4 text-center">
          <Modal isOpen={edit_modal_xlarge} toggle={closeModal} size="xl">
            <ModalHeader className="mt-0" toggle={closeModal}>
              Add New Project{" "}
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col lg={6}>
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Blog Title
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Artisanal kale"
                      onChange={e => {
                        setBlogTitle(e.target.value)
                      }}
                      value={blogTitle}
                    />
                  </div>
                </Col>

                <Col lg={6}>
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Categorie
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="textarea"
                      placeholder="Artisanal kale"
                      onChange={e => {
                        setBlogCategorieError("")
                        setBlogCategorie(e.target.value)
                      }}
                      value={blogCategorie}
                    />
                    {blogCategorieError !== "" && (
                      <FormFeedback type="invalid" style={{ display: "block" }}>
                        {blogCategorieError}
                      </FormFeedback>
                    )}
                  </div>
                </Col>
                <Col lg={6}>
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-md-10">
                    <textarea
                      className="form-control"
                      type="textarea"
                      placeholder="Artisanal kale"
                      onChange={e => {
                        setDescription(e.target.value)
                      }}
                      value={description}
                    />
                  </div>
                </Col>
                <Col lg={6} className="border-bottom">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-6 col-form-label"
                  >
                    Blog Thumbnail
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
                    <>
                      <img
                        src={`${imageurl}${value.blogThumbnail}`}
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
                <Col lg={12}>
                  <label
                    htmlFor="example-text-input"
                    className="col-md-6 col-form-label"
                  >
                    Project Description
                  </label>
                  <Editor
                    editorState={descriptionState}
                    onEditorStateChange={handleEditorChange}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    toolbar={{
                      image: {
                        uploadCallback: handleImageUpload,
                        previewImage: true,
                        alt: { present: true, mandatory: true },
                      },
                    }}
                  />
                </Col>
                <Col lg={4} style={{ marginTop: "1rem" }}></Col>
                <Col lg={4} style={{ marginTop: "1rem" }}>
                  <Button
                    color="primary"
                    className="btn btn-danger btn-lg w-100 waves-effect waves-light"
                    onClick={async () => {
                      if (checkValidationOnClick()) {
                        await editBlogs()
                        await fetchHtml()
                        setedit_modal_xlarge(false)
                      }
                    }}
                  >
                    Update Blog
                  </Button>
                </Col>
                <Loader isLoading={isLoading} />
                <Col lg={4} style={{ marginTop: "1rem" }}></Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
      </Col>
    </Row>
  )
}

export default EditBlogs
