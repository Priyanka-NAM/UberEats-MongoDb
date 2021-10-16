/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { connect } from "react-redux";
import { Button, Container, Form } from "react-bootstrap";
import { addCustomer } from "../../Actions/CustomerActions";
import SignInUpNAV from "./SignInUpNavBar";
import { isOwnerSignedIn, isUserSignedIn } from "../Service/authService";

class CustomerSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const details = {
      ...this.state,
    };
    this.props.addCustomer(details);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ state: val });
  }

  render() {
    const { user, UpdateStatus } = this.props;
    // if (isOwnerSignedIn || isUserSignedIn) {
    //   return <Redirect to='/home' />;
    // }

    const { country, state, city, address_line_1, zipcode } = this.state;

    let errorMessage = "";
    if (!UpdateStatus) {
      errorMessage = "";
    } else if (
      UpdateStatus === "Authentication Successful" ||
      UpdateStatus === "USER_ADDED"
    ) {
      return <Redirect to='/customer/home' />;
    } else if (UpdateStatus === "USER_EXISTS") {
      errorMessage = "Opps! Email id already exists";
    } else {
      errorMessage = "Oops! Could not add Customer ";
    }

    return (
      <>
        <SignInUpNAV />
        <Container
          align='right'
          style={{
            marginTop: "20px",
            width: "80%",
            height: "74vh",
            backgroundImage: `url("https://scontent-sjc3-1.xx.fbcdn.net/v/t1.6435-9/32159993_1629239100531581_6053773609350987776_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=9267fe&_nc_ohc=-ptS4LsPLfAAX9iFS41&_nc_ht=scontent-sjc3-1.xx&oh=b9db10453a7f6df28e19e6c0c4fb8ef6&oe=61644213")`,
          }}>
          <Container
            align='right'
            style={{
              backgroundColor: "#212529",
              margin: "0",
              width: "30%",
            }}>
            <Form
              align='center'
              style={{
                height: "74vh",
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
                  color: "white",
                }}>
                Sign Up to Order
              </h2>
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Control
                  style={{
                    height: "50px",
                  }}
                  type='name'
                  name='name'
                  required
                  placeholder='Name'
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
              <Form.Group className='mb-3'>
                <Form.Control
                  style={{
                    height: "50px",
                  }}
                  type='text'
                  name='address_line_1'
                  value={address_line_1}
                  required
                  placeholder='Address Line 1'
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
                  name='city'
                  value={city}
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
                  country={country}
                  value={state}
                  name='state'
                  onChange={(val) => this.selectRegion(val)}
                />
              </Form.Group>
              <Form.Group
                className='mb-3'
                style={{ display: "flex", flexDirection: "row" }}>
                <CountryDropdown
                  name='country'
                  style={{
                    width: "100%",
                  }}
                  // whitelist={["US"]}
                  value={country}
                  onChange={(val) => this.selectCountry(val)}
                />

                <Form.Control
                  style={{
                    height: "50px",
                  }}
                  type='text'
                  name='zipcode'
                  value={zipcode}
                  required
                  placeholder='ZipCode'
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
                Next
              </Button>
              {errorMessage && (
                <p
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                  }}
                  className='alert alert-danger'>
                  {errorMessage}
                </p>
              )}
            </Form>
          </Container>
        </Container>
      </>
    );
  }
}

CustomerSignUp.propTypes = {
  addCustomer: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.customer.customerDetails.user,
  UpdateStatus: state.customer.customerDetails.status,
});
export default connect(mapStateToProps, { addCustomer })(CustomerSignUp);
