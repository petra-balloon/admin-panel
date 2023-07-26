import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { API_URL, axiosApi } from "helpers/api_helper"
import { useReactToPrint } from "react-to-print"
import Moment from "react-moment"
import logosmImg from "../../assets/images/logopetra.png"

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

const BoardingTestPage2 = () => {
  document.title = "Petra Balloon- Admin Dashboard"

  const location = useLocation()
  console.log("this is location data", location.state.sendData)
  const ticketData = location.state.sendData

  const currentDate = new Date()

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
    const pages = document.querySelectorAll('.pdf-page');
    const content = [];

    const generatePage = (page, index) => {
      html2canvas(page).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        content.push({ image: imgData, fit: [canvas.width, canvas.height] });

        if (index === pages.length - 1) {
          const documentDefinition = { content: content };
          pdfMake.createPdf(documentDefinition).download('output.pdf');
        } else {
          generatePage(pages[index + 1], index + 1);
        }
      });
    };

    generatePage(pages[0], 0);
  };
  
  return (
    <>
      <button
        style={{ marginTop: "200px" }}
        onClick={() => {
          generatePDF()
        }}
      >
        Generate PDF
      </button>

      {ticketData &&
        ticketData.map(Details => (
          <div key={Details.type} className="pdf-page">
            <div className="maincontainer">
              <div id="firstsection">
                <div id="info">
                  <h5>BOARDING PASS</h5>
                  <p>{Details.name}</p>
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
                  <p>{Details.flight}</p>
                </div>

                <div class="flightInfo">
                  <h5>SEAT</h5>
                  <p>{Details.seat}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
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
    </>
  )
}

export default BoardingTestPage2
