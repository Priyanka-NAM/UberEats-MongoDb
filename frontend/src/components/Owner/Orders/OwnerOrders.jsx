/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import "react-times/css/classic/default.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BiX } from "react-icons/bi";
import { Col, Modal, Alert, Form, Button, Row } from "react-bootstrap";
import OrderCard from "./OrderCard";
import OwnerHome from "../../Home/OwnerHome";
import OrdersNav from "./OrdersNav";
import {
  ownerNewOrders,
  ownerNewOrdersUpdate,
  getUserDetails,
} from "../../../Actions/OwnerActions";

class OwnerOrders extends Component {
  hasMounted = false;

  constructor(props) {
    super(props);
    this.state = { showEdit: false, showCategory: false };
  }

  componentDidMount() {
    this.props.ownerNewOrders();
  }

  componentDidUpdate(prevprops) {
    const { newOrders, CustomerDetails } = this.props;
    if (
      newOrders !== prevprops.newOrders ||
      CustomerDetails !== prevprops.CustomerDetails
    ) {
      this.setState({
        newOrders,
        userDetails: CustomerDetails,
      });
    }
  }

  handleUserProfile = (e) => {
    e.preventDefault();
    const { customer_id } = this.state.currentOrder;
    console.log(
      "Click on Profile Link (New Order)=> Customer Id ",
      customer_id
    );
    this.props.getUserDetails(customer_id);
    this.setState({
      showCategory: true,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDisplay = (index) => {
    const { newOrders } = this.state;
    this.setState({
      showEdit: true,
      currentOrder: newOrders[index],
      delivery_status: newOrders[index].delivery_status,
    });
  };

  handleClose = () => {
    this.setState({
      showCategory: false,
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    this.setState({
      showEdit: false,
    });
    const { order_id, restaurant_id } = this.state.currentOrder;
    let { order_status } = this.state.currentOrder;
    const { delivery_status } = this.state;
    if (delivery_status === "Picked up" || delivery_status === "Delivered") {
      order_status = "Completed";
    }
    if (delivery_status === "Cancel") {
      order_status = "Cancelled";
    }
    this.props.ownerNewOrdersUpdate({
      order_id,
      restaurant_id,
      delivery_status,
      order_status,
    });
  };

  render() {
    const {
      showEdit,
      errormessage,
      newOrders,
      currentOrder,
      showCategory,
      userDetails,
      delivery_status,
    } = this.state;
    let orderId = null;
    let name = null;
    let subTotal = null;
    let orderTotal = null;
    let tax = null;
    let orderComps = null;
    let dishes = null;
    let customerName = null;
    let customerNickname = null;
    let customerAddress = null;
    let customerEmailId = null;
    let customerPhoneNum = null;
    let gratitude = null;
    let deliveryCost = null;
    let orderDeliveryType = null;
    let currentOrderStatus = null;
    let order_status_options = null;
    if (userDetails) {
      customerName = userDetails.name;
      customerNickname = userDetails.nick_name;
      customerAddress = `${userDetails.address_line_1},${userDetails.city},${userDetails.state},${userDetails.country},${userDetails.zipcode}`;
      customerEmailId = userDetails.email_id;
      customerPhoneNum = userDetails.phone_num;
    }
    if (!newOrders || newOrders.length === 0) {
      orderComps = (
        <Alert variant='info' style={{ fontFamily: "sans-serif" }}>
          No new Orders
        </Alert>
      );
    } else {
      orderComps = newOrders.map((order, index) => (
        <OrderCard
          bccolor='#05944F'
          key={index}
          orderIndex={index}
          name={order.customer_name}
          orderId={order.order_id}
          billamount={order.sub_total}
          totalitems={order.dishes.length}
          handleDisplay={this.handleDisplay}
        />
      ));
    }

    if (currentOrder) {
      console.log("Has Current Order ", currentOrder);
      orderId = currentOrder.order_id;
      name = currentOrder.customer_name;
      subTotal = currentOrder.sub_total;
      orderTotal = currentOrder.order_total;
      tax = currentOrder.tax;
      deliveryCost = currentOrder.delivery_cost;
      gratitude = currentOrder.gratitude;
      orderDeliveryType = currentOrder.order_delivery_type;
      currentOrderStatus = currentOrder.delivery_status;

      if (orderDeliveryType === "Pickup") {
        console.log(
          "Inside pickup order delivery type options ",
          orderDeliveryType
        );
        order_status_options = (
          <>
            <Form.Select
              name='delivery_status'
              style={{
                width: "40%",
                height: "3.5rem",
                fontSize: "20px",
                fontFamily: "sans-serif",
                fontWeight: "550",
              }}
              onChange={this.handleChange}
              value={delivery_status}
              required>
              <option value=''>Order Status</option>
              <option value='Order Received'> Order Received</option>
              <option value='Preparing'>Preparing</option>
              <option value='Pick up Ready'>Pick up Ready</option>
              <option value='Picked up'>Picked up</option>
              <option value='Cancel'>Cancel</option>
            </Form.Select>
          </>
        );
      } else {
        order_status_options = (
          <>
            <Form.Select
              name='delivery_status'
              style={{
                width: "40%",
                height: "3.5rem",
                fontSize: "20px",
                fontFamily: "sans-serif",
                fontWeight: "550",
              }}
              onChange={this.handleChange}
              value={delivery_status}
              required>
              <option value=''>Order Status</option>
              <option value='Order Received'> Order Received</option>
              <option value='Preparing'>Preparing</option>
              <option value='On the way'>On the way</option>
              <option value='Delivered'>Delivered</option>
              <option value='Cancel'>Cancel</option>
            </Form.Select>
          </>
        );
      }

      dishes = currentOrder.dishes.map((dish, index) => (
        <>
          <Row
            style={{
              fontSize: "18px",
              fontFamily: "sans-serif",
              fontWeight: "550",
            }}>
            <Col>
              {dish.quantity}
              <span style={{ paddingLeft: "5%" }}>{dish.dish_name}</span>
            </Col>
            <Col xs={3} style={{ textAlign: "end" }}>
              ${dish.price}
            </Col>
          </Row>
          <hr style={{ border: "1px soild black" }} />
        </>
      ));
    }

    const pageContent = (
      <Col style={{ padding: "0px" }} align='left'>
        <OrdersNav />
        <Row style={{ marginRight: "0%" }}>
          <Col
            style={{
              paddingLeft: "5%",
              paddingTop: "4%",
              borderRight: "1px solid black",
              height: "84vh",
            }}>
            <h4 style={{ fontSize: "35px", fontFamily: "sans-serif" }}>
              New Orders
            </h4>
            <br />
            {orderComps}
            {errormessage && <Alert variant='info'>{errormessage}</Alert>}
          </Col>
          <Col xs={5} style={{ padding: "3%" }}>
            <div
              show={showEdit}
              style={{ display: showEdit ? "block" : "none" }}>
              <Row
                style={{
                  paddingBottom: "0%",
                  height: "5rem",
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
                      marginTop: "0%",
                      paddingBottom: "0%",
                    }}>
                    {orderId}
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

              <Row
                style={{
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: "550",
                  marginTop: "15%",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                {order_status_options}
                {/* <Form.Select
                  name='delivery_status'
                  style={{
                    width: "40%",
                    height: "3.5rem",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: "550",
                  }}
                  onChange={this.handleChange}
                  value={delivery_status}
                  required>
                  <option value=''>Order Status</option>
                  {order_status_options}
                  <option value='Order Received'> Order Received</option>
                  <option value='Preparing'>Preparing</option>
                  <option value='On the way'>On the way</option>
                  <option value='Delivered'>Delivered</option>
                  <option value='Cancel'>Cancel</option>
                  <option value='Pick up Ready'>Pick up Ready</option>
                  <option value='Picked up'>Picked up</option> 
                </Form.Select> 
                */}
                <Button
                  style={{
                    width: "20%",
                    height: "3rem",
                    fontFamily: "sans-serif",
                    fontSize: "18px",
                  }}
                  variant='dark'
                  onClick={this.handleSave}>
                  Save
                </Button>
              </Row>
            </div>
          </Col>
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
      </Col>
    );
    return <OwnerHome pageContent={pageContent} />;
  }
}

OwnerOrders.propTypes = {
  newOrders: PropTypes.object.isRequired,
  ownerNewOrders: PropTypes.func.isRequired,
  ownerNewOrdersUpdate: PropTypes.func.isRequired,
  getUserDetails: PropTypes.func.isRequired,
  CustomerDetails: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  newOrders: state.owner.newOrders,
  CustomerDetails: state.owner.CustomerDetails,
});

export default connect(mapStateToProps, {
  ownerNewOrders,
  ownerNewOrdersUpdate,
  getUserDetails,
})(OwnerOrders);
