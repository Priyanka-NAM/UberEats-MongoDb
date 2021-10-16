import React, { Component } from "react";
import "react-times/css/classic/default.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class OrdersNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar variant='light' style={{ borderBottom: "1px solid black" }}>
        <Container
          fluid='true'
          style={{
            paddingLeft: "40px",
            fontSize: "22px",
            textDecoration: "none",
            fontFamily: "sans-serif",
          }}>
          <Nav className='me-auto'>
            <Link
              to='/owner/orders'
              style={{
                paddingLeft: "40px",
                color: "black",
                fontSize: "22px",
                textDecoration: "none",
                fontFamily: "sans-serif",
              }}
              active>
              New Orders
            </Link>
            <Link
              to='/owner/deliveredorders'
              style={{
                paddingLeft: "40px",
                color: "black",
                fontSize: "22px",
                textDecoration: "none",
                fontFamily: "sans-serif",
              }}>
              Delivered Orders
            </Link>
            <Link
              to='/owner/cancelledorders'
              style={{
                paddingLeft: "40px",
                color: "black",
                fontSize: "22px",
                textDecoration: "none",
                fontFamily: "sans-serif",
              }}>
              Cancelled Orders
            </Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default OrdersNav;
