/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { userSignin } from "../../Actions/signinAction";
import "bootstrap/dist/css/bootstrap.css";
import UberELogo from "../Home/HomeIcons/logo";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const details = {
      email,
      password,
    };
    this.props.userSignin(details);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { errMsg } = this.props;
    let errorMessage = null;
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.is_owner === 1) {
        return <Redirect to='/owner/home' />;
      }
      return <Redirect to='/customer/home' />;
    }
    if (errMsg) {
      errorMessage = errMsg;
    }
    return (
      <Container>
        <Row align='center' style={{ marginTop: "100px" }}>
          <Link to='/'>
            <img
              style={{ paddingLeft: "0" }}
              src={UberELogo.UberEBLogo.src}
              alt=''
            />
          </Link>
        </Row>
        <Row>
          <Form onSubmit={this.handleSubmit}>
            <Row
              style={{
                marginTop: "60px",
                paddingLeft: "28%",
              }}>
              <h2
                style={{
                  fontSize: "30px",
                  fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                  fontWeight: "400",
                }}>
                Welcome back
              </h2>
              <h6
                style={{
                  marginTop: "30px",
                  marginBottom: "10px",
                  fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                  fontSize: "16px",
                  letterSpacing: ".02em",
                  fontWeight: "400",
                  color: "#262626",
                }}>
                Sign in with your email address or mobile number.
              </h6>
              <div
                style={{
                  width: "60%",
                  height: "100%",
                  fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                }}>
                <Form.Control
                  size='lg'
                  type='email'
                  name='email'
                  placeholder='Enter email'
                  onChange={this.handleChange}
                />
                <Form.Control
                  style={{
                    marginTop: "20px",
                  }}
                  size='lg'
                  type='password'
                  name='password'
                  placeholder='Enter password'
                  onChange={this.handleChange}
                />
                {errorMessage && (
                  <p
                    style={{
                      width: "100%",
                      height: "40%",
                      marginTop: "15px",
                      fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                    }}
                    className='alert alert-danger'>
                    {errorMessage}
                  </p>
                )}
                <Button
                  size='lg'
                  style={{
                    width: "100%",
                    height: "60%",
                    marginTop: "25px",
                    fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                  }}
                  variant='dark'
                  type='submit'>
                  Next
                </Button>
              </div>
              <Row
                style={{
                  width: "60%",
                  marginTop: "20px",
                  fontFamily: "UberMoveText-Medium,Helvetica,sans-serif",
                  fontSize: "16px",
                }}>
                <Col
                  align='right'
                  style={{
                    paddingRight: "0px",
                  }}>
                  <Form.Label>New to Uber?</Form.Label>
                </Col>
                <Col>
                  <Link
                    style={{
                      color: "green",
                    }}
                    to='/customer/signup'>
                    Create an account
                  </Link>
                </Col>
              </Row>
            </Row>
          </Form>
        </Row>
      </Container>
    );
  }
}

SignIn.propTypes = {
  userSignin: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isLoggedin: state.signin.isLoggedin,
  errMsg: state.signin.errMsg,
});
export default connect(mapStateToProps, { userSignin })(SignIn);
