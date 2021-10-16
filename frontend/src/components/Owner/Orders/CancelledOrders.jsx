/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import "react-times/css/classic/default.css";
import { Col, Row, Alert } from "react-bootstrap";
import { Redirect } from "react-dom";
import { connect } from "react-redux";
import OwnerHome from "../../Home/OwnerHome";
import OrdersNav from "./OrdersNav";
import OrderCard from "./OrderCard";
import OrderDetailsDC from "./OrderDetailsDC";
import { isOwnerSignedIn } from "../../Service/authService";
import { ownerCancelledOrders } from "../../../Actions/OwnerActions";

class CancelledOrders extends Component {
  constructor(props) {
    super(props);
    this.state = { showOrder: false };
  }

  componentDidMount() {
    this.props.ownerCancelledOrders();
  }

  componentDidUpdate = (prevprops) => {
    const { cancelledOrders } = this.props;
    if (cancelledOrders !== prevprops.cancelledOrders) {
      this.setState({
        cancelledOrders,
      });
    }
  };

  handleDisplay = (index) => {
    const { cancelledOrders, showOrder } = this.state;
    console.log("cancelledOrders", cancelledOrders[index]);
    this.setState({
      showOrder: !showOrder,
      currentOrder: cancelledOrders[index],
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    this.setState({
      showOrder: false,
    });
  };

  render() {
    if (!isOwnerSignedIn) {
      <Redirect to='/' />;
    }
    const { errormessage, showOrder, currentOrder } = this.state;
    const { cancelledOrders } = this.props;
    let orderId = null;
    let name = null;
    let subTotal = null;
    let orderTotal = null;
    let tax = null;
    let orderComps = null;
    let dishes = null;
    let gratitude = null;
    let deliveryCost = null;
    let CustomerId = null;
    let orderDeliveryType = null;

    if (!cancelledOrders || cancelledOrders.length === 0) {
      orderComps = (
        <Alert variant='info' style={{ fontFamily: "sans-serif" }}>
          No Cancelled orders
        </Alert>
      );
    } else {
      orderComps = cancelledOrders.map((order, index) => (
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
              Cancelled Orders
            </h4>
            <br />
            {orderComps}
          </Col>
          <Col xs={5} style={{ padding: "3%" }}>
            <div
              show={showOrder}
              style={{ display: showOrder ? "block" : "none" }}>
              <OrderDetailsDC
                IsDeliveredimage={false}
                orderId={orderId}
                name={name}
                CustomerId={CustomerId}
                subTotal={subTotal}
                orderTotal={orderTotal}
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
          <Alert variant='info'>No Cancelled Orders to display</Alert>
        )}
      </Col>
    );
    return <OwnerHome pageContent={pageContent} />;
  }
}

const mapStateToProps = (state) => ({
  cancelledOrders: state.owner.cancelledOrders,
});

export default connect(mapStateToProps, {
  ownerCancelledOrders,
})(CancelledOrders);
