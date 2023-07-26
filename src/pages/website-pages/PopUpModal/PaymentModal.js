import React, { useState, useEffect } from "react"
import "react-responsive-modal/styles.css"

const ParmentGatewayModal = ({
  secondmodal,
  setSecondModal,
  merchantSession,
}) => {
  console.log("this is merchagent pos id", merchantSession)


  const [customerSession,setCustomerSession] =useState(merchantSession)
   useEffect(() => {
    setCustomerSession(merchantSession)
   fun()
  }, [merchantSession]);


  const fun =()=>{

    console.log("customerSession=========>",customerSession)
    sessionStorage.removeItem('HostedCheckout_sessionId')
    setTimeout(() => {
      window.Checkout.configure({
        session: {
          id: customerSession,
        },
      });
      window.Checkout.showEmbeddedPage("#embed-target");
    }, 2000);
   
  }
  return (
    <div className="fourth-modal-main-container">
      <div className="container">
        <div className="row">
          <div className="App">
            {/* <button
              onClick={() => {
                window.Checkout.configure({
                  session: {
                    id: merchantSession,
                  },
                })
                window.Checkout.showEmbeddedPage("#embed-target")
                // window.Checkout.showPaymentPage();
                // Callback for failed payment
              }}
            >
              Payment Master
            </button> */}
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            <div id="embed-target"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParmentGatewayModal
