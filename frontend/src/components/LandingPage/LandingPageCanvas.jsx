/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BiX } from "react-icons/bi";
import { Button, Row, Container } from "react-bootstrap";
import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import PropTypes from "prop-types";
import "../Styles/Header.css";

class LandingPageCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClose = () => {
    const { handleClose } = this.props;
    handleClose();
  };

  render() {
    const { showModal } = this.props;

    return (
      <OffCanvas
        style={{ backgroundColor: "black" }}
        transitionDuration={1000}
        effect='parallax'
        isMenuOpened={showModal}
        position='left'>
        <OffCanvasMenu
          style={{
            backgroundColor: "white",
            width: "15%",
            height: "100%",
            zIndex: "1000",
          }}>
          <Row style={{ marginTop: "5%", marginLeft: "50%" }}>
            <BiX
              size='35px'
              style={{ color: "black" }}
              onClick={this.handleClose}
            />
          </Row>
          <Container align='left' style={{ marginLeft: "15px" }}>
            <Row style={{ marginTop: "20%" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "500",
                  fontfamily: "UberMoveText, sans-serif",
                  fontSize: "22px",
                  letterSpacing: "0.05em",
                }}
                to='/owner/signup'>
                Add your Restaurant
              </Link>
            </Row>
            <Row style={{ marginTop: "10%" }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "500",
                  fontfamily: "UberMoveText, sans-serif",
                  fontSize: "22px",
                  letterSpacing: "0.05em",
                }}
                to='/customer/signup'>
                Sign up to order
              </Link>
            </Row>
            <Row style={{ marginTop: "15%" }}>
              <Link to='/signin'>
                <Button
                  variant='dark'
                  style={{
                    width: "60%",
                    height: "60px",
                    fontWeight: "500",
                    fontfamily: "UberMoveText, sans-serif",
                    fontSize: "22px",
                    letterSpacing: "0.05em",
                  }}
                  onClick={this.handleClose}>
                  Sign In
                </Button>
              </Link>
            </Row>
          </Container>
        </OffCanvasMenu>
      </OffCanvas>
    );
  }
}
LandingPageCanvas.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default LandingPageCanvas;
