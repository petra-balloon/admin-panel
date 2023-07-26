import React, { useState } from "react"
import { Link } from "react-router-dom"

import { Row, Col, CardBody, Card, Container } from "reactstrap"

// import images
import logoSm from "../../assets/images/logo-sm.png"
import { API_URL, axiosApi } from "helpers/api_helper"

const Register = () => {
  document.title = "Register | verticalsols - React Admin & Dashboard Template"
  const [isLoading, setIsLoading] = useState("")
  const [fullName, setFullName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const addAdmin = async event => {
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
          `${API_URL}admin/addsubadmin`,
          {
            fullName: fullName,
            emailAddress: emailAddress,
            password: password,
            role: role,
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
  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2"></i>
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20">Free Register</h5>
                    <p className="text-white-50">
                      Get your free verticalsols account now.
                    </p>
                    <Link to="/index" className="logo logo-admin">
                      <img src={logoSm} height="24" alt="logo" />
                    </Link>
                  </div>
                </div>
                <CardBody className="p-4">
                  <div className="p-3">
                    <form className="mt-4" action="#">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="useremail">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="useremail"
                          placeholder="Enter email"
                          onChange={e => {
                            setEmailAddress(e.target.value)
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="username">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="userpassword">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="userpassword"
                          placeholder="Enter password"
                        />
                      </div>

                      <div className="mb-3 row">
                        <div className="col-12 text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Add Admin
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
