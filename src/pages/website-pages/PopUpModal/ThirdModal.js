import React, { useState, useEffect } from "react"
import StripeCheckout from "react-stripe-checkout"
import Countdown from "react-countdown"
import axios from "axios"
import Moment from "react-moment"
import "react-responsive-modal/styles.css"
import { BsAlarm } from "react-icons/bs"
import { BsX } from "react-icons/bs"
import { BsBagFill } from "react-icons/bs"
import { BsGift } from "react-icons/bs"
import { MdOutlineCheckBox } from "react-icons/md"
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import Loader from "../Loader/spinloader"
import { API_URL } from "helpers/api_helper"

import Swal from "sweetalert2"
import "bootstrap/dist/css/bootstrap.min.css"

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector"

import CountrySelect from "react-bootstrap-country-select"

const ThirdModal = ({
  secondmodal,
  setSecondModal,
  resData,
  setOpenModal,
  setTicketData,
  closeModal,
  setMerchantSession,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(null)
  const [isopen, setIsOpen] = useState(false)
  const [isValidationComfirm, setIsValidationComfirm] = useState(false)
  const [isPaymentBtn, setIsPaymentBtn] = useState(true)

  const [errors, setErrors] = useState({})
  const [country, setCountry] = useState(null)
  const [second, setSecond] = useState(59)
  const [minutes, setMinutes] = useState(29)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")

  console.log("this is res qqqqqqqqqq data", resData)

  console.log("first name", firstName)
  function selectCountry(val) {
    setCountry(val)
  }

  useEffect(() => {})

  /* timer */
  const targetTime = Date.now() + 30 * 60 * 1000

  // Render function for the Countdown component
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a message when the countdown is completed
      return <span>Countdown finished!</span>
    } else {
      // Render the countdown timer
      return (
        <span>
          {/* {minutes}:{seconds} */}
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </span>
      )
    }
  }
  /* timer */
  //const API_URL = "http://localhost:5000/api/";
  const handleToken = async () => {
    setIsLoading(true)
    const usertoken = JSON.parse(localStorage.getItem("authUser"))
    console.log("this is user token to be send", usertoken)
    const config = {
      headers: {
        authorization: `bearer ${usertoken}`,
      },
    }
    await axios
      .post(
        `${API_URL}ticket/payment/pos`,
        {
          amount: `${resData.total_amount}`, // Replace with the desired amount
          currency: "USD",
          user_information: {
            country: country,
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            ticketId: resData._id,
          },
        },
        config
      )
      .then(async response => {
        console.log(response)
        setSecondModal("payment")

        if (response.data.message == "Update successful") {
          setMerchantSession(response.data.data.session.id)
          setSecondModal("payment")
          //setTicketData(response.data.data);
          // closeModal();
          // Swal.fire({
          //   title: "Success",
          //   text: "Payment successful email is send to your email address",
          //   icon: "success",
          //   confirmButtonText: "OK",
          // })
          // .then(function () {
          //     // Redirect the user
          //     window.location.href = "/tickets";
          //   });

          // setSecondModal("fifth");
          setIsLoading(false)
        }
      })
      .catch(function (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong please try again!",
          confirmButtonText: "OK",
        }).then(function () {
          // Redirect the user
          window.location.href = "/tickets"
        })
      })
  }

  const handleTokenCash = async () => {
    setIsLoading(true)
    const usertoken = JSON.parse(localStorage.getItem("authUser"))
    console.log("this is user token to be send", usertoken)
    const config = {
      headers: {
        authorization: `bearer ${usertoken}`,
      },
    }
    await axios
      .post(
        `${API_URL}ticket/payment/pos/cash`,
        {
          amount: `${resData.total_amount}`, // Replace with the desired amount
          currency: "USD",
          user_information: {
            country: country,
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            ticketId: resData._id,
          },
        },
        config
      )
      .then(async response => {
        console.log("cash response",response)
        if (response.data.message == "Update successful") {
          closeModal()
          Swal.fire({
            title: "Success",
            text: "Payment successful email is send to your email address",
            icon: "success",
            confirmButtonText: "OK",
          }).then(function () {
            // Redirect the user
            window.location.href = "/tickets";
          })

          // setSecondModal("fifth");
          setIsLoading(false)
        }
      })
      .catch(function (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong please try again!",
          confirmButtonText: "OK",
        }).then(function () {
          // Redirect the user
          window.location.href = "/tickets"
        })
      })
  }

  const handlFromValidation = async token => {
    if (validateForm()) {
      // Submit the form or perform further actions
      setIsValidationComfirm(true)
      setIsPaymentBtn(false)
      console.log("Form submitted successfully!")
    } else {
      console.log("Form error!!!!!")
    }
  }

  const validateForm = () => {
    let errors = {}

    // Perform validation logic
    if (!firstName) {
      errors.firstName = "First Name is required"
    }

    if (!email) {
      errors.email = "Email is required"
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format"
    }

    if (!lastName) {
      errors.lastName = "Last Name is required"
    }
    if (!mobile) {
      errors.mobile = "Mobile Number is required"
    }
    if (!country) {
      errors.country = "Country is required"
    }

    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  const isValidEmail = email => {
    // Regular expression for email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
  }

  return (
    <div className="third-modal-outer-div">
      <div className="third-modal-main-container">
        <div className="container">
          <div className="row">
            <div className="heading-wrap">
              <div className="col-lg-3 col-9">
                <div className="shoping-cart-top-div">
                  <div className="heading-top">Shopping Cart</div>
                  <div className="timer-main-class">
                    <BsAlarm className="heading-icon" />
                    <Countdown
                      className="running-timer"
                      date={targetTime}
                      renderer={renderer}
                    />
                    {/* <div className="running-timer">
                      {minutes < 10 ? "0" + minutes : minutes}:
                      {second < 10 ? "0" + second : second}
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-9"></div>
            </div>
          </div>
          <div className="third-modal-spacer"></div>
          <div className="row">
            {/* recipt */}
            <div className="col-lg-7">
              <div className="card-outer-div">
                <div className="row">
                  <div className="card-head">
                    <div className="col-lg-8">
                      <div className="third-product-class">Products</div>
                    </div>
                    <div className="col-lg-4">
                      <div className="third-price-class">Price</div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-8">
                    <div className="third-pass-details">{resData.selected_pass}</div>
                  </div>
                  <div className="col-lg-4">
                    <div className="third-total-recipt-price">
                      {resData.total_amount} JOD
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="third-date">
                      <span className="span-date-class-first">
                        <Moment format="D/MMM/YYYY">{resData.date}</Moment>
                      </span>{" "}
                      TO{" "}
                      <sapn className="span-date-class-second">
                        {" "}
                        <Moment format="D/MMM/YYYY">{resData.date}</Moment>
                      </sapn>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    {/* <div className="card-edit">
                      <BsFillPencilFill className="pencil-margin-left" />
                      <div className="third-edit-text-class">EDIT</div>
                    </div> */}
                  </div>
                  <div className="spacer-card-family"></div>
                  <div className="col-lg-8">
                    <div className="third-selected-family-div">
                      {resData.reservation_details.map(s => (
                        <div className="margin-for-family">
                          {s.type} {s.quantity}{" "}
                        </div>
                      ))}

                      {/*  <div>3Adults</div>
                      <div className="margin-for-family">3Adults</div>
                      <div className="margin-for-family">3Adults </div> */}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div
                      className="card-edit"
                      onClick={() => {
                        setOpenModal(false)
                      }}
                    >
                      <BsX className="cross-margin-left" />
                      <div className="third-cross-text-class">Remove</div>
                    </div>
                  </div>
                </div>

                <div className="spacer-top-total">
                  <div className="row">
                    <div className="biger-pricing-div">
                      <div className="col-lg-8">
                        <div className="due-now-text">Due Now</div>
                      </div>
                      <div className="col-lg-4">
                        <div className="due-now-text-price">
                          {resData.total_amount} JOD
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* redeem gift card */}
                <div className="spacer-top-total">
                  <div className="row">
                    <div className="biger-pricing-div">
                      <div className="col-lg-8"></div>
                      <div className="col-lg-4">
                        <div
                          className="redeem-gift-outer-div"
                          onClick={() => {
                            setSecondModal("fourth")
                          }}
                        >
                          <BsGift className="gift-icon" /> REDEEM GIFT CARD
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* contact information */}
            <div className="col-lg-5">
              <div className="row">
                <div className="col-lg-12">
                  <h6 className="contact-info-class">Contact Information</h6>
                </div>
                <div className="outside-info-div">
                  <div className="col-lg-12">
                    <div class="form-group">
                      <label className="third-label-class">First Name *</label>
                      <input
                        type="name"
                        class="form-control"
                        id="name"
                        placeholder="First Name"
                        onChange={e => setFirstName(e.target.value)}
                      />
                      {errors.firstName && (
                        <span className="error-span-third">
                          {" "}
                          *{errors.firstName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="input-margin-bottom-spacer"></div>
                  <div className="col-lg-12">
                    <div class="form-group">
                      <label className="third-label-class">Last Name *</label>
                      <input
                        type="name"
                        class="form-control"
                        id="name"
                        placeholder="last Name"
                        onChange={e => setLastName(e.target.value)}
                      />
                    </div>
                    {errors.lastName && (
                      <span className="error-span-third">
                        {" "}
                        *{errors.lastName}
                      </span>
                    )}
                  </div>
                  <div className="input-margin-bottom-spacer"></div>
                  <div className="col-lg-12">
                    <div class="form-group">
                      <label className="third-label-class">Email *</label>
                      <input
                        class="form-control"
                        id="email"
                        placeholder="user@gmail.com"
                        onChange={e => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <span className="error-span-third">
                          {" "}
                          *{errors.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="input-margin-bottom-spacer"></div>
                  <div className="col-lg-12">
                    <div class="form-group">
                      <label className="third-label-class">Mobile *</label>
                      <input
                        class="form-control"
                        id="number"
                        placeholder=""
                        onChange={e => setMobile(e.target.value)}
                      />
                      {errors.mobile && (
                        <span className="error-span-third">
                          {" "}
                          *{errors.mobile}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="input-margin-bottom-spacer"></div>
                  <div className="col-lg-12">
                    <div class="form-group">
                      <label className="third-label-class">Country *</label>
                      <CountryDropdown
                        class="form-control"
                        value={country}
                        onChange={val => selectCountry(val)}
                      />
                      {errors.country && (
                        <span className="error-span-third">
                          {" "}
                          *{errors.country}
                        </span>
                      )}
                      {/* <label className="third-label-class">Country *</label>
                      <CountrySelect
                        class="form-control"
                        value={value}
                        onChange={setValue}
                      /> */}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="third-check-box-outer-div">
                      {!isValidationComfirm && (
                        <MdOutlineCheckBoxOutlineBlank
                          onClick={async () => {
                            await handlFromValidation()
                          }}
                          className="check-box-input"
                        />
                      )}
                      {isValidationComfirm && (
                        <MdOutlineCheckBox className="check-box-input after-check-box-input" />
                      )}
                      {/* <input className="check-box-input" type="checkbox" /> */}
                      <div>
                        Send me the latest offers and exclusive discounts.
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="input-margin-bottom-spacer"></div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="payment-heading">
                    Payment Details :{resData.total_amount} JOD
                  </div>
                  {/*                   <div className="payment-heading"></div> */}
                </div>
              </div>
              {/* credit card */}
              <div className="input-margin-bottom-spacer"></div>
              {/* <div className="row">
                <div className="outside-info-div">
                  <div className="col-lg-12">
                    <div className="credit-card">
                      <BsCreditCard className="credit-card-icon" />
                      <div>Credit Card</div>
                    </div>
                  </div>
                  <div className="input-margin-bottom-spacer"></div>
                  <div className="col-lg-12">
                    <div class="form-group">
                      <label className="credit-card-labels">
                        Card Number *
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="number"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="card-type-class">
                      <FaCcVisa className="visa-card-type" />
                      <FaCcMastercard className="master-card-type" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <div class="form-group">
                          <label className="credit-card-labels">
                            Expiry Date *
                          </label>
                          <input
                            type="number"
                            class="form-control"
                            id="number"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div class="form-group">
                          <label className="credit-card-labels">
                            Security Code *
                          </label>
                          <input
                            type="number"
                            class="form-control"
                            id="number"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input-margin-bottom-spacer"></div>
                  <div className="col-lg-12">
                    <div class="form-group">
                      <label className="credit-card-labels">
                        Name on The Card *
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="number"
                        placeholder="J.Smith"
                      />
                    </div>
                  </div>
                  <div className="input-margin-bottom-spacer"></div>
                  <div className="col-lg-12">
                    <div className="checkout-btn-outer-div">
                      <BsBagFill className="checkout-icon-class" /> Pay AED 600
                    </div>
                  </div>
                </div>
                <div className="input-margin-bottom-spacer"></div>
              </div> */}
              <div className="row">
                <div className="col-lg-6">
                  <button
                    className="checkout-btn-outer-div"
                    onClick={handleToken}
                  >
                    <BsBagFill className="checkout-icon-class" />
                    Card Payment JOD {resData.total_amount}
                  </button>
                </div>
                <div className="col-lg-6">
                  <button
                    className="checkout-btn-outer-div"
                    onClick={handleTokenCash}
                  >
                    <BsBagFill className="checkout-icon-class" />
                    Cash Payment JOD {resData.total_amount}
                  </button>
                </div>
              </div>
            </div>
            <div className="input-margin-bottom-spacer"></div>
            {/* <button>
              onclick
            </button> */}
          </div>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </div>
  )
}

export default ThirdModal
