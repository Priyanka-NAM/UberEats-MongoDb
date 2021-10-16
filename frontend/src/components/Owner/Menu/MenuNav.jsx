import React, { Component } from "react";
import "react-times/css/classic/default.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class MenuNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar variant='light' style={{ borderBottom: "1px solid black" }}>
        <Container
          fluid='true'
          style={{ paddingLeft: "40px", fontSize: "20px" }}>
          <Nav className='me-auto'>
            <Link
              to='/owner/menuupdate'
              style={{
                paddingLeft: "40px",
                color: "black",
                fontSize: "22px",
                fontFamily: "sans-serif",
                textDecoration: "none",
              }}>
              Menus
            </Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default MenuNav;
