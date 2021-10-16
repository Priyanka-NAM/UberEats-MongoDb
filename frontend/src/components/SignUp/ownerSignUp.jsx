/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { addOwner } from "../../Actions/OwnerActions";
import SignInUpNAV from "./SignInUpNavBar";
import { isOwnerSignedIn, isUserSignedIn } from "../Service/authService";

class OwnerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // const { email, password, name } = this.state;
    const details = {
      ...this.state,
    };
    this.props.addOwner(details);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  selectCountry(val) {
    this.setState({ restaurant_country: val });
  }

  selectRegion(val) {
    this.setState({ restaurant_state: val });
  }

  render() {
    const { owner, UpdatedStatus } = this.props;
    // if (isOwnerSignedIn || isUserSignedIn) {
    //   return <Redirect to='/home' />;
    // }
    const {
      restaurant_city,
      restaurant_country,
      restaurant_state,
      restaurant_zipcode,
      restaurant_address_line_one,
    } = this.state;

    let errorMessage = "";
    if (!UpdatedStatus) {
      errorMessage = "";
    } else if (UpdatedStatus === "RESTAURANT_ADDED") {
      return <Redirect to='/owner/home' />;
    } else {
      errorMessage = "Oops! Could not Add Restaurant";
    }

    return (
      <>
        <SignInUpNAV />
        <Container
          align='right'
          style={{
            width: "80%",
            height: "80vh",
            backgroundImage: `url("https://www.ubereats.com/restaurant/_static/b32d6f597129133d883c48c0b95c97f5.jpg")`,
          }}>
          <Container
            align='right'
            style={{
              backgroundColor: "white",
              margin: "0",
              width: "30%",
            }}>
            <Form
              align='center'
              style={{
                height: "80vh",
                width: "100%",
                fontfamily: "UberMoveText",
              }}
              onSubmit={this.handleSubmit}>
              <h2
                style={{
                  paddingTop: "50px",
                  paddingBottom: "33px",
                  fontfamily: "Book",
                  fontSize: "25px",
                }}>
                Getting Started
              </h2>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                  style={{
                    height: "50px",
                  }}
                  type='name'
                  placeholder='Restaurant Name'
                  name='name'
                  required
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                  style={{
                    height: "50px",
                  }}
                  type='Location'
                  name='restaurant_address_line_one'
                  value={restaurant_address_line_one}
                  required
                  placeholder='Restaurant Address Line'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group
                className='mb-3'
                style={{ display: "flex", flexDirection: "row" }}>
                <Form.Control
                  style={{
                    height: "50px",
                  }}
                  type='text'
                  name='restaurant_city'
                  value={restaurant_city}
                  required
                  placeholder='City'
                  onChange={this.handleChange}
                />
                <RegionDropdown
                  style={{
                    width: "100%",
                  }}
                  disableWhenEmpty
                  // whitelist={{ US: ["CA"] }}
                  country={restaurant_country}
                  value={restaurant_state}
                  name='restaurant_state'
                  onChange={(val) => this.selectRegion(val)}
                />
              </Form.Group>
              <Form.Group
                className='mb-3'
                style={{ display: "flex", flexDirection: "row" }}>
                <CountryDropdown
                  name='restaurant_country'
                  style={{
                    width: "100%",
                  }}
                  // whitelist={["US"]}
                  value={restaurant_country}
                  onChange={(val) => this.selectCountry(val)}
                />

                <Form.Control
                  style={{
                    height: "50px",
                  }}
                  type='text'
                  name='restaurant_zipcode'
                  value={restaurant_zipcode}
                  required
                  placeholder='ZipCode'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                  style={{
                    height: "50px",
                  }}
                  type='email'
                  name='email'
                  pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
                  title='Please enter valid email id'
                  required
                  placeholder='Enter email'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Control
                  style={{
                    height: "50px",
                  }}
                  type='password'
                  name='password'
                  required
                  placeholder='Password'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "#43A422",
                  color: "white",
                  height: "50px",
                }}
                variant='light'
                type='submit'>
                Submit
              </Button>
              <br />
              <br />
              {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            </Form>
          </Container>
        </Container>
      </>
    );
  }
}

OwnerSignUp.propTypes = {
  addOwner: PropTypes.func.isRequired,
  owner: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  owner: state.owner.ownerDetails,
  UpdatedStatus: state.owner.ownerDetails.status,
});
export default connect(mapStateToProps, { addOwner })(OwnerSignUp);
