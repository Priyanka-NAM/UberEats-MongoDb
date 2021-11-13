/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import axios from "axios";
import "react-times/css/classic/default.css";
import PropTypes from "prop-types";
import { Button, Form, Col, Card, Row, Alert } from "react-bootstrap";
import OwnerHome from "../../Home/OwnerHome";
import backendServer from "../../../backEndConfig";
import { getToken } from "../../Service/authService";
import { updateOwner, getOwnerProfile } from "../../../Actions/OwnerActions";
import { ownerProfilePic } from "../../../Actions/ImageUploadAction";

class OwnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false, description: "" };
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setStateFromProps = this.setStateFromProps.bind(this);
  }

  componentDidMount = () => {
    this.props.getOwnerProfile();
    this.setStateFromProps(this.props);
  };

  componentDidUpdate = (prevprops) => {
    if (this.props.ownerDetails !== prevprops.ownerDetails) {
      const { ownerDetails } = this.props;
      this.setStateFromProps(ownerDetails);
      this.setState({
        showAlert: true,
      });
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangesSubmit = (e) => {
    e.preventDefault();
    const details = { ...this.state };
    details.image_file_path = this.props.image_file_path;
    this.props.updateOwner(details);
  };

  handleUploadImage(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("image", this.fileInput.files[0]);
    this.props.ownerProfilePic(data);
  }

  closeAlert = () => {
    this.setState({ showAlert: false });
  };

  setStateFromProps = (ownerDetails) => {
    this.setState({
      ...ownerDetails,
    });
  };

  selectCountry(val) {
    this.setState({ restaurant_country: val });
  }

  selectRegion(val) {
    this.setState({ restaurant_state: val });
  }

  render() {
    const {
      description,
      restaurant_country,
      restaurant_address_line_one,
      restaurant_city,
      restaurant_state,
      restaurant_zipcode,
      email_id,
      name,
      phone_num,
      restaurant_start_time,
      restaurant_end_time,

      delivery_type,
      showAlert,
    } = this.state;
    const { image_file_path } = this.props;
    const src = `${image_file_path}`;
    const { UpdatedStatus } = this.props;

    let errorMessage = "";
    let message = "";
    if (
      UpdatedStatus === "OWNER_PROFILE_DETAILS" ||
      UpdatedStatus === "RESTAURANT_ADDED"
    ) {
      message = "";
    } else if (UpdatedStatus === "RESTAURANT_UPDATED") {
      message = "Restaurant Details updated";
    } else {
      errorMessage = "Could not update Restaurant Details";
    }

    const pageContent = (
      <Col align='left'>
        <Form
          style={{ fontSize: "18px", fontFamily: "sans-serif" }}
          onSubmit={this.handleChangesSubmit}>
          <Row style={{ padding: "0px", fontFamily: "sans-serif" }}>
            <Col style={{ marginLeft: "30px" }}>
              <h4 style={{ fontSize: "25px", fontFamily: "sans-serif" }}>
                Profile Picture
              </h4>
              <Card style={{ width: "24rem", height: "20rem" }}>
                <Card.Body>
                  <Card.Img
                    style={{
                      width: "20rem",
                      height: "14rem",
                      overflow: "hidden",
                    }}
                    src={src}
                  />
                  <input
                    type='file'
                    name='image'
                    encType='multipart/form-data'
                    className='form-control'
                    style={{ display: "none" }}
                    ref={(fileInput) => (this.fileInput = fileInput)}
                  />
                </Card.Body>
                <Card.Footer align='center'>
                  <Button
                    variant='light'
                    style={{
                      paddingTop: "10px",
                      width: "40%",
                      paddingRight: "15px",
                    }}
                    onClick={() => this.fileInput.click()}>
                    Add File
                  </Button>
                  <Button
                    variant='dark'
                    style={{ paddingTop: "10px", width: "50%" }}
                    onClick={this.handleUploadImage}>
                    Upload
                  </Button>
                </Card.Footer>
              </Card>
              <br />
              <h4 style={{ fontSize: "25px", fontFamily: "sans-serif" }}>
                Basic Info
              </h4>

              <Row>
                <Col xs={2}>
                  <Form.Label>Restaurant Name</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type='text'
                    name='name'
                    onChange={this.handleChange}
                    value={name}
                    maxLength='30'
                    required
                    pattern='^[A-Za-z0-9 ]+$'
                  />
                </Col>
              </Row>

              <br />
              <Row>
                <Col xs={2}>
                  <Form.Label>Description</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    name='description'
                    value={description}
                    as='textarea'
                    onChange={this.handleChange}
                    rows={3}
                  />
                </Col>
              </Row>
              <br />
              <h4 style={{ fontSize: "25px", fontFamily: "sans-serif" }}>
                Contact Info
              </h4>

              <Row>
                <Col xs={2}>
                  <Form.Label>Email</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type='text'
                    name='email_id'
                    value={email_id}
                    onChange={this.handleChange}
                    maxLength='45'
                    minLength='5'
                    required
                    pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
                  />
                </Col>
              </Row>

              <br />

              <Row>
                <Col xs={2}>
                  <Form.Label>Phone Number</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type='text'
                    name='phone_num'
                    value={phone_num}
                    onChange={this.handleChange}
                    minLength='10'
                    maxLength='10'
                    required
                    pattern='^[0-9]+$'
                  />
                </Col>
              </Row>

              <br />

              <Row>
                <Col xs={2}>
                  <Form.Label>Password</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type='password'
                    name='password'
                    onChange={this.handleChange}
                    maxLength='30'
                    required
                    pattern='^[A-Za-z0-9 ]+$'
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <h5 style={{ fontSize: "25px", fontFamily: "sans-serif" }}>
                Address Info
              </h5>

              <Row>
                <Col xs={2}>
                  <Form.Label>Address Line1</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type='text'
                    name='restaurant_address_line_one'
                    value={restaurant_address_line_one}
                    onChange={this.handleChange}
                    maxLength='30'
                    required
                    pattern='^[A-Za-z0-9. ]+$'
                  />
                </Col>
              </Row>

              <br />
              <Row>
                <Col xs={2}>
                  <Form.Label>City</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type='text'
                    name='restaurant_city'
                    value={restaurant_city}
                    onChange={this.handleChange}
                    maxLength='30'
                    required
                    pattern='^[A-Za-z0-9 ]+$'
                  />
                </Col>
              </Row>

              <br />
              <Row>
                <Col xs={2}>
                  <Form.Label>State</Form.Label>
                </Col>
                <Col xs={6}>
                  <RegionDropdown
                    style={{
                      width: "100%",
                      height: "2.6rem",
                      borderColor: "#eeeee",
                    }}
                    disableWhenEmpty
                    whitelist={{ US: ["CA"] }}
                    country={restaurant_country}
                    value={restaurant_state}
                    name='restaurant_state'
                    onChange={(val) => this.selectRegion(val)}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={2}>
                  <Form.Label>Country</Form.Label>
                </Col>
                <Col xs={6}>
                  <CountryDropdown
                    name='restaurant_country'
                    style={{
                      width: "100%",
                      height: "2.6rem",
                      borderColor: "#eeeee",
                    }}
                    whitelist={["US"]}
                    value={restaurant_country}
                    onChange={(val) => this.selectCountry(val)}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={2}>
                  <Form.Label>Zip Code</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type='text'
                    name='restaurant_zipcode'
                    value={restaurant_zipcode}
                    onChange={this.handleChange}
                    maxLength='30'
                    required
                    pattern='^[A-Za-z0-9 ]+$'
                  />
                </Col>
              </Row>

              <br />
              <h4 style={{ fontSize: "25px", fontFamily: "sans-serif" }}>
                Restaurant Timings
              </h4>

              <Row>
                <Col xs={2}>
                  <Form.Label>Restaurant Start Time</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type='time'
                    name='restaurant_start_time'
                    onChange={this.handleChange}
                    value={restaurant_start_time}
                    maxLength='10'
                    required
                    pattern='([01]?[0-9]|2[0-3]):[0-5][0-9]'
                    placeholder='HH:MM'
                  />
                </Col>
              </Row>

              <br />

              <Row>
                <Col xs={2}>
                  <Form.Label>Restaurant End Time</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type='time'
                    name='restaurant_end_time'
                    onChange={this.handleChange}
                    value={restaurant_end_time}
                    maxLength='10'
                    required
                    pattern='([01]?[0-9]|2[0-3]):[0-5][0-9]'
                    placeholder='HH:MM'
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={2}>
                  <h4 style={{ fontSize: "25px", fontFamily: "sans-serif" }}>
                    Delivery Type
                  </h4>
                </Col>
                <Col
                  xs={6}
                  style={{ fontSize: "16px", fontFamily: "sans-serif" }}>
                  <Form.Select
                    type='dropdown'
                    name='delivery_type'
                    value={delivery_type}
                    style={{
                      fontSize: "20px",
                      fontFamily: "sans-serif",
                    }}
                    onChange={this.handleChange}
                    required>
                    <option name='Both' value='Both'>
                      Both
                    </option>
                    <option name='Delivery' value='Delivery'>
                      Delivery
                    </option>
                    <option name='Pick up' value='Pick up'>
                      Pick Up
                    </option>
                  </Form.Select>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col>
                  <Button variant='dark' type='submit'>
                    Save Changes
                  </Button>
                </Col>
              </Row>
              <br />
              {showAlert && message && (
                <Alert
                  style={{
                    fontFamily: "sans-serif",
                    width: "20rem",
                  }}
                  variant='success'
                  dismissible
                  onClose={this.closeAlert}>
                  {message}
                </Alert>
              )}
              {errorMessage && (
                <Alert
                  variant='error'
                  style={{
                    fontFamily: "sans-serif",
                  }}>
                  {errorMessage}
                </Alert>
              )}
            </Col>
          </Row>
        </Form>
      </Col>
    );
    return <OwnerHome pageContent={pageContent} />;
  }
}

OwnerProfile.propTypes = {
  updateOwner: PropTypes.func.isRequired,
  getOwnerProfile: PropTypes.func.isRequired,
  ownerProfilePic: PropTypes.func.isRequired,
  ownerDetails: PropTypes.object.isRequired,
  image_file_path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ownerDetails: state.owner.ownerDetails.user,
  UpdatedStatus: state.owner.ownerDetails.status,
  image_file_path: state.imageUpload.owner_image_file_path,
});

export default connect(mapStateToProps, {
  updateOwner,
  getOwnerProfile,
  ownerProfilePic,
})(OwnerProfile);
