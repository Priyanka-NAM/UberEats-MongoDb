/* eslint-disable no-return-assign */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PropTypes from "prop-types";
import axios from "axios";
import "react-times/css/classic/default.css";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Container,
  Col,
  Card,
  Row,
  Alert,
} from "react-bootstrap";
import { getToken } from "../../Service/authService";
import Header from "../../Home/HomeIcons/Header";
import { updateCustomer } from "../../../Actions/CustomerActions";
import { customerProfilePic } from "../../../Actions/ImageUploadAction";
import backendServer from "../../../backEndConfig";

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  componentDidMount = () => {
    const { customerDetails } = this.props;
    this.setState({
      ...customerDetails,
    });
  };

  componentDidUpdate = (prevprops) => {
    if (this.props.customerDetails !== prevprops.customerDetails) {
      const { customerDetails } = this.props;
      this.setState({
        ...customerDetails,
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
    details.profile_pic_file_path = this.props.profile_pic_file_path;
    this.props.updateCustomer(details);
  };

  handleUploadImage(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("image", this.fileInput.files[0]);
    this.props.customerProfilePic(data);
  }

  closeAlert = () => {
    this.setState({ showAlert: false });
  };

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ state: val });
  }

  render() {
    const {
      email_id,
      name,
      nick_name,
      phone_num,
      address_line_1,
      date_of_birth,
      city,
      state,
      password,
      country,
      zipcode,
      // profile_pic_file_path,
      showAlert,
    } = this.state;
    // let profile_pic_file_path;
    // if (this.props.profile_pic_file_path !== "") {
    //   profile_pic_file_path = this.props.profile_pic_file_path;
    // }
    // if (profile_pic_file_path === "" || !profile_pic_file_path) {
    const user = JSON.parse(localStorage.getItem("user"));
    let { profile_pic_file_path } = user;
    // }
    if (this.props.profile_pic_file_path !== "") {
      profile_pic_file_path = this.props.profile_pic_file_path;
    }
    console.log("profile_pic_file_path => ", profile_pic_file_path);

    const src = profile_pic_file_path;

    const { UpdateStatus } = this.props;

    let errorMessage = "";
    let message = "";
    if (
      UpdateStatus === "Authentication Successful" ||
      UpdateStatus === "USER_ADDED"
    ) {
      message = "";
    } else if (UpdateStatus === "CUSTOMER_UPDATED") {
      message = "Customer Details updated";
    } else {
      errorMessage = "Could not update Customer Details";
    }

    return (
      <Container fluid='true' style={{ overflow: "hidden", marginLeft: "2%" }}>
        <Row>
          <Header />
        </Row>
        <Row style={{ marginTop: "3%" }}>
          <Form
            onSubmit={this.handleChangesSubmit}
            style={{ fontSize: "18px", fontFamily: "sans-serif" }}>
            <Col align='left'>
              <Row style={{ padding: "0px" }}>
                <Col style={{ marginLeft: "30px" }}>
                  <h4>Profile Update</h4>
                  <Card style={{ width: "16rem", height: "12rem" }}>
                    <div style={{ width: "16rem", height: "8rem" }}>
                      <img src={src} alt='Preview' />
                    </div>
                    <input
                      type='file'
                      name='image'
                      encType='multipart/form-data'
                      className='form-control'
                      style={{ display: "none" }}
                      accept='image/*'
                      ref={(fileInput) => (this.fileInput = fileInput)}
                    />
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
                        style={{ paddingTop: "10px", width: "40%" }}
                        onClick={this.handleUploadImage}>
                        Upload
                      </Button>
                    </Card.Footer>
                  </Card>
                  <br />
                  <br />
                  <h5>Basic Info</h5>

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Name</Form.Label>
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
                      <Form.Label>Nick Name</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='text'
                        name='nick_name'
                        onChange={this.handleChange}
                        value={nick_name}
                        maxLength='8'
                        pattern='^[A-Za-z0-9 ]+$'
                      />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Date of Birth</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='date'
                        name='date_of_birth'
                        onChange={this.handleChange}
                        value={date_of_birth}
                        required
                      />
                    </Col>
                  </Row>
                  <br />
                  <h5>Security Info</h5>

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Password</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='password'
                        name='password'
                        onChange={this.handleChange}
                        maxLength='8'
                        required
                        pattern='^[A-Za-z0-9 ]+$'
                      />
                    </Col>
                  </Row>
                  <br />
                </Col>
                <Col>
                  <h4>Contact Info</h4>

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Email</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='email'
                        name='email_id'
                        onChange={this.handleChange}
                        value={email_id}
                        maxLength='32'
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
                        onChange={this.handleChange}
                        value={phone_num}
                        minLength='10'
                        maxLength='10'
                        required
                        pattern='^[0-9]+$'
                      />
                    </Col>
                  </Row>
                  <br />

                  <h4>Address Info</h4>

                  <Row>
                    <Col xs={2}>
                      <Form.Label>Address Line1</Form.Label>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type='text'
                        name='address_line_1'
                        onChange={this.handleChange}
                        value={address_line_1}
                        maxLength='32'
                        required
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
                        name='city'
                        onChange={this.handleChange}
                        value={city}
                        minLength='3'
                        maxLength='30'
                        required
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
                        name='state'
                        disableWhenEmpty
                        whitelist={{ US: ["CA"] }}
                        country={country}
                        value={state}
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
                        style={{
                          width: "100%",
                          height: "2.6rem",
                          borderColor: "#eeeee",
                        }}
                        name='country'
                        whitelist={["US"]}
                        value={country}
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
                        type='number'
                        name='zipcode'
                        onChange={this.handleChange}
                        value={zipcode}
                        minLength='5'
                        maxLength='5'
                        required
                        pattern='^[0-9]+$'
                      />
                    </Col>
                  </Row>

                  <br />
                  <Row>
                    <Col xs={2}>
                      <Button variant='dark' type='submit'>
                        Save Changes
                      </Button>
                      {errorMessage && (
                        <Alert
                          style={{
                            fontFamily: "sans-serif",
                            width: "15rem",
                          }}
                          variant='error'>
                          {errorMessage}
                        </Alert>
                      )}
                      <br />
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
                </Col>
              </Row>
            </Col>
          </Form>
        </Row>
      </Container>
    );
  }
}

CustomerProfile.propTypes = {
  updateCustomer: PropTypes.func.isRequired,
  customerDetails: PropTypes.object.isRequired,
  customerProfilePic: PropTypes.func.isRequired,
  profile_pic_file_path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  customerDetails: state.customer.customerDetails.user,
  UpdateStatus: state.customer.customerDetails.status,
  profile_pic_file_path: state.imageUpload.customer_image_file_path,
});

export default connect(mapStateToProps, { updateCustomer, customerProfilePic })(
  CustomerProfile
);
