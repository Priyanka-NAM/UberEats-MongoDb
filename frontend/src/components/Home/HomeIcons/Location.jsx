/* eslint-disable prefer-const */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import { BiX } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";

import PropTypes from "prop-types";
import mainstyle from "./HeaderStyle";
import { changeLocation } from "../../../Actions/LocationAction";
import "../../Styles/Header.css";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, showChange: false, locationInput: "" };
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

  handleOpen = () => {
    this.setState({
      showChange: true,
    });
  };

  handleDone = () => {
    this.setState({
      showModal: false,
    });
  };

  handleSecClose = () => {
    this.setState({
      showChange: false,
    });
  };

  parseAddress = (address) => {
    let parsedAddress = {
      addressDescription: "",
      addressLine1: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    };
    parsedAddress.addressDescription = address;
    const splitAddr = address.split(",");
    [
      parsedAddress.addressLine1,
      parsedAddress.city,
      parsedAddress.state,
      parsedAddress.zipcode,
    ] = splitAddr;
    parsedAddress.country = "US";
    return parsedAddress;
  };

  handleKeyPress = (target) => {
    if (target.charCode === 13) {
      const { locationInput } = this.state;
      console.log("On Location Enter Key Press: ", locationInput);
      console.log(
        "On Location Enter Key Press Parsed Address: ",
        this.parseAddress(locationInput)
      );
      this.props.changeLocation(this.parseAddress(locationInput));
      this.setState({
        showChange: false,
      });
    }
  };

  handleChange = (e) => {
    console.log("On Location change: ", e.target.value);
    this.setState({
      locationInput: e.target.value,
    });
  };

  handleLocationUpdate = (e) => {
    const { locationInput } = this.state;
    console.log("On Location Update Click : ", locationInput);
    console.log(
      "On Location update click Parsed Address: ",
      this.parseAddress(locationInput)
    );
    this.props.changeLocation(this.parseAddress(locationInput));
    this.setState({
      showChange: false,
    });
  };

  render() {
    const { showModal, showChange } = this.state;
    const { description, isLong, changedLocationDescription } = this.props;
    let AddressDescription = description;
    if (changedLocationDescription !== "") {
      AddressDescription = changedLocationDescription;
    }
    return (
      <>
        <InputGroup className='mb-3'>
          <Button
            style={isLong ? mainstyle.longlocation : mainstyle.location}
            variant='light'
            onClick={this.handleShow}>
            <MdLocationOn
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginRight: "10px",
                position: "absolute",
                paddingBottom: "0%",
              }}
              size='25px'
            />
            <span
              style={{
                paddingLeft: "20px",
                fontFamily: "sans-serif",
                fontWeight: "550",
              }}>
              {AddressDescription}
            </span>
          </Button>
        </InputGroup>
        <Modal
          show={showModal}
          onHide={this.handleClose}
          backdrop='static'
          keyboard={false}
          style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Modal.Header>
            <BiX
              size='35px'
              style={{ color: "black" }}
              onClick={this.handleClose}
            />
          </Modal.Header>
          <Modal.Body>
            <Modal.Title
              style={{
                fontSize: "36px",
                fontFamily: "UberMove, sans-serif",
                marginBottom: "20px",
              }}>
              Delivery Details
            </Modal.Title>
            <Row style={{ display: "flex" }}>
              <Row>
                <Col style={{ flex: "1" }}>
                  <MdLocationOn size='35px' />
                </Col>
                <Col style={{ flex: "8", fontFamily: "UberMove, sans-serif" }}>
                  {AddressDescription}
                </Col>
                <Col>
                  <Button
                    variant='secondary'
                    onClick={this.handleOpen}
                    style={{
                      fontSize: "18px",
                      fontFamily: "UberMove, sans-serif",
                      borderRadius: "30px",
                      width: "85px",
                    }}>
                    Change
                  </Button>
                </Col>
              </Row>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='dark'
              onClick={this.handleDone}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                fontFamily: "UberMove, sans-serif",
              }}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showChange}
          onHide={this.handleSecClose}
          backdrop='static'
          keyboard={false}
          style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Modal.Header>
            <BiX
              size='35px'
              style={{ color: "black" }}
              onClick={this.handleSecClose}
            />
          </Modal.Header>
          <Modal.Body>
            <Modal.Title
              style={{
                fontSize: "36px",
                fontFamily: "UberMove, sans-serif",
                marginBottom: "20px",
              }}>
              Delivery Details
            </Modal.Title>
            <Row style={{ display: "flex" }}>
              <InputGroup className='mb-3'>
                <InputGroup.Text
                  id='basic-addon1'
                  style={{ background: "none" }}>
                  <MdLocationOn size='35px' />
                </InputGroup.Text>
                <FormControl
                  placeholder='Enter delivery address'
                  aria-label='Enter delivery address'
                  aria-describedby='basic-addon1'
                  onKeyPress={this.handleKeyPress}
                  onChange={this.handleChange}
                />
              </InputGroup>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='dark'
              onClick={this.handleLocationUpdate}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                fontFamily: "UberMove, sans-serif",
              }}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

Location.propTypes = {
  description: PropTypes.string.isRequired,
  isLong: PropTypes.bool.isRequired,
  changeLocation: PropTypes.func.isRequired,
  changedLocationDescription: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  changedLocationDescription: state.currentLocation.addressDescription,
});

export default connect(mapStateToProps, { changeLocation })(Location);
