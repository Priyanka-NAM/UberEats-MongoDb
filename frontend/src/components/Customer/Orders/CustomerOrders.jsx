/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable object-shorthand */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import {
  Container,
  Col,
  Button,
  Card,
  Row,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { BiX } from "react-icons/bi";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import moment from "moment";
import "moment-timezone";

import { customerOrders } from "../../../Actions/CustomerActions";
import Header from "../../Home/HomeIcons/Header";
import backendServer from "../../../backEndConfig";

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  componentDidMount() {
    this.props.customerOrders();
  }

  componentDidUpdate(prevprops) {
    const { orders } = this.props;
    console.log("orders", orders);
    if (orders !== prevprops.orders) {
      this.setState({
        filterdOrders: orders,
        orders,
      });
    }
  }

  handleShow = () => {
    this.setState({
      showModal: true,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handleSelect = (e) => {
    console.log("Drop Down Select", e.target.value);
    const filterValue = e.target.value;
    const { orders } = this.state;
    let filterdOrders = orders;

    if (orders && filterValue !== "Order Status") {
      filterdOrders = orders.filter(
        (order) => order.delivery_status === filterValue
      );
    }
    this.setState({
      filterdOrders,
    });
  };

  dateparse = (date) => {
    console.log("Date ", date);
    const dateComponents = date.split("T");
    console.log("dateComponents", dateComponents);
    const datePieces = dateComponents[0].split("-");
    console.log("datePieces", datePieces);
    const timePieces = dateComponents[1].split(":");
    console.log("timepieces", timePieces);

    return new Date(
      Date.UTC(
        datePieces[0],
        datePieces[1] - 1,
        datePieces[2],
        timePieces[0],
        timePieces[1]
      )
    );
  };

  DishItems = (dishes) => {
    console.log("Dishes ", dishes);
    return dishes.map((dish, index) => (
      <Col
        style={{
          fontSize: "18px",
          fontWeight: "500",
        }}
        key={index + 100}>
        {dish.quantity} - {dish.dish_name}
      </Col>
    ));
  };

  assignCurrentOrdertoState = (order) =>
    this.setState({
      showModal: true,
      currentOrder: order,
    });

  createMenuCardComps = (filterdorders) => {
    const { orders } = this.state;
    const allOrderIndexes = [];
    for (let idx = 0; idx < filterdorders.length; idx += 1) {
      allOrderIndexes.push(
        orders.findIndex((dish) => dish.dish_id === filterdorders[idx].dish_id)
      );
    }
    return filterdorders.map((order, index) => {
      // const src = `${backendServer}/public/${order.restaurant_image_file_path}`;
      const src = `${order.restaurant_image_file_path}`;
      const date = this.dateparse(order.create_time).toString();

      return (
        <>
          <Row style={{ paddingRight: "10%" }} key={index}>
            <Card
              style={{
                width: "22rem",
                paddingLeft: "0px",
              }}>
              <Card.Img
                style={{
                  objectFit: "cover",
                  width: "auto",
                  height: "11rem",
                }}
                src={src}
              />
            </Card>
            <Col
              style={{
                fontFamily: "UberMoveText, sans-serif",
              }}>
              <Col
                style={{
                  fontSize: "25px",
                  fontWeight: "500",
                }}>
                {order.restaurant_name} - {order.restaurant_city}
              </Col>
              <Col>
                {order.dishes.length} items for ${order.sub_total} •{" "}
                {order.order_status} on {date}•{" "}
              </Col>
              <br />
            </Col>
            <Col align='right'>
              <Button
                variant='dark'
                onClick={() => this.assignCurrentOrdertoState(order)}
                style={{
                  width: "40%",
                  height: "30%",
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: "500",
                }}>
                Order Details
              </Button>
            </Col>
          </Row>
          <hr size='3' color='blue' />
        </>
      );
    });
  };

  CreateModal(order) {
    const {
      dishes,
      sub_total,
      order_total,
      order_status,
      delivery_status,
      tax,
      delivery_cost,
      gratitude,
      order_address_line_1,
      order_city,
      order_state,
      order_country,
      order_zipcode,
      order_delivery_type,
    } = order;
    const { showModal } = this.state;
    const dishComps = dishes.map((dish) => (
      <ul
        className='list-group'
        style={{ fontSize: "16px", fontFamily: "UberMove, sans-serif" }}>
        <li
          className=' d-flex justify-content-between align-items-center'
          style={{ padding: "0px 20px 10px 20px" }}>
          <span>
            <span style={{ marginRight: "20px" }}>{dish.quantity}</span>
            {dish.dish_name}
          </span>
          <span>{dish.price}</span>
        </li>
      </ul>
    ));

    return (
      <Modal
        show={showModal}
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
            Receipt
          </h5>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title
            style={{
              fontSize: "25px",
              fontFamily: "UberMove, sans-serif",
              marginBottom: "20px",
            }}>
            Total
            <span
              style={{
                paddingLeft: "70%",
              }}>
              ${sub_total}
            </span>
            <hr />
          </Modal.Title>
          {dishComps}
          <hr />

          <ul
            className='list-group'
            style={{
              fontFamily: "sans-serif",
              fontSize: "18px",
              fontWeight: "500",
            }}>
            <li
              className=' d-flex justify-content-between align-items-center'
              style={{ paddingBottom: "10px", fontWeight: "bold" }}>
              Subtotal
              <span>${order_total}</span>
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
              <span>${delivery_cost}</span>
            </li>
            <li
              className='d-flex justify-content-between align-items-center'
              style={{ paddingBottom: "10px" }}>
              CA Driver Benefits
              <span>${gratitude}</span>
            </li>
          </ul>
          <hr />
          <h3
            style={{
              fontFamily: "sans-serif",
              fontSize: "22px",
              fontWeight: "bold",
            }}>
            Address Details
          </h3>
          <h3 style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
            {order_address_line_1},{order_city},{order_state},{order_country},
            {order_zipcode}
          </h3>
          <hr />
          <h3
            style={{
              fontFamily: "sans-serif",
              fontSize: "22px",
              fontWeight: "bold",
            }}>
            Order Status
          </h3>
          <h3 style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
            {order_status}
          </h3>
          <hr />
          <h3
            style={{
              fontFamily: "sans-serif",
              fontSize: "22px",
              fontWeight: "bold",
            }}>
            Delivery Status
          </h3>
          <h3 style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
            {delivery_status}
          </h3>
          <hr />
          <h3
            style={{
              fontFamily: "sans-serif",
              fontSize: "22px",
              fontWeight: "bold",
            }}>
            Delivery Mode
          </h3>
          <h3 style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
            {order_delivery_type}
          </h3>
        </Modal.Body>
      </Modal>
    );
  }

  render() {
    const { showModal, filterdOrders, orders, currentOrder } = this.state;
    let orderComps = null;
    let modalComps = null;
    if (orders && filterdOrders) {
      orderComps = this.createMenuCardComps(filterdOrders);
    }
    console.log("Order Comps ", orderComps);
    if (!orderComps || orderComps.length === 0) {
      orderComps = (
        <Alert variant='info' style={{ fontFamily: "sans-serif" }}>
          No Orders found with this selection
        </Alert>
      );
    }
    if (currentOrder) {
      modalComps = this.CreateModal(currentOrder);
    }
    return (
      <div style={{ marginLeft: "1%", height: "100vh", overflow: "scroll" }}>
        <Header />
        <Container style={{ marginLeft: "1%" }} fluid>
          <Row>
            <Col>
              <h1>Past Orders</h1>
            </Col>
            <Col xs={3}>
              <Form.Select
                name='delivery_status'
                style={{
                  width: "40%",
                  height: "3.5rem",
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  fontWeight: "550",
                }}
                onChange={this.handleSelect}
                required>
                <option>Order Status</option>
                <option value='Order Received'> Order Received</option>
                <option value='Preparing'>Preparing</option>
                <option value='On the way'>On the way</option>
                <option value='Delivered'>Delivered</option>
                <option value='Cancel'>Cancelled</option>
                <option value='Pick up Ready'>Pick up Ready</option>
                <option value='Picked up'>Picked up</option>
              </Form.Select>
            </Col>
          </Row>
          <br />
          <br />
          {orderComps}
        </Container>
        {modalComps}
      </div>
    );
  }
}

CustomerOrders.propTypes = {
  customerOrders: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.customer.orders,
});

export default connect(mapStateToProps, { customerOrders })(CustomerOrders);
