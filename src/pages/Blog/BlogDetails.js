import React, { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"

import {
  Container,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useLocation } from "react-router-dom"
import { Fragment } from "react"
import { Editor } from "react-draft-wysiwyg"
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
} from "draft-js"
import { API_URL, axiosApi } from "helpers/api_helper"
import draftToHtml from "draftjs-to-html"

const BlogDetails = () => {
  document.title =
    "Blog Details | verticalsols - React Admin & Dashboard Template"
  const location = useLocation()

  // Access the props passed from the previous route
  const propsReceived = location.state

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {propsReceived == null ? (
                    <Navigate
                      to={{
                        pathname: "/blog",
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: propsReceived.blogDescription,
                      }}
                    ></div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default BlogDetails
