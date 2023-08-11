import React, { useState } from "react"
import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"
import Loader from "../Loader/spinloader"
import { Link, useNavigate } from "react-router-dom"
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
import { toastError, toastSuccess } from "components/Utils"
const RedeemPopUpModal = ({
  openModal,
  closeModal,
  editTicketDetails,
  AllTickets,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [ticketId, setTicketId] = useState("")
  const [ChildNumber, setChildNumber] = useState(0)
  const [adultNumber, setAdultNumber] = useState(0)
  const [infantNumber, setInfantNumber] = useState(0)
  const [familyNumber, setFamilyNumber] = useState(0)

  const [selectedChildNumber, setSelectedChildNumber] = useState(0)
  const [selectedAdultNumber, setSelectedAdultNumber] = useState(0)
  const [selectedInfantNumber, setSelectedInfantNumber] = useState(0)
  const [selectedFamilyNumber, setSelectedFamilyNumber] = useState(0)

  const [alreadyRedeemChildNumber, setAlreadyRedeemChildNumber] = useState(0)
  const [alreadyRedeemAdultNumber, setAlreadyRedeemAdultNumber] = useState(0)
  const [alreadyRedeemInfantNumber, setAlreadyRedeemInfantNumber] = useState(0)
  const [alreadyRedeemFamilyNumber, setAlreadyRedeemFamilyNumber] = useState(0)

  const [changeChildNumber, setChangeChildNumber] = useState(0)
  const [changeAdultNumber, setChangeAdultNumber] = useState(0)
  const [changeInfantNumber, setChangeInfantNumber] = useState(0)
  const [changeFamilyNumber, setChangeFamilyNumber] = useState(0)

  //warning
  const [childWarning, setChildWarning] = useState(false)
  const [adultWarning, setAdultWarning] = useState(false)
  const [infantWarning, setInfantWarning] = useState(false)
  const [familyWarning, setFamilyWarning] = useState(false)
  const [btnWarning, setBtnWarning] = useState(false)
  const [emptyWarning, setEmptyWarning] = useState(false)

  const [currentpasses, setCurrentPasses] = useState()

  const [ticketDetails, setTicketDetails] = useState([])

  const [isCoupon, setIsCoupon] = useState(false)
  const [isFamily, setIsFamily] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [totalTicketAmount, setTotalTicketAmount] = useState(0)

  const [dballReadyRedeem, setDbAllReadyRedeem] = useState([])
  const [allReadyRedeem, setAllReadyRedeem] = useState([])
  const [currentallRedeem, setCurrentReadyRedeem] = useState([])
  const [boardingPassData, setBoardingPassData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    console.log("this is editr data <<<<<<<<<<<<<<======", editTicketDetails)
    console.log("????????????????????????????", editTicketDetails.redeem_ticket)
    setTicketId(editTicketDetails._id)
    setTicketDetails(editTicketDetails.reservation_details)
    setAllReadyRedeem(editTicketDetails.redeem_ticket)
    setDbAllReadyRedeem(editTicketDetails.redeem_ticket)
    getPass(editTicketDetails.selected_pass)

    var preReservation = editTicketDetails.reservation_details
    for (let i = 0; i < preReservation.length; i++) {
      console.log(preReservation[i])

      if (preReservation[i].type == "child") {
        setChildNumber(preReservation[i].quantity)
        setSelectedChildNumber(parseInt(preReservation[i].quantity))
      }
      if (preReservation[i].type == "adult") {
        setAdultNumber(parseInt(preReservation[i].quantity))
        setSelectedAdultNumber(parseInt(preReservation[i].quantity))
      }
      if (preReservation[i].type == "infant") {
        setInfantNumber(preReservation[i].quantity)
        setSelectedInfantNumber(parseInt(preReservation[i].quantity))
      }
      if (preReservation[i].type == "family") {
        setFamilyNumber(preReservation[i].quantity)
        setSelectedFamilyNumber(parseInt(preReservation[i].quantity))
      }
    }

    var AllreadyRedemmByCustomer = editTicketDetails.redeem_ticket
    for (let i = 0; i < AllreadyRedemmByCustomer.length; i++) {
      console.log(AllreadyRedemmByCustomer[i])

      if (preReservation[i].type == "child") {
        setAlreadyRedeemChildNumber(AllreadyRedemmByCustomer[i].quantity)
      }
      if (preReservation[i].type == "adult") {
        setAlreadyRedeemAdultNumber(
          parseInt(AllreadyRedemmByCustomer[i].quantity)
        )
      }
      if (preReservation[i].type == "infant") {
        setAlreadyRedeemInfantNumber(AllreadyRedemmByCustomer[i].quantity)
      }
      if (preReservation[i].type == "family") {
        setAlreadyRedeemFamilyNumber(AllreadyRedemmByCustomer[i].quantity)
      }
    }
  }, [])

  const CreateBoardingPass = async => {
    for (let i = 0; i < currentallRedeem.length; i++) {
      const itemToaPush = currentallRedeem[i].quantity
      console.log(currentallRedeem, "itemToaPush")
      const itemType = currentallRedeem[i].type
      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      }

      for (let i = 0; i < itemToaPush; i++) {
        var randomNumber = getRandomNumber(100000, 10000000000)
        boardingPassData.push({
          type: itemType,
          boardingNumber: randomNumber,
          selected_pass: editTicketDetails.selected_pass
        })
      }
    }
  }

  const getPass = async passName => {
    setIsLoading(true)
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
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error)
        setIsLoading(false)
      })
  }

  const EditTicket = async passName => {
    if (
      childWarning == false &&
      adultWarning == false &&
      infantWarning == false &&
      familyWarning == false
    ) {
      setIsLoading(true)
      await axios
        .post(`${API_URL}ticket/redeem-ticket`, {
          redeem_ticket: allReadyRedeem,
          ticketId: ticketId,
        })
        .then(async response => {
          console.log(response.data.data)
          AllTickets()
          toastSuccess(response.data.message)
          await closeModal()
          setIsLoading(false)
          //editTicketDetails
          navigate("/boarding-pass", { state: { sendData: boardingPassData } })
        })
        .catch(async function (error) {
          console.log(error)
          toastError(response.data.message)
          await closeModal()
          setIsLoading(false)
        })
    } else {
      setBtnWarning(true)
    }
  }

  const AdultAdd = async e => {
    var inputValue = parseInt(e.target.value)

    if (e.target.value < 0) {
      setAdultWarning(true)
    } else {
      if (isNaN(inputValue)) {
        console.log("not a number")
      } else {
        //setSelectedAdultNumber(e.target.value)
        var selectedNumberNew = inputValue
        console.log(selectedNumberNew)
        var preNumber = selectedNumberNew

        for (let i = 0; i < allReadyRedeem.length; i++) {
          if (allReadyRedeem[i].type == "adult") {
            console.log(parseInt(selectedNumberNew), allReadyRedeem[i])
            preNumber =
              parseInt(selectedNumberNew) + parseInt(alreadyRedeemAdultNumber)
            console.log(":::::::::::::::::::::::", preNumber)
            allReadyRedeem.splice(i, 1)
          }
        }
        if (preNumber > adultNumber) {
          setAdultWarning(true)
        } else {
          setAdultWarning(false)
          setBtnWarning(false)
        }

        allReadyRedeem.push({
          type: "adult",
          quantity: preNumber,
          selected_pass: editTicketDetails.selected_pass
        })

        for (let i = 0; i < currentallRedeem.length; i++) {
          if (currentallRedeem[i].type == "adult") {
            currentallRedeem.splice(i, 1)
          }
        }

        currentallRedeem.push({
          type: "adult",
          quantity: selectedNumberNew,
          selected_pass: editTicketDetails.selected_pass
        })
        //console.log('this is currentallRedeem',currentallRedeem)
        console.log(allReadyRedeem)
      }
    }
  }

  const ChildAdd = async e => {
    if (e.target.value < 0) {
      setChildWarning(true)
    } else {
      var inputValue = parseInt(e.target.value)
      if (isNaN(inputValue)) {
        console.log("not a number")
      } else {
        //setSelectedAdultNumber(e.target.value)
        var selectedNumberNew = inputValue
        console.log(selectedNumberNew)
        var preNumber = selectedNumberNew

        for (let i = 0; i < allReadyRedeem.length; i++) {
          if (allReadyRedeem[i].type == "child") {
            console.log(parseInt(selectedNumberNew), allReadyRedeem[i])
            preNumber =
              parseInt(selectedNumberNew) + parseInt(alreadyRedeemChildNumber)
            console.log(":::::::::::::::::::::::", preNumber)
            allReadyRedeem.splice(i, 1)
          }
        }
        if (preNumber > ChildNumber) {
          setChildWarning(true)
        } else {
          setChildWarning(false)
          setBtnWarning(false)
        }

        allReadyRedeem.push({
          type: "child",
          quantity: preNumber,
          selected_pass: editTicketDetails.selected_pass
        })

        for (let i = 0; i < currentallRedeem.length; i++) {
          if (currentallRedeem[i].type == "child") {
            currentallRedeem.splice(i, 1)
          }
        }

        currentallRedeem.push({
          type: "child",
          quantity: selectedNumberNew,
          selected_pass: editTicketDetails.selected_pass
        })
        console.log(allReadyRedeem)
      }
    }
  }

  const InfantAdd = async e => {
    if (e.target.value < 0) {
      setInfantWarning(true)
    } else {
      var inputValue = parseInt(e.target.value)
      if (isNaN(inputValue)) {
        console.log("not a number")
      } else {
        //setSelectedAdultNumber(e.target.value)
        var selectedNumberNew = inputValue
        console.log(selectedNumberNew)
        var preNumber = selectedNumberNew

        for (let i = 0; i < allReadyRedeem.length; i++) {
          if (allReadyRedeem[i].type == "infant") {
            console.log(parseInt(selectedNumberNew), allReadyRedeem[i])
            preNumber =
              parseInt(selectedNumberNew) + parseInt(alreadyRedeemInfantNumber)
            console.log(":::::::::::::::::::::::", preNumber)
            allReadyRedeem.splice(i, 1)
          }
        }
        if (preNumber > infantNumber) {
          setInfantWarning(true)
        } else {
          setInfantWarning(false)
          setBtnWarning(false)
        }

        allReadyRedeem.push({
          type: "infant",
          quantity: preNumber,
          selected_pass: editTicketDetails.selected_pass
        })

        for (let i = 0; i < currentallRedeem.length; i++) {
          if (currentallRedeem[i].type == "infant") {
            currentallRedeem.splice(i, 1)
          }
        }

        currentallRedeem.push({
          type: "infant",
          quantity: selectedNumberNew,
          selected_pass: editTicketDetails.selected_pass
        })

        console.log(allReadyRedeem)
      }
    }
  }
  const FamilyAdd = async e => {
    var inputValue = parseInt(e.target.value)
    if (isNaN(inputValue)) {
      console.log("not a number")
    } else {
      //setSelectedAdultNumber(e.target.value)
      var selectedNumberNew = inputValue
      console.log(selectedNumberNew)
      var preNumber = selectedNumberNew

      for (let i = 0; i < allReadyRedeem.length; i++) {
        if (allReadyRedeem[i].type == "family") {
          console.log(parseInt(selectedNumberNew), allReadyRedeem[i])
          preNumber =
            parseInt(selectedNumberNew) + parseInt(alreadyRedeemFamilyNumber)
          console.log(":::::::::::::::::::::::", preNumber)
          allReadyRedeem.splice(i, 1)
        }
      }
      if (preNumber > familyNumber) {
        setFamilyWarning(true)
      } else {
        setFamilyWarning(false)
        setBtnWarning(false)
      }

      allReadyRedeem.push({
        type: "family",
        quantity: preNumber,
      })

      for (let i = 0; i < currentallRedeem.length; i++) {
        if (currentallRedeem[i].type == "family") {
          currentallRedeem.splice(i, 1)
        }
      }

      currentallRedeem.push({
        type: "family",
        quantity: selectedNumberNew,
      })

      console.log(allReadyRedeem)
    }
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
                        {adultNumber != 0 && (
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="username">
                              <span>Adult</span>{" "}
                              <span
                                style={{ marginLeft: "25px", color: "#626ed4" }}
                              >
                                Total Tickets : {adultNumber}
                              </span>
                              <span
                                style={{ marginLeft: "25px", color: "#ec4561" }}
                              >
                                AllReady Redeem : {alreadyRedeemAdultNumber}
                              </span>
                            </Label>
                            <Input
                              name="adult"
                              className="form-control"
                              placeholder="Please Enter"
                              type="number"
                              id="adult"
                              min="0"
                              onChange={e => {
                                setChangeAdultNumber(e.target.value)
                                AdultAdd(e)
                              }}
                            />
                            {adultWarning && (
                              <label style={{ color: "red" }}>
                                You enter invalid number
                              </label>
                            )}
                          </div>
                        )}

                        {ChildNumber != 0 && (
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="username">
                              <span>Child</span>{" "}
                              <span
                                style={{ marginLeft: "25px", color: "#626ed4" }}
                              >
                                Total Tickets : {ChildNumber}
                              </span>
                              <span
                                style={{ marginLeft: "25px", color: "#ec4561" }}
                              >
                                AllReady Redeem : {alreadyRedeemChildNumber}
                              </span>
                            </Label>
                            <Input
                              name="child"
                              className="form-control"
                              placeholder="Please Enter"
                              type="number"
                              id="child"
                              onChange={e => {
                                ChildAdd(e)
                                //setCreateAgencyName(e.target.value)
                              }}
                            />
                            {childWarning && (
                              <label style={{ color: "red" }}>
                                 You enter invalid number
                              </label>
                            )}
                          </div>
                        )}
                        {infantNumber != 0 && (
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="username">
                              <span>Infant</span>{" "}
                              <span
                                style={{ marginLeft: "25px", color: "#626ed4" }}
                              >
                                Total Tickets : {infantNumber}
                              </span>
                              <span
                                style={{ marginLeft: "25px", color: "#ec4561" }}
                              >
                                AllReady Redeem : {alreadyRedeemInfantNumber}
                              </span>
                            </Label>
                            <Input
                              name="infant"
                              className="form-control"
                              placeholder="Please Enter"
                              type="number"
                              id="infant"
                              onChange={e => {
                                InfantAdd(e)
                                //setDiscountPercentage(e.target.value)
                              }}
                            />
                            {infantWarning && (
                              <label style={{ color: "red" }}>
                                 You enter invalid number
                              </label>
                            )}
                          </div>
                        )}

                        {familyNumber != 0 && (
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="username">
                              <span>Family</span>{" "}
                              <span
                                style={{ marginLeft: "25px", color: "#626ed4" }}
                              >
                                Total Tickets : {familyNumber}
                              </span>
                              <span
                                style={{ marginLeft: "25px", color: "#ec4561" }}
                              >
                                AllReady Redeem : {alreadyRedeemFamilyNumber}
                              </span>
                            </Label>
                            <Input
                              name="promo_code"
                              className="form-control"
                              placeholder="Please Enter"
                              type="number"
                              id="promo_code"
                              onChange={e => {
                                FamilyAdd(e)
                                // setPromoCode(e.target.value)
                              }}
                            />
                            {familyWarning && (
                              <label style={{ color: "red" }}>
                                 You enter invalid number
                              </label>
                            )}
                          </div>
                        )}

                        <div className="mb-3 row">
                          <div className=" text-end">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              onClick={async () => {
                                await CreateBoardingPass()
                                await EditTicket()
                                //await closeModal()
                              }}
                            >
                              Print Ticket
                            </button>
                            {btnWarning && (
                              <label style={{ color: "red" }}>
                                Please enter valid value
                              </label>
                            )}
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

export default RedeemPopUpModal
