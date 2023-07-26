import React, { useState } from "react";
import "react-responsive-modal/styles.css";



const FourthModal = ({ secondmodal, setSecondModal }) => {
  return (
    <div className="fourth-modal-main-container">
      <div className="container">
        <div className="row">
          <div>
            <div className="col-lg-12">
              <div className="redeem-popup-heading">
                <div className="heading-text">Redeem Gift Card</div>
              </div>
            </div>
          </div>
          <div className="input-margin-bottom-spacer"></div>
          <div className="col-lg-12">
            <div class="form-group">
              <label className="third-label-class">Gift Card *</label>
              <input
                type="name"
                class="form-control"
                id="name"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="input-margin-bottom-spacer border-bottom-gift"></div>
          <div className="col-lg-12">
            <div  className="row">
            <div className="col-lg-7"></div>
            <div className="col-lg-5">
                <div className="fourth-redeem-btn">
                    Redeem Gift Cards
                </div>
            </div>

            </div>
          </div>
          <div className="input-margin-bottom-spacer"></div>
        </div>
      </div>
    </div>
  );
};

export default FourthModal;
