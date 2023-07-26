import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "react-responsive-modal/styles.css"
import SecondModal from "./SecondModal"
import ThirdModal from "./ThirdModal"
import FourthModal from "./FourthModal"
import FifthModal from "./FifthModal"
import { BsArrowRight } from "react-icons/bs"
import Loader from "../Loader/spinloader"
import axios from "axios"
import { API_URL } from "helpers/api_helper"
import ParmentGatewayModal from "./PaymentModal"
//const API_URL = "http://localhost:5000/api/";
//const API_URL = "https://petra-balloon.herokuapp.com/api/";

const FirstModal = ({ setOpenModal, closeModal }) => {
  const [secondmodal, setSecondModal] = useState("first")
  //const [secondmodal, setSecondModal] = useState("first");
  const [selectedpass, setSelectedPass] = useState()
  const [allPasses, setAllPasses] = useState()
  const [firstmodalcontent, setFirstModalContent] = useState(true)

  const [resData, setResData] = useState("")
  const [ticketData, setTicketData] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [merchantSession, setMerchantSession] = useState("")

  useEffect(() => {
    getPass()
  }, [])

  const getPass = async (email, password) => {
    setIsLoading(true)
    await axios
      .get(`${API_URL}pass-pricing/get`, {})
      .then(async response => {
        console.log(response.data.data)
        setAllPasses(response.data.data)
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div>
      {secondmodal == "first" && (
        <div className="first-modal-main-container">
          <div className="container">
            <div className="row">
              <div>
                <div className="col-lg-12">
                  <div className="popup-heading">
                    <div className="heading-text">Select Products :</div>
                  </div>
                </div>
                {allPasses &&
                  allPasses.map(Details => (
                    <div
                      className="col-lg-12 hover-class"
                      onClick={async () => {
                        await setSelectedPass(Details)
                        setSecondModal("second")
                      }}
                    >
                      <div className="popup-text">
                        <p>{Details.pass_name}</p>
                        <BsArrowRight />
                      </div>
                    </div>
                  ))}

                {/* <div
                  className="col-lg-12 hover-class"
                  onClick={() => {
                    setSecondModal("second");
                    setPassName("fast_pass");
                  }}
                >
                  <div className="popup-text">
                    <p>Fast Pass :</p>
                    <BsArrowRight />
                  </div>
                </div>
                <div
                  className="col-lg-12 hover-class"
                  onClick={() => {
                    setSecondModal("second");
                    setPassName("regular_pass");
                  }}
                >
                  <div
                    className="popup-last-text"
                    onClick={() => {
                      setSecondModal("second");
                      setPassName("regular_pass");
                    }}
                  >
                    <p>Regular Pass :</p>
                    <BsArrowRight />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <button
            onClick={() => {
              setSecondModal("second");
            }}
          >
            Add Me
          </button> */}
        </div>
      )}
      {secondmodal == "second" && (
        <SecondModal
          secondmodal={secondmodal}
          selectedpass={selectedpass}
          resData={resData}
          setResData={setResData}
          setSecondModal={setSecondModal}
        />
      )}
      {secondmodal == "third" && (
        <ThirdModal
          secondmodal={secondmodal}
          setSecondModal={setSecondModal}
          resData={resData}
          setTicketData={setTicketData}
          setOpenModal={setOpenModal}
          setResData={setResData}
          closeModal={closeModal}
          setMerchantSession={setMerchantSession}
        />
      )}
      {secondmodal == "fourth" && (
        <FourthModal
          secondmodal={secondmodal}
          setSecondModal={setSecondModal}
        />
      )}
      {secondmodal == "fifth" && (
        <FifthModal
          secondmodal={secondmodal}
          setSecondModal={setSecondModal}
          ticketData={ticketData}
        />
      )}

      {secondmodal == "payment" && (
        <ParmentGatewayModal
          secondmodal={secondmodal}
          setSecondModal={setSecondModal}
          merchantSession={merchantSession}
        />
      )}

      <Loader isLoading={isLoading} />
    </div>
  )
}

export default FirstModal
