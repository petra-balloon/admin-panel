import React, { useState } from "react"
import { Form } from "react-router-dom"
import { Button, Col, Container, Input, Label, Row } from "reactstrap"
import { Link, useNavigate, useLocation } from "react-router-dom"

function BoardingForm() {
  const [boardingPass, setBoardingPass] = useState([])
  const location = useLocation()
  console.log("this is location data", location.state.sendData)
  const ticketData = location.state.sendData

  const navigate = useNavigate()



  const ChangeInput = async (e, type) => {
    console.log(e)
    console.log(e.target.id)
    var id = e.target.id
    var objIndex = boardingPass.findIndex(obj => obj.id == id)
    console.log(objIndex)
    if (objIndex !== -1) {
      if (e.target.name == "seat_number") {
        boardingPass[objIndex].seat = e.target.value
      }
      if (e.target.name == "flight") {
        boardingPass[objIndex].flight = e.target.value
      }
      if (e.target.name == "username") {
        boardingPass[objIndex].name = e.target.value
      }
    } else {
      if (e.target.name == "") {
        var obj = {
          id: e.target.id,
          name: e.target.value,
          seat: "",
          flight: "",
          type: type,username
        }
        boardingPass.push(obj)
      } else {
        alert("please enter user name first")
      }
    }
    /* 
    for (let i = 0; i < boardingPass.length; i++) {1
      console.log("this is empty array")
      if (boardingPass[i].id == id) {
        console.log("id match")
        if(e.target.name == "seat-number"){
         // console.log("want to enter seat",e.target.name)
          boardingPass.push({ ...boardingPass[i], "seat_number": e.target.value })
        }
        
        //console.log("some one match")
      } else {
        console.log("no one match")
        if(e.target.name = "username"){
          var obj = { "id": e.target.id, "name": e.target.value }
          boardingPass.push(obj)
        }else{
          alert("please enter user name first")
        }
        
      }
    } */
    if (0 == boardingPass.length) {
    }

    //boardingPass.push(e.target.value)
    console.log(boardingPass)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* edit project */}

          {/* modal add project */}
          <Row>
            {ticketData &&
              ticketData.reservation_details.map((Details, i) => (
                <div key={Details.type}>
                  <h4 style={{ marginTop: "30px", color: "red" }}>
                    <b>
                      {Details.type}
                    </b>
                  </h4>
                  <Row>
                    {[...Array(parseInt(Details.quantity))].map((_, index) => (
                      /*  const inputId = `input-${index}-${i}`;  */

                      <Col lg={4}>
                        {/* <div>
                          {i}+{index}
                        </div> */}
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="username">
                            Username
                          </Label>
                          <Input
                            name="username"
                            className="form-control"
                            placeholder="Enter Username"
                            type="text"
                            id={`input-${index}-${i}`}
                            /*  id={index} */
                            onChange={event => ChangeInput(event, Details.type)}
                          />
                        </div>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="username">
                            Seat No#
                          </Label>
                          <Input
                            name="seat_number"
                            className="form-control"
                            placeholder="Enter Seat Number"
                            type="text"
                            id={`input-${index}-${i}`}
                            onChange={ChangeInput}
                          />
                        </div>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="username">
                            Flight
                          </Label>
                          <Input
                            name="flight"
                            className="form-control"
                            placeholder="Flight"
                            type="text"
                            onChange={ChangeInput}
                            id={`input-${index}-${i}`}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
          </Row>
          <Row>
            <Col>
            <Button
              style={{ marginLeft: "3px" }}
              color="primary"
              className="btn btn-primary waves-effect waves-light"
              onClick={async () => {
               // navigate("/boarding-pass", { state: { sendData: item } })
               navigate("/boarding-pass", { state: { sendData: boardingPass } })
              }}
            >
              CheckIn
            </Button>
            </Col>
          </Row>
          {/* <Loader isLoading={isLoading} /> */}
          {/* project cards */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default BoardingForm
