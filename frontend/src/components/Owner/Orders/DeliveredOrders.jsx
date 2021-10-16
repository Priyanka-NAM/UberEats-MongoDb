/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import "react-times/css/classic/default.css";
import { Col, Row, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OrdersNav from "./OrdersNav";
import OwnerHome from "../../Home/OwnerHome";
import OrderCard from "./OrderCard";
import OrderDetailsDC from "./OrderDetailsDC";
import { ownerDeliveredOrders } from "../../../Actions/OwnerActions";

class DeliveredOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.ownerDeliveredOrders();
  }

  componentDidUpdate = (prevprops) => {
    const { deliveredOrders } = this.props;
    if (deliveredOrders !== prevprops.deliveredOrders) {
      this.setState({
        deliveredOrders,
      });
    }
  };

  handleDisplay = (index) => {
    const { deliveredOrders, showOrder } = this.state;
    console.log("deliveredOrders", deliveredOrders[index]);
    this.setState({
      showOrder: !showOrder,
      currentOrder: deliveredOrders[index],
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    this.setState({
      showOrder: false,
    });
  };

  render() {
    const { errormessage, showOrder, currentOrder } = this.state;
    const { deliveredOrders } = this.props;
    let orderId = null;
    let name = null;
    let subTotal = null;
    let CustomerId = null;
    let orderTotal = null;
    let tax = null;
    let orderComps = null;
    let dishes = null;
    let gratitude = null;
    let deliveryCost = null;
    let orderDeliveryType = null;
    if (!deliveredOrders || deliveredOrders.length === 0) {
      orderComps = (
        <Alert variant='info' style={{ fontFamily: "sans-serif" }}>
          No Delivered orders
        </Alert>
      );
    } else {
      orderComps = deliveredOrders.map((order, index) => (
        <OrderCard
          bccolor='#eeeeee'
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
      orderId = currentOrder.order_id;
      name = currentOrder.customer_name;
      subTotal = currentOrder.sub_total;
      orderTotal = currentOrder.order_total;
      tax = currentOrder.tax;
      CustomerId = currentOrder.customer_id;
      deliveryCost = currentOrder.delivery_cost;
      gratitude = currentOrder.gratitude;
      orderDeliveryType = currentOrder.order_delivery_type;
      // deliveryStatus=currentOrder

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
              <span style={{ paddingLeft: "5%" }}>{dish.name}</span>
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
              Delivered Orders
            </h4>
            <br />
            {orderComps}
          </Col>
          <Col xs={5} style={{ padding: "3%" }}>
            <div
              show={showOrder}
              style={{ display: showOrder ? "block" : "none" }}>
              <OrderDetailsDC
                IsDeliveredimage
                orderId={orderId}
                name={name}
                subTotal={subTotal}
                orderTotal={orderTotal}
                CustomerId={CustomerId}
                tax={tax}
                displayDetails={showOrder}
                dishes={dishes}
                deliveryCost={deliveryCost}
                gratitude={gratitude}
                orderDeliveryType={orderDeliveryType}
              />
            </div>
          </Col>
        </Row>
        {errormessage && (
          <Alert variant='info'>No Delivered Orders to display</Alert>
        )}
      </Col>
    );
    return <OwnerHome pageContent={pageContent} />;
  }
}

const mapStateToProps = (state) => ({
  deliveredOrders: state.owner.deliveredOrders,
});

export default connect(mapStateToProps, {
  ownerDeliveredOrders,
})(DeliveredOrders);
