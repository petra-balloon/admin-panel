import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Loader from "../Loader/spinloader";

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  Button,
  Label,
  ModalBody,
  ModalHeader,
  Input,
} from "reactstrap"
import { useEffect } from "react"
import axios from "axios"
import { API_URL } from "helpers/api_helper"
import { toastError,toastSuccess } from "components/Utils"; 
const EditPopUpModal = ({ openModal, closeModal, editTicketDetails,AllTickets }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [ticketId, setTicketId] = useState("")
  const [ChildNumber, setChildNumber] = useState()
  const [adultNumber, setAdultNumber] = useState()
  const [infantNumber, setInfantNumber] = useState()
  const [familyNumber, setFamilyNumber] = useState()

  const [currentpasses, setCurrentPasses] = useState()

  const [ticketDetails, setTicketDetails] = useState([])

  const [isCoupon, setIsCoupon] = useState(false)
  const [isFamily, setIsFamily] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [totalTicketAmount, setTotalTicketAmount] = useState(0)

  useEffect(() => {
    console.log("this is editr data <<<<<<<<<<<<<<======", editTicketDetails)
    setTicketId(editTicketDetails._id)
    setTicketDetails(editTicketDetails.reservation_details)
    getPass(editTicketDetails.selected_pass)
    if (editTicketDetails.discount_percentage != 0) {
      setIsCoupon(true)
      console.log("THIS IS COUPON")
    }

    var preReservation = editTicketDetails.reservation_details
    for (let i = 0; i < preReservation.length; i++) {
      console.log(preReservation[i])

      if (preReservation[i].type == "child") {
        setChildNumber(preReservation[i].quantity)
      }
      if (preReservation[i].type == "adult") {
        setAdultNumber(preReservation[i].quantity)
      }
      if (preReservation[i].type == "infant") {
        setInfantNumber(preReservation[i].quantity)
      }
      if (preReservation[i].type == "family") {
        setFamilyNumber(preReservation[i].quantity)
      }
    }
  }, [])

  const getPass = async passName => {
    setIsLoading(true);
    await axios
      .post(`${API_URL}pass-pricing/edit-ticket-pass/get`, {
        pass_name: passName,
      })
      .then(async response => {
        console.log(response.data.data)
        if (response.data.data.family_price != null) {
          setIsFamily(true)
        }
        setCurrentPasses(response.data.data)
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error)
        setIsLoading(false);
      })
  }

  const EditTicket = async passName => {
    setIsLoading(true);
    await axios
      .post(`${API_URL}ticket/edit-ticket`, {
        discountAmount: discountAmount,
        totalTicketAmount: totalTicketAmount,
        ticketDetails: ticketDetails,
        ticketId: ticketId,
      })
      .then(async response => {
        console.log(response.data.data)
        AllTickets();
        toastSuccess(response.data.message)
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error)
        toastError(response.data.message)
        setIsLoading(false);
      })
  }

  const CalculateTotalBill = async () => {
    //setTotalTicketAmount(parseInt(adultSubTotal) + parseInt(childSubtotal));
    var totalAmountOfSubTotal = 0
    for (let i = 0; i < ticketDetails.length; i++) {
      var totalAmountOfSubTotal =
        totalAmountOfSubTotal + ticketDetails[i].Sub_total
    }

    if (isCoupon) {
      console.log("discount percentage in bill function")
      var discountPercentage = editTicketDetails.discount_percentage
      var discountAmount = (discountPercentage / 100) * totalAmountOfSubTotal
      console.log("this is discount Amount", discountAmount)
      setTotalTicketAmount(totalAmountOfSubTotal - discountAmount)
      setDiscountAmount(parseInt(discountAmount))
    } else {
      setTotalTicketAmount(parseInt(totalAmountOfSubTotal))
    }

    //console.log("this is tickect details", ticketDetails);
    console.log("this is total", totalAmountOfSubTotal, discountAmount)
  }

  const AdultPriceAdd = async e => {
    setAdultNumber(e.target.value)
    var selectedNumberNew = e.target.value
    for (let i = 0; i < ticketDetails.length; i++) {
      if (ticketDetails[i].type == "adult") {
        ticketDetails.splice(i, 1)
      }
    }

    ticketDetails.push({
      type: "adult",
      quantity: selectedNumberNew,
      Sub_total: selectedNumberNew * currentpasses.adult_price,
    })
    console.log(ticketDetails)
    CalculateTotalBill()
  }

  const ChildPriceAdd = async e => {
    setChildNumber(e.target.value)
    var selectedNumberNewChild = e.target.value
    for (let i = 0; i < ticketDetails.length; i++) {
      if (ticketDetails[i].type == "child") {
        ticketDetails.splice(i, 1)
      }
    }

    ticketDetails.push({
      type: "child",
      quantity: selectedNumberNewChild,
      Sub_total: selectedNumberNewChild * currentpasses.child_price,
    })
    CalculateTotalBill()
  }

  const InfantPriceAdd = async e => {
    setInfantNumber(e.target.value)
    var selectedNumberNewInfant = e.target.value

    for (let i = 0; i < ticketDetails.length; i++) {
      if (ticketDetails[i].type == "infant") {
        ticketDetails.splice(i, 1)
      }
    }

    ticketDetails.push({
      type: "infant",
      quantity: selectedNumberNewInfant,
      Sub_total: selectedNumberNewInfant * currentpasses.infant_price,
    })
    CalculateTotalBill()
  }
  const FamilyPriceAdd = async e => {
    setFamilyNumber(e.target.value)
    var selectedNumberNewFamily = e.target.value

    for (let i = 0; i < ticketDetails.length; i++) {
      if (ticketDetails[i].type == "family") {
        ticketDetails.splice(i, 1)
      }
    }

    ticketDetails.push({
      type: "family",
      quantity: selectedNumberNewFamily,
      Sub_total: selectedNumberNewFamily * currentpasses.family_price,
    })
    console.log(ticketDetails)
    CalculateTotalBill()
  }

  return (
    <div>
      <Modal
        classNames={{
          modal: "edit-modal-body",
        }}
        open={openModal}
        onClose={closeModal}
        center
      >
        <Container>
          <Row>
            <Col sm={6} md={4} xl={12}>
              <div className="my-4">
                <ModalBody>
                  <Row>
                    <Col md={12} lg={12} xl={6}>
                      <div className="modal-main-div">
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="username">
                            Adult
                          </Label>
                          <Input
                            name="adult"
                            className="form-control"
                            placeholder="Enter Promo Name"
                            type="number"
                            id="adult"
                            defaultValue={adultNumber}
                            onChange={e => {
                              AdultPriceAdd(e)
                              //setCreatePromoName(e.target.value)
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="username">
                            Child
                          </Label>
                          <Input
                            name="child"
                            className="form-control"
                            placeholder="Enter Agency Name"
                            type="number"
                            id="child"
                            defaultValue={ChildNumber}
                            onChange={e => {
                              ChildPriceAdd(e)
                              //setCreateAgencyName(e.target.value)
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="username"
                            type="number"
                          >
                            Infant
                          </Label>
                          <Input
                            name="infant"
                            className="form-control"
                            placeholder="Enter discount percentage"
                            type="number"
                            id="infant"
                            defaultValue={infantNumber}
                            onChange={e => {
                              InfantPriceAdd(e)
                              //setDiscountPercentage(e.target.value)
                            }}
                          />
                        </div>
                        {isFamily && (
                          <div className="mb-3">
                            <Label
                              className="form-label"
                              htmlFor="username"
                              type="number"
                            >
                              Family
                            </Label>
                            <Input
                              name="promo_code"
                              className="form-control"
                              placeholder="Enter Promo Code"
                              type="number"
                              id="promo_code"
                              defaultValue={familyNumber}
                              onChange={e => {
                                FamilyPriceAdd(e)
                                // setPromoCode(e.target.value)
                              }}
                            />
                          </div>
                        )}

                        <div className="mb-3 row">
                          <div className=" text-end">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              onClick={async () => {
                                await EditTicket()
                                await closeModal()
                              }}
                            >
                              Edit Ticket
                            </button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>

                   <Loader isLoading={isLoading} /> 
                </ModalBody>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal>
    </div>
  )
}

export default EditPopUpModal
