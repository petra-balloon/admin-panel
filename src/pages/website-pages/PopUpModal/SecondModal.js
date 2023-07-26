import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import "react-responsive-modal/styles.css";
import "react-calendar/dist/Calendar.css";
import { BsVinyl } from "react-icons/bs";
import { BsTag } from "react-icons/bs";
import { BsVinylFill } from "react-icons/bs";
import { BsChevronExpand } from "react-icons/bs";
import { BsRecord } from "react-icons/bs";
import Loader from "../Loader/spinloader";
import { BsDashCircle } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import Calendar from "react-calendar";
import axios from "axios";
import { API_URL } from "helpers/api_helper";

const currentDate = new Date();

const SecondModal = ({
  secondmodal,
  setSecondModal,
  selectedpass,
  resData,
  setResData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWarningLowAmount, setIsWarningLowAmount] = useState(false);
  const [isWarningCheckBox, setIsWarningCheckBox] = useState(false);
  const [showWarningCheckBox, setShowWarningCheckBox] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [apiData, setApiData] = useState("");
  const [isOpensecond, setIsOpenSecond] = useState(false);
  const [isOpenthird, setIsOpenThird] = useState(false);
  const [isOpenfourth, setIsOpenFourth] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);
  const [value, onChange] = useState(new Date());
  const [totalbill, setTotalBill] = useState(0);
  const [adultSelectedNumber, setAdultSelectedNumber] = useState(0);
  const [chiledSelectedNumber, setChiledSelectedNumber] = useState(0);
  const [infantSelectedNumber, setInfantSelectedNumber] = useState(0);
  const [familySelectedNumber, setFamilySelectedNumber] = useState(0);
  const [adultPrice, setAdultPrice] = useState(selectedpass.adult_price);
  const [infantPrice, setInfantPrice] = useState(selectedpass.infant_price);
  const [childPrice, setChildPrice] = useState(selectedpass.child_price);
  const [familyPrice, setFamilyPrice] = useState(selectedpass.family_price);
  const [adultSubTotal, setAdultSubTotal] = useState(0);
  const [infantSubTotal, setInfantSubTotal] = useState(0);
  const [childSubtotal, setChildSubTotal] = useState(0);
  const [familySubtotal, setFamilySubTotal] = useState(0);
  const [totalTicketAmount, setTotalTicketAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);

  const [ticketDetails, setTicketDetails] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountCodeNumber, setDiscountCodeNumber] = useState("");
  const [isCoupon, setIsCoupon] = useState(false);
  const [showCouponWarning, setShowCouponWarning] = useState(false);

  const [agencyDiscountDetails, setAgencyDiscountDetails] = useState("");
  const [isCouponNotValid, setIsCouponNotValid] = useState(false);

  const [discountAgencyId, setDiscountAgencyId] = useState("");
  const [discountAgencyName, setDiscountAgencyName] = useState("");
  const [discountAgencyPromo, setDiscountAgencyPromo] = useState("");
  const [discountAgencyDiscount, setDiscountAgencyDiscount] = useState("");
  //console.log("this is passName", selectedpass);

  // const API_URL = "http://localhost:5000/api/";
  //const API_URL = "https://petra-balloon.herokuapp.com/api/";
  useEffect(() => {}, [selectedpass]);

  useEffect(() => {
    CalculateTotalBill();
  }, []);

  // Check Discount
  const checkDiscount = async () => {
    setIsLoading(true);
    await axios
      .post(`${API_URL}promocode/check-code`, {
        promo_code: discountCodeNumber,
      })
      .then(async (response) => {
        console.log(response.data.message);
        if (response.data.message == "Success") {
          console.log("this is response data", response.data.data);
          setAgencyDiscountDetails(response.data.data);
          setDiscountAgencyId(response.data.data[0]._id);
          setDiscountAgencyName(response.data.data[0].agency_name);
          setDiscountAgencyPromo(response.data.data[0].promo_code);
          setDiscountAgencyDiscount(response.data.data[0].discount_percentage);
          var totalAmountOfSubTotal = 0;
          for (let i = 0; i < ticketDetails.length; i++) {
            var totalAmountOfSubTotal =
              totalAmountOfSubTotal + ticketDetails[i].Sub_total;
          }
          var discountPercentage = response.data.data[0].discount_percentage;
          console.log("This is discount percentage", discountPercentage);
          var discountAmount =
            (discountPercentage / 100) * totalAmountOfSubTotal;
          console.log("this is discount Amount", discountAmount);
          setDiscountAmount(parseInt(discountAmount));
          setTotalTicketAmount(parseInt(totalAmountOfSubTotal - discountAmount));
          setIsCoupon(true);
          setShowCouponWarning(false);
        } else {
          setShowCouponWarning(true);
          setIsCoupon(false);
        }

        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //submit button

  const createTicket = async () => {
    if (totalTicketAmount == 0) {
      setIsWarningLowAmount(true);
    } else {
      setIsWarningLowAmount(false);
    }
    if (isWarningCheckBox == false) {
      setShowWarningCheckBox(true);
    }
    console.log(
      "isWarningLowAmount =======",
      isWarningLowAmount,
      "showWarningCheckBox =====",
      showWarningCheckBox
    );
    if (totalTicketAmount !== 0 && isWarningCheckBox == true) {
      setIsLoading(true);
      await axios
        .post(`${API_URL}ticket/create`, {
          selected_pass: selectedpass.pass_name,
          discount_amount: discountAmount,
          reservation_details: ticketDetails,
          date: moment(value).format("YYYY-MM-DD"),
          total_amount: totalTicketAmount,
          tax_amount: taxAmount,
          promo_id: discountAgencyId,
          promo_code: discountAgencyPromo,
          discount_percentage: discountAgencyDiscount,
          agency_name: discountAgencyName,
          created_date: moment(currentDate).format("YYYY-MM-DD")
        })
        .then(async (response) => {
          console.log(response.data.data);
          setResData(response.data.data);
          setSecondModal("third");
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const CalculateTotalBill = async () => {
    //setTotalTicketAmount(parseInt(adultSubTotal) + parseInt(childSubtotal));
    var totalAmountOfSubTotal = 0;
    for (let i = 0; i < ticketDetails.length; i++) {
      var totalAmountOfSubTotal =
        totalAmountOfSubTotal + ticketDetails[i].Sub_total;
    }

    if (isCoupon) {
      console.log(
        "discount percentage in bill function",
        agencyDiscountDetails
      );
      var discountPercentage = agencyDiscountDetails[0].discount_percentage;
      var discountAmount = (discountPercentage / 100) * totalAmountOfSubTotal;
      console.log("this is discount Amount", discountAmount);
      setTotalTicketAmount(parseInt(totalAmountOfSubTotal - discountAmount));
      setDiscountAmount(parseInt(discountAmount));
    } else {
      setTotalTicketAmount(parseInt(totalAmountOfSubTotal));
    }

    //console.log("this is tickect details", ticketDetails);
    console.log("this is total", totalAmountOfSubTotal);
    setIsOpen(false);
    setIsOpenSecond(false);
    setIsOpenThird(false);
    setIsOpenFourth(false);
    console.log(ticketDetails);
  };

  const AdultPriceAdd = async (propss) => {
    //console.log(value);
    console.log(adultPrice);
    if(propss == "add"){
      var value = adultSelectedNumber + 1;
    }else{
      if(adultSelectedNumber == 0){
        var value = adultSelectedNumber;
      }else{
        var value = adultSelectedNumber -1;
      }
      
    }
    
    setAdultSelectedNumber(value);
    setAdultSubTotal(value * adultPrice);

    console.log("this is woo", value, adultPrice);

    for (let i = 0; i < ticketDetails.length; i++) {
      if (ticketDetails[i].type == "adult") {
        ticketDetails.splice(i, 1);
      }
    }

    ticketDetails.push({
      type: "adult",
      quantity: value,
      Sub_total: value * adultPrice,
    });
    CalculateTotalBill();
  };

  const ChildPriceAdd = async (propss) => {

    if(propss == "add"){
      var value = chiledSelectedNumber + 1;
    }else{
      if(chiledSelectedNumber == 0){
        var value = chiledSelectedNumber;
      }else{
        var value = chiledSelectedNumber -1;
      }
      
    }
    setChiledSelectedNumber(value)
    setChildSubTotal(value * childPrice);

    for (let i = 0; i < ticketDetails.length; i++) {
      if (ticketDetails[i].type == "child") {
        ticketDetails.splice(i, 1);
      }
    }

    ticketDetails.push({
      type: "child",
      quantity: value,
      Sub_total: value * childPrice,
    });
    CalculateTotalBill();
  };

  const InfantPriceAdd = async (propss) => {

    if(propss == "add"){
      var value = infantSelectedNumber + 1;
    }else{
      if(infantSelectedNumber == 0){
        var value = infantSelectedNumber;
      }else{
        var value = infantSelectedNumber -1;
      }
      
    }
    console.log(value);
    setInfantSelectedNumber(value);
    setChildSubTotal(value * infantPrice);

    for (let i = 0; i < ticketDetails.length; i++) {
      if (ticketDetails[i].type == "infant") {
        ticketDetails.splice(i, 1);
      }
    }

    ticketDetails.push({
      type: "infant",
      quantity: value,
      Sub_total: value * infantPrice,
    });
    CalculateTotalBill();
  };
  const FamilyPriceAdd = async (propss) => {

    if(propss == "add"){
      var value = familySelectedNumber + 1;
    }else{
      if(familySelectedNumber == 0){
        var value = familySelectedNumber;
      }else{
        var value = familySelectedNumber -1;
      }
      
    }
    
    console.log(value);
    setFamilySelectedNumber(value);
    setFamilySubTotal(value * familyPrice);

    for (let i = 0; i < ticketDetails.length; i++) {
      if (ticketDetails[i].type == "family") {
        ticketDetails.splice(i, 1);
      }
    }

    ticketDetails.push({
      type: "family",
      quantity: value,
      Sub_total: value * familyPrice,
    });
    CalculateTotalBill();
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
          setIsOpenSecond(false);
          setIsOpenThird(false);
          setIsOpenFourth(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const options = [
    { name: "+1", value: "1" },
    { name: "+2", value: "2" },
    { name: "+3", value: "3" },
    { name: "+4", value: "4" },
    { name: "+5", value: "5" },
    { name: "+6", value: "6" },
    { name: "+7", value: "7" },
    { name: "+8", value: "8" },
    { name: "+9", value: "9" },
    { name: "+10", value: "10" },
    { name: "+11", value: "12" },
    { name: "+12", value: "13" },
    { name: "+13", value: "14" },
    { name: "+14", value: "14" },
    { name: "+15", value: "15" },
    { name: "+16", value: "16" },
    { name: "+17", value: "17" },
    { name: "+18", value: "18" },
    { name: "+19", value: "19" },
    { name: "+20", value: "20" },
    { name: "+21", value: "21" },
    { name: "+22", value: "22" },
    { name: "+23", value: "23" },
    { name: "+24", value: "24" },
    { name: "+25", value: "25" },
    { name: "+26", value: "26" },
    { name: "+27", value: "27" },
    { name: "+28", value: "28" },
    { name: "+29", value: "29" },
    { name: "+30", value: "30" },
    { name: "+31", value: "31" },
    { name: "+32", value: "32" },
    { name: "+33", value: "33" },
    { name: "+34", value: "34" },
    { name: "+35", value: "35" },
    { name: "+36", value: "36" },
    { name: "+37", value: "37" },
    { name: "+38", value: "38" },
    { name: "+39", value: "39" },
    { name: "+40", value: "40" },
  ];

  return (
    <div className="second-modal-outer-div">
      <div className="second-modal-main-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="second-popup-heading">
                <div>{selectedpass.pass_name} :</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div ref={wrapperRef} className="col-lg-6">
              <div className="outer-div-lef-side-upper">
                <div
                  onClick={() => {
                    setIsDiscount(true);
                  }}
                  className="left-div-first"
                >
                  {!isDiscount && (
                    <div>
                      <BsVinyl style={{ color: "#354052" }} />
                    </div>
                  )}

                  {isDiscount && (
                    <div>
                      <BsVinylFill style={{ color: "#354052" }} />
                    </div>
                  )}
                  <div className="first-div-tag-text">
                    <BsTag className="first-div-tag" />
                    <div className="tag-div-text">Enter Discount Code</div>
                  </div>
                </div>
                {isDiscount && (
                  <div className="container">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-lg-9">
                          <input
                            className="form-control"
                            onChange={(e) => {
                              setDiscountCodeNumber(e.target.value);
                            }}
                          />
                          {isCoupon && (
                            <span style={{ color: "green" }}>
                              Coupon is valid discount would apply automatically
                            </span>
                          )}
                          {showCouponWarning && (
                            <span style={{ color: "red" }}>
                              Coupon is invalid -please try again{" "}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-3">
                          <div className="btn-main-class-discount">
                            <button
                              className="discount-btn"
                              onClick={async () => {
                                await checkDiscount();
                              }}
                            >
                              Check Code
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="outer-main-adult-div">
                      <div className="row">
                        <div className="adult-wraping-div">
                          <div className="col-lg-8">
                            <div>
                              <div className="all-div-heading-in-middle">
                                Adult
                              </div>
                              <div className="all-div-text-in-middle">
                                12 Years And Above
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="all-div-price-in-middle">
                              {selectedpass.adult_price} JOD
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="select-person-outer-div">
                              <div className="select-number-adult-outer-class">
                                <div className="common-class-add-selected-number">
                                  <BsDashCircle
                                    onClick={() => {
                                      AdultPriceAdd("minus");
                                    }}
                                  />
                                </div>
                                <div className="common-class-add-selected-number">{adultSelectedNumber}</div>
                                <div className="common-class-add-selected-number">
                                  <BsPlusCircle
                                    onClick={() => {
                                      AdultPriceAdd("add");
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-lg-2">
                            <div className="select-person-outer-div">
                              <div className="total-adult-price">
                                {adultSelectedNumber}
                              </div>
                              <div>
                                <BsChevronExpand
                                  onClick={() => {
                                    setIsOpen(isOpen ? false : true);
                                  }}
                                />
                              </div>
                            </div>
                            {isOpen && (
                              <div className="select-main-div">
                                <ul className="select-main">
                                  {options.map((value) => {
                                    return (
                                      <li
                                        onClick={() => {
                                          AdultPriceAdd(value.value);
                                        }}
                                        className="select-control"
                                      >
                                        {value.name}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="outer-main-adult-div">
                      <div className="row">
                        <div className="adult-wraping-div">
                          <div className="col-lg-8">
                            <div>
                              <div className="all-div-heading-in-middle">
                                Child
                              </div>
                              <div className="all-div-text-in-middle">
                                3-11 Years
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="all-div-price-in-middle">
                              {selectedpass.child_price} JOD
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="select-person-outer-div">
                              <div className="select-number-adult-outer-class">
                                <div className="common-class-add-selected-number">
                                  <BsDashCircle
                                    onClick={() => {
                                      ChildPriceAdd("minus");
                                    }}
                                  />
                                </div>
                                <div className="common-class-add-selected-number">{chiledSelectedNumber}</div>
                                <div className="common-class-add-selected-number">
                                  <BsPlusCircle
                                    onClick={() => {
                                      ChildPriceAdd("add");
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-lg-2">
                            <div className="select-person-outer-div">
                              <div className="total-adult-price">
                                {chiledSelectedNumber}
                              </div>
                              <div>
                                <BsChevronExpand
                                  onClick={() => {
                                    setIsOpenSecond(
                                      isOpensecond ? false : true
                                    );
                                  }}
                                />
                              </div>
                            </div>
                            {isOpensecond && (
                              <div className="select-main-div">
                                <ul className="select-main">
                                  {options.map((value) => {
                                    return (
                                      <li
                                        onClick={() => {
                                          ChildPriceAdd(value.value);
                                        }}
                                        className="select-control"
                                      >
                                        {value.name}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="outer-main-adult-div">
                      <div className="row">
                        <div className="adult-wraping-div">
                          <div className="col-lg-8">
                            <div>
                              <div className="all-div-heading-in-middle">
                                Infant
                              </div>
                              <div className="all-div-text-in-middle">
                                0-2 Years
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="all-div-price-in-middle">
                              {apiData.infant_price} Free
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="select-person-outer-div">
                              <div className="select-number-adult-outer-class">
                                <div className="common-class-add-selected-number">
                                  <BsDashCircle
                                    onClick={() => {
                                      InfantPriceAdd("minus");
                                    }}
                                  />
                                </div>
                                <div className="common-class-add-selected-number">{infantSelectedNumber}</div>
                                <div className="common-class-add-selected-number">
                                  <BsPlusCircle
                                    onClick={() => {
                                      InfantPriceAdd("add");
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-lg-2">
                            <div className="select-person-outer-div">
                              <div className="total-adult-price">
                                {infantSelectedNumber}
                              </div>
                              <div>
                                <BsChevronExpand
                                  onClick={() => {
                                    setIsOpenThird(isOpenthird ? false : true);
                                  }}
                                />
                              </div>
                            </div>
                            {isOpenthird && (
                              <div className="select-main-div">
                                <ul className="select-main">
                                  {options.map((value) => {
                                    return (
                                      <li
                                        onClick={() => {
                                          InfantPriceAdd(value.value);
                                        }}
                                        className="select-control"
                                      >
                                        {value.name}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {selectedpass.family_price != null && (
                    <div className="col-lg-12">
                      <div className="outer-main-adult-div">
                        <div className="row">
                          <div className="adult-wraping-div">
                            <div className="col-lg-8">
                              <div>
                                <div className="all-div-heading-in-middle">
                                  Family
                                </div>
                                <div className="all-div-text-in-middle">
                                  2 Adults and 2 Children (3 - 11 Years)
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-2">
                              <div className="all-div-price-in-middle">
                                {selectedpass.family_price}
                              </div>
                            </div>
                            <div className="col-lg-2">
                            <div className="select-person-outer-div">
                              <div className="select-number-adult-outer-class">
                                <div className="common-class-add-selected-number">
                                  <BsDashCircle
                                    onClick={() => {
                                      FamilyPriceAdd("minus");
                                    }}
                                  />
                                </div>
                                <div className="common-class-add-selected-number">{familySelectedNumber}</div>
                                <div className="common-class-add-selected-number">
                                  <BsPlusCircle
                                    onClick={() => {
                                      FamilyPriceAdd("add");
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            {/* <div className="col-lg-2">
                              <div className="select-person-outer-div">
                                <div className="total-adult-price">
                                  {familySelectedNumber}
                                </div>
                                <div>
                                  <BsChevronExpand
                                    onClick={() => {
                                      setIsOpenFourth(
                                        isOpenfourth ? false : true
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              {isOpenfourth && (
                                <div className="select-main-div">
                                  <ul className="select-main">
                                    {options.map((value) => {
                                      return (
                                        <li
                                          onClick={() => {
                                            FamilyPriceAdd(value.value);
                                          }}
                                          className="select-control"
                                        >
                                          {value.name}
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              )}
                            </div> */}

            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <Calendar
                      minDate={currentDate}
                      onChange={onChange}
                      value={value}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="main-wrap-class-available">
                    {/*  <div className="date-available">
                      <BsRecord className="color-green" />
                      <div className="color-green">Available</div>
                    </div>
                    <div className="date-available">
                      <BsRecord className="color-yellow" />
                      <div className="color-yellow">Limited</div>
                    </div>
                    <div className="date-available">
                      <BsRecord className="color-red" />
                      <div className="color-red">Sold Out</div>
                    </div> */}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="check-box-outer-div">
                    <input
                      onChange={() => {
                        setIsWarningCheckBox(true);
                      }}
                      className="check-box-input"
                      type="checkbox"
                    />
                    <div>
                      I accept the{" "}
                      <span className="checkbox-text-color">
                        cancellation policy
                      </span>{" "}
                      and{" "}
                      <span className="checkbox-text-color">booking terms</span>{" "}
                      for this booking.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <div className="col-lg-6">
              <div className="warning-text-outer-div">
                {isWarningLowAmount && (
                  <div>
                    <div className="warning-text">*Bookings is invalid</div>
                    <div className="warning-text">
                      *Tickets at least one ticket is required
                    </div>
                  </div>
                )}
                {showWarningCheckBox && (
                  <div className="warning-text">
                    * Please accept the terms and conditions before continuing.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-6"></div>
            {isCoupon && (
              <div className="col-lg-6">
                Discount Amount : {discountAmount}{" "}
              </div>
            )}
          </div>
          <div className="packup-of-div-add-cart">
            {/* <div className="outer-percentage-div">
              <div>UAE VAT 5%</div>
              <div>20 JOD</div>
            </div> */}
            <div className="add-to-cart-outer">
              <button
                className="row button-of-card"
                onClick={async () => {
                  await createTicket();
                  /* setSecondModal("third"); */
                }}
              >
                <div className="col-lg-12">
                  <div style={{ display: "flex" }}>
                    <div className="add-to-card-text">ADD to Cart</div>
                    <div className="calculated-bill">
                      <div className="total-bill">{totalTicketAmount}</div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default SecondModal;
