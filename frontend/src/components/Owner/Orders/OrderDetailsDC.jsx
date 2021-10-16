/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import "react-times/css/classic/default.css";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { BiX } from "react-icons/bi";
import delivered from "../../Svg/delivered.jpg";
import cancelled from "../../Svg/cancelled.jpg";
import { getUserDetails } from "../../../Actions/OwnerActions";

class OrderDetailsDC extends Component {
  constructor(props) {
    super(props);
    this.state = { showCategory: false };
  }

  componentDidUpdate(prevprops) {
    const { CustomerDetails } = this.props;
    if (CustomerDetails !== prevprops.CustomerDetails) {
      this.setState({
        userDetails: CustomerDetails,
      });
    }
  }

  handleUserProfile = (e) => {
    const { CustomerId } = this.props;
    this.props.getUserDetails(CustomerId);
    this.setState({
      showCategory: true,
    });
  };

  handleClose = () => {
    this.setState({
      showCategory: false,
    });
  };

  render() {
    const {
      IsDeliveredimage,
      orderId,
      name,
      subTotal,
      orderTotal,
      tax,
      deliveryCost,
      dishes,
      gratitude,
      displayDetails,
      orderDeliveryType,
    } = this.props;

    const { showCategory, userDetails } = this.state;
    let customerName = null;
    let customerNickname = null;
    let customerAddress = null;
    let customerEmailId = null;
    let customerPhoneNum = null;
    if (userDetails) {
      customerName = userDetails.name;
      customerNickname = userDetails.nick_name;
      customerAddress = `${userDetails.address_line_1},${userDetails.city},${userDetails.state},${userDetails.country},${userDetails.zipcode}`;
      customerEmailId = userDetails.email_id;
      customerPhoneNum = userDetails.phone_num;
    }
    return (
      <div
        show={displayDetails}
        style={{ display: displayDetails ? "block" : "none" }}>
        <Row
          style={{
            paddingBottom: "0%",
            height: "5rem",
            paddingLeft: "10px",
          }}>
          <Col>
            <Button variant='link' onClick={this.handleUserProfile}>
              <h4
                style={{
                  fontSize: "28px",
                  fontFamily: "sans-serif",
                  paddingBottom: "0%",
                  marginBottom: "2%",
                }}>
                {name}
              </h4>
            </Button>
            <h4
              style={{
                fontSize: "28px",
                fontFamily: "sans-serif",
                paddingTop: "0%",
                marginTop: "2%",
                paddingBottom: "0%",
              }}>
              Order# {orderId}
            </h4>
          </Col>
          <Col xs={3}>
            <h4
              style={{
                fontSize: "24px",
                fontFamily: "sans-serif",
                width: "32%",
                color: "#05944F",
              }}>
              {orderDeliveryType}
            </h4>
          </Col>
        </Row>
        <hr style={{ border: "1px soild black" }} />
        {dishes}
        <Row
          style={{
            marginLeft: "2%",
            width: "100%",
            paddingTop: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            letterSpacing: "0.06em",
          }}>
          <ul className='list-group'>
            <li
              className=' d-flex justify-content-between align-items-center'
              style={{ paddingBottom: "10px" }}>
              Subtotal
              <span>${orderTotal}</span>
            </li>
            <li
              className=' d-flex justify-content-between align-items-center'
              style={{ paddingBottom: "10px" }}>
              Tax
              <span>${tax}</span>
            </li>
            <li
              className='d-flex justify-content-between align-items-center'
              style={{ paddingBottom: "10px" }}>
              Delivery Fee
              <span>${deliveryCost}</span>
            </li>
            <li
              className='d-flex justify-content-between align-items-center'
              style={{ paddingBottom: "10px" }}>
              CA Driver Benefits
              <span>${gratitude}</span>
            </li>
            <li
              className='d-flex justify-content-between align-items-center'
              style={{ paddingBottom: "10px" }}>
              Total
              <span>${subTotal}</span>
            </li>
          </ul>
        </Row>

        <Row style={{ paddingTop: "20%", marginLeft: "30%" }}>
          <img
            style={{ width: "40%", height: "40%" }}
            src={IsDeliveredimage ? delivered : cancelled}
            alt=''
          />
        </Row>
        <Modal
          show={showCategory}
          onHide={this.handleClose}
          backdrop='static'
          keyboard={false}
          style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <BiX
            size='35px'
            style={{ color: "black" }}
            onClick={this.handleClose}
          />
          <Modal.Header>
            <h5
              style={{
                fontSize: "24px",
                fontFamily: "UberMove, sans-serif",
                marginBottom: "0px",
              }}>
              Customer Profile
            </h5>
          </Modal.Header>
          <Modal.Body>
            <Row
              style={{
                paddingTop: "0%",
                fontSize: "18px",
                fontFamily: "sans-serif",
                letterSpacing: "0.06em",
                marginLeft: "20px",
              }}>
              <ul className='list-group'>
                <li
                  className=' d-flex justify-content-between align-items-center'
                  style={{ paddingBottom: "10px", fontWeight: "bold" }}>
                  Name
                  <span>{customerName}</span>
                </li>
                <li
                  className=' d-flex justify-content-between align-items-center'
                  style={{ paddingBottom: "10px", fontWeight: "bold" }}>
                  Nick Name
                  <span>{customerNickname}</span>
                </li>
                <li
                  className='d-flex justify-content-between align-items-center'
                  style={{ paddingBottom: "10px", fontWeight: "bold" }}>
                  Email id
                  <span>{customerEmailId}</span>
                </li>
                <li
                  className='d-flex justify-content-between align-items-center'
                  style={{ paddingBottom: "10px", fontWeight: "bold" }}>
                  Phone No
                  <span style={{ paddingLeft: "15%" }}>{customerPhoneNum}</span>
                </li>
                <li
                  className='d-flex justify-content-between align-items-center'
                  style={{ paddingBottom: "10px", fontWeight: "bold" }}>
                  Address
                  <span style={{ paddingLeft: "15%" }}>{customerAddress}</span>
                </li>
              </ul>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

OrderDetailsDC.propTypes = {
  IsDeliveredimage: PropTypes.bool.isRequired,
  orderId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  subTotal: PropTypes.number.isRequired,
  orderTotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  deliveryCost: PropTypes.number.isRequired,
  gratitude: PropTypes.number.isRequired,
  displayDetails: PropTypes.bool.isRequired,
  dishes: PropTypes.object.isRequired,
  getUserDetails: PropTypes.func.isRequired,
  CustomerId: PropTypes.number.isRequired,
  CustomerDetails: PropTypes.object.isRequired,
  orderDeliveryType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  deliveredOrders: state.owner.deliveredOrders,
  CustomerDetails: state.owner.CustomerDetails,
});

export default connect(mapStateToProps, {
  getUserDetails,
})(OrderDetailsDC);
