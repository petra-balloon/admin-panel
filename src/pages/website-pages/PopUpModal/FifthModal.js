import React, { useEffect, useState, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
/*  import logosmImg from "assets/img/logo.png"  */
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import Moment from "react-moment";
import moment from 'moment';
import ReactDOM from "react-dom"
import QRCode from "react-qr-code"


const FifthModal = ({ticketData}) => {
  const [detailsArray, setDetailArray] = useState([])
  const [adultCount, setAdultCount] = useState(0)
  const [childCount, setChildCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)
  const [familyCount, setFamilyCount] = useState(0)

  
  document.title = "Pass Pricing Petra Balloon"

  console.log("this is ticket data from pre modal",ticketData)

  /* const location = useLocation()
  console.log(location.state.sendData)
   const ticketData = location.state.sendData */

  const specificDate =ticketData.date 
  const formattedDate = moment(specificDate).format('DD/MMM/YYYY');
 
  useEffect(() => {
    setDetailArray(ticketData.reservation_details)
    ticketData.reservation_details.map(Bill =>{
      console.log(Bill)
      if(Bill.type == "adult"){
        setAdultCount(Bill.quantity)
      }
      if(Bill.type == "child"){
        setChildCount(Bill.quantity)
      }
      if(Bill.type == "infant"){
        setInfantCount(Bill.quantity)
      }
      if(Bill.family == "family"){
        setFamilyCount(Bill.quantity)
      }
      
  })
  }, [ticketData])

  const componentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {},
  })

  let navigate = useNavigate()
  function handleBack() {
    navigate("/tickets")
  } 

 

  // qr code
  const ticketHTML = `
                              Petra Balloon
  Ticket No  : ${ticketData.ticket_number}     Date : ${formattedDate}
  Name  : ${ticketData.first_name} ${ticketData.last_name}
  Mobile : ${ticketData.mobile}
  Pass Type : ${ticketData.selected_pass}
  Adult : ${adultCount}
  Child : ${childCount}
  Infant: ${infantCount}
  family: ${familyCount}
  Discount Amount : ${ticketData.discount_amount}
  Total Amount : ${ticketData.total_amount}



  


`
  console.log("ticketHTML", ticketHTML)
  const encodedTicketHTML = encodeURIComponent(ticketHTML)
  const dataURI = `data:text/html;charset=UTF-8,${encodedTicketHTML}`
  //end qr code
  return (
          <>
            {/* <QRCode /> */}
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 64,
                width: "100%",
              }}
            >
              {/* <div dangerouslySetInnerHTML={{ __html: ticketHTML }} /> */}
              {/* <QRCode value={ticketHTML} /> */}
            </div>

            <button
              onClick={() => handlePrint()}
              style={{
                backgroundColor: "#3280F8",
                color: "white",
                margin:"5px",
                padding:"5px"
              }}
            >
              Download Recipt
            </button>
{/*             <button
              onClick={() => handleBack()}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Back
            </button> */}
            <div
              ref={componentRef}
              style={{
                height: "1000px",
                width: "100%",
                marginTop: "30px",
              }}
            >
              <img src="assets/img/logo.png"></img> 
              <div
                style={{
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "70px" }}>Petra Balloon</div>
                <div style={{ fontSize: "20px" }}>petraballoon@gmail.com</div>
                <div style={{ padding: "4px", fontSize: "25px" }}>
                  <b style={{ marginRight: "3px" }}>Addresss: </b> PETRA BALLOON
                  PETRA BALLOON ST. PETRA 71810 JORDAN
                </div>
                <div style={{ padding: "4px", fontSize: "30px" }}>
                  <b style={{ marginRight: "3px" }}>Phone :</b>
                  +962 3 215 6600
                </div>
                <div style={{ padding: "8px", fontSize: "30px" }}>
                  <b>Ticket</b>
                </div>
              </div>
              <div style={{ padding: "30px" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "25px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Ticket No : </b>
                    {ticketData.ticket_number}
                  </div>
                  <div style={{ width: "50%", textAlign: "end" }}>
                    <b>Date :</b>{" "}
                    <Moment format="D/MMM/YYYY">{ticketData.date}</Moment>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "25px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Customer Info</b>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "25px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Name :</b> {ticketData.first_name} {ticketData.last_name}{" "}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "25px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Mobile : </b>
                    {ticketData.mobile}{" "}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "25px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Pass Type : </b>
                    {ticketData.selected_pass}{" "}
                  </div>
                </div>
              </div>

              <div style={{ padding: "30px" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "40px",
                    fontSize: "20px",
                    borderBottom: "1px solid black",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <b>Member Type</b>
                  </div>
                  {/* <div
                    style={{
                      width: "15%",
                      textAlign: "center",
                      padding: "3px",
                    }}
                  >
                    <b>Per Head</b>
                  </div> */}
                  <div
                    style={{
                      width: "25%",
                      textAlign: "center",
                      padding: "3px",
                    }}
                  >
                    <b>Quantity</b>
                  </div>

                  <div
                    style={{
                      width: "25%",
                      textAlign: "center",
                      padding: "3px",
                    }}
                  >
                    <b>Subtotal</b>
                  </div>
                </div>
                {detailsArray &&
                  detailsArray.map(Bill => (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        width: "100%",
                        height: "25px",
                        fontSize: "18px",
                      }}
                    >
                      <div style={{ width: "50%" }}>{Bill.type}</div>
                      <div style={{ width: "25%", textAlign: "center" }}>
                        {Bill.quantity}
                      </div>
                      <div style={{ width: "25%", textAlign: "center" }}>
                        {Bill.Sub_total}
                      </div>
                      {/* <div style={{ width:"15%", textAlign:"center"}}>{Bill.quantity}</div> */}
                    </div>
                  ))}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "20px",
                    fontSize: "12px",
                    borderBottom: "1px solid",
                  }}
                ></div>
              </div>
              <div style={{ padding: "30px" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  >
                    <QRCode size={150} value={ticketHTML} />
                    {/*  <div style={{ width: "30%" }}>
                      <b>Cash : </b>
                    </div>{" "}
                    <div style={{ width: "70%" }}> Rs </div> */}
                  </div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                      borderBottom: "1px solid lightgray",
                    }}
                  >
                    <div style={{ width: "50%" }}>
                      <b>Discount : </b>
                    </div>{" "}
                    <div style={{ width: "50%" }}>
                      {" "}
                      JOD {ticketData.discount_amount}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  >
                    {/* <div style={{ width: "30%" }}>
                      <b>Total Paid : </b>{" "}
                    </div>{" "} */}
                    {/* <div style={{ width: "70%" }}> Rs </div> */}
                  </div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  ></div>
                  {/*                   <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                      borderBottom: "1px solid lightgray",
                    }}
                  >
                    <div style={{ width: "50%" }}>
                      <b>Tax:</b>
                    </div>{" "}
                    <div style={{ width: "50%" }}> Rs </div>
                  </div> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "20px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                  
                  </div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    {/* <div style={{ width: "50%" }}>
                      <b>Shipping:</b>
                    </div>{" "} */}
                    {/* <div style={{ width: "50%" }}> Rs </div> */}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    width: "100%",
                    height: "32px",
                    fontSize: "20px",
                  }}
                >
                  <div style={{ width: "50%" }}>
                  
                  </div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexWrap: "nowrap",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    <div style={{ width: "50%" }}>
                      <b>Total:</b>
                    </div>{" "}
                    <div style={{ width: "50%" }}>
                      {" "}
                      JOD {ticketData.total_amount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
  )
}

export default FifthModal;