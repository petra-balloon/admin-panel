import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { API_URL, axiosApi } from "helpers/api_helper"
import { useReactToPrint } from "react-to-print"
import Moment from "react-moment"
import moment from "moment"
import logosmImg from "../../assets/images/logopetra.png"

import QRCode from "react-qr-code"

import html2canvas from "html2canvas"
import jsPDF from "jspdf"

//import pdfWorker from "pdfjs-dist/build/pdf.worker.entry"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  Button,
} from "reactstrap"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const BoardingTestPage = () => {
  document.title = "Petra Balloon- Admin Dashboard"

  const location = useLocation()
  console.log("this is location data", location.state.sendData)
  const ticketData = location.state.sendData

  const currentDate = new Date()
  const requireFormat = moment(currentDate).format("YYYY-MM-DD")
  useEffect(() => {
    // Your array of passes
    /* const passes = [
      { name: 'John Doe', seatNumber: 'A1' },
      { name: 'Jane Smith', seatNumber: 'B2' },
      // Add more pass objects as needed
    ]; */
    // Call createPDF after obtaining the pass data
    // createPDF(passes);
  }, [])

  /* const generatePDF = () => {
    const pages = document.querySelectorAll(".pdf-page")
    const pdf = new jsPDF()

    const generatePage = (page, index) => {
      html2canvas(page).then(canvas => {
        const imgData = canvas.toDataURL("image/png")
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        pdf.addPage()
        //pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.addImage(imgData, "PNG", 0, 0, 200, 100, "", "FAST")
        if (index === pages.length - 1) {
            pdf.deletePage(1)
          pdf.save("output.pdf")
        } else {
          setTimeout(() => {
            generatePage(pages[index + 1], index + 1)
          }, 100) // Adjust the delay (in milliseconds) as needed
        }
      })
    }
    

    generatePage(pages[0], 0)
  } */

  const generatePDF = () => {
    const pages = document.querySelectorAll(".pdf-page")
    const pdf = new jsPDF("l", "mm", "A4")

    const generatePage = (page, index) => {
      html2canvas(page).then(canvas => {
        const imgData = canvas.toDataURL("image/png")
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        // Calculate the scaling factor to fit the content within the page size
        const scale = Math.min(
          pdfWidth / contentWidth,
          pdfHeight / contentHeight
        )

        // Calculate the adjusted width and height based on the scaling factor
        const adjustedWidth = contentWidth * scale
        const adjustedHeight = contentHeight * scale

        //pdf.setPageSize({ width: adjustedWidth, height: adjustedHeight });

        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, 0, adjustedWidth, adjustedHeight)
        // pdf.addImage(imgData, "PNG", 0, 0,200, 60)
        if (index === pages.length - 1) {
          pdf.deletePage(1)
          pdf.save("output.pdf")
        } else {
          setTimeout(() => {
            generatePage(pages[index + 1], index + 1)
          }, 100) // Adjust the delay (in milliseconds) as needed
        }
      })
    }

    generatePage(pages[0], 0)
  }

  /*  const generateTicketHTML = (data) => {
    // Perform any necessary logic to generate the ticketHTML dynamically based on the data
   const htmltoset =  `Passenger :  ${data.name}
   Seat No : ${data.seat}    Flight : ${data.flight}`
    return htmltoset;
  }; */
  /*   const generateTicketHTML = data => {
    const htmltoset = `Passenger :  ${data.type}
    Date : ${currentDate}         boardingNumber:${data.boardingNumber} `
    return htmltoset
  } */

  const generateTicketHTML = data => {
    const htmltoset = `{"ticketNumber": ${data.boardingNumber}, "Passenger" :  "${data.type}", "Date" : "${requireFormat}","selected_pass": "${data.selected_pass}"}`
    return htmltoset
  }

  return (
    <>
      <button
        style={{ marginTop: "200px" }}
        onClick={() => {
          generatePDF()
        }}
      >
        Print Ticket
      </button>
      {ticketData &&
        ticketData.map(Details => (
          <div /* className="ticket-outer-class pdf-page" */>
            <div style={{ display: "flex", height: "340px" }}>
              <div className="img-div">
                {/* <img
                  style={{ height: "206px" }}
                  src="assets/img/team/4.jpg"
                ></img> */}
              </div>
              <div className="outer-ticket-content-div">
                <div className="logo-div-tiket"></div>
                <div className="ticket-div-info ticket-outer-class pdf-page">
                  <div class="transparent-div"></div>
                  <div className="outer-div-qr-code">
                    <div className="qr-code-div">
                      <QRCode size={80} value={generateTicketHTML(Details)} />
                    </div>
                    <div className="inside-content-div" style={{fontWeight:"70px",color:"black"}}>
                      <b >
                        Date:{requireFormat} Ticket:{Details.boardingNumber}{" "}
                      </b>
                      <br></br>
                      <b>
                        {" "}
                        {(() => {
                          console.log("this is type:::::", Details.type)
                          if (Details.type === "adult") {
                            return <b>Adult +12 years </b>
                          } else if (Details.type === "child") {
                            return <b>Child 3-11 Years </b>
                          } else if (Details.type === "infant") {
                            return <b>Infant 0-2 Years</b>
                          } else if (Details.type === "family") {
                            return <b>Family 2Adults,2Children</b>
                          }
                        })()}
                      </b>
                      <b><div>{Details.selected_pass}</div></b>
                      
                      {/* {Details.type == "adult" && (
                      <b>{Details.type} +12 years </b>
                    )} */}
                    </div>
                  </div>
                </div>
                <div className="company-info-div"></div>
              </div>
            </div>
          </div>
        ))}

      {/*       {ticketData &&
        ticketData.map((Details) => (
           
          <div key={Details.type} >
            <div className="maincontainer pdf-page">
              <div id="firstsection">
                <div id="info">
                  <h5>BOARDING PASS</h5>
                </div>
                <div id="barcode">
                  <img src={logosmImg} />
                </div>
              </div>
              <div id="secondsection">
                <div id="placeInfo">
                  <div class="place">
                    <h2>STR</h2>
                    <p>STUTTGART</p>
                  </div>
                  <div>
                    <QRCode size={60} value={generateTicketHTML(Details)} />
                  </div>

                  <div class="place">
                    <h2>HAM</h2>
                    <p>HAMBURG</p>
                  </div>
                </div>
                <div class="seperator"></div>
                <div id="datesInfo">
                  <div class="dates">
                    <h5>BOARDING TIME</h5>
                    <p>
                      <Moment format="hh:mm:ss">{currentDate}</Moment>
                    </p>
                  </div>
                </div>
              </div>
              <div id="thirdsection">
                <div class="flightInfo">
                  <h5>FLIGHT</h5>
                </div>

                <div class="flightInfo">
                  <h5>SEAT</h5>
                </div>
              </div>
            </div>
          </div>
        ))} */}
      {/* <div class="maincontainer">
        <div id="firstsection">
          <div id="info">
            <h5>BOARDING PASS</h5>
            <p>John Doe</p>
          </div>
          <div id="barcode">
            <img src="http://11986-presscdn-0-77.pagely.netdna-cdn.com/wp-content/uploads/2008/11/barcode-code-39.jpg" />
          </div>
        </div>
        <div id="secondsection">
          <div id="placeInfo">
            <div class="place">
              <h2>STR</h2>
              <p>STUTTGART</p>
            </div>
            <div>
              <img src="http://www.iconsdb.com/icons/preview/icon-sets/vintage-paper/airplane-57-xxl.png" />
            </div>
            <div class="place">
              <h2>HAM</h2>
              <p>HAMBURG</p>
            </div>
          </div>
          <div class="seperator"></div>
          <div id="datesInfo">
            <div class="dates">
              <h5>BOARDING TIME</h5>
              <p>18:32, Nov 26 2017</p>
            </div>
            <div class="dates">
              <h5>DEPARTURE TIME</h5>
              <p>19:49, Nov 26 2017</p>
            </div>
          </div>
        </div>
        <div id="thirdsection">
          <div class="flightInfo">
            <h5>FLIGHT</h5>
            <p>7U429</p>
          </div>
          <div class="flightInfo">
            <h5>GATE</h5>
            <p>G07</p>
          </div>
          <div class="flightInfo">
            <h5>SEAT</h5>
            <p>18E</p>
          </div>
        </div>
      </div> */}
      {/* 
      <div className="ticket-outer-class pdf-page">
            <div style={{ display: "flex" }}>
              <div className="img-div">
              </div>
              <div className="outer-ticket-content-div">
                <div className="logo-div-tiket"></div>
                <div className="ticket-div-info">
                  <div className="qr-code-div">
                    <QRCode size={60} value={generateTicketHTML(Details)} />
                  </div>
                  <div className="inside-content-div">
                    Date:{requireFormat} Ticket:{Details.boardingNumber}{" "}
                    <br></br>
                    {(() => {
                      console.log("this is type:::::",Details.type)
                      if (Details.type === "adult") {
                        return <b>{Details.type} +12 years </b>
                      }else if(Details.type === "child"){
                        return <b>{Details.type} 3-11 Years </b>
                      }else if(Details.type === "infant"){
                        return <b>{Details.type} 0-2 Years</b>
                      }else if(Details.type === "family"){
                        return <b>{Details.type} 2Adults,2Children</b>
                      }
                    })()}
                  </div>
                </div>
                <div className="company-info-div"></div>
              </div>
            </div>
          </div>
       */}
    </>
  )
}

export default BoardingTestPage
