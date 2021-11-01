/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Row, Container } from "react-bootstrap";
import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import { BiX } from "react-icons/bi";

import { userSignOut } from "../../../Actions/signinAction";
import "../../Styles/Header.css";

class ProfileCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClose = () => {
    const { handleClose } = this.props;
    handleClose();
  };

  handleSignOut = () => {
    this.props.userSignOut();
    console.log("inside handlesignout");
  };

  render() {
    const { showModal } = this.props;
    const user = JSON.parse(localStorage.getItem("user"));
    const { profile_pic_file_path } = user;
    const src = `${profile_pic_file_path}`;

    return (
      <OffCanvas
        transitionDuration={1000}
        effect='parallax'
        isMenuOpened={showModal}
        position='left'>
        <OffCanvasMenu
          style={{
            backgroundColor: "white",
            width: "15.5%",
            height: "100%",
            zIndex: "1000",
          }}>
          <Container align='left'>
            <div
              style={{
                marginTop: "5%",
                display: "flex",
                justifyContent: "flex-end",
              }}>
              <BiX
                size='35px'
                style={{ color: "black" }}
                onClick={this.handleClose}
              />
            </div>
            <div style={{ marginLeft: "10%" }}>
              <div
                style={{
                  marginTop: "10%",
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}>
                <div>
                  {profile_pic_file_path && (
                    <img
                      className='rounded-circle'
                      style={{
                        display: "inline-block",
                        objectFit: "cover",
                        width: "120px",
                        height: "120px",
                      }}
                      src={src}
                      alt=''
                    />
                  )}
                  {!profile_pic_file_path && (
                    <FaUserCircle
                      size='100px'
                      style={{ color: "#eeeeee", marginRight: "10px" }}
                    />
                  )}
                </div>
                <div>
                  <p
                    style={{
                      marginBottom: "0px",
                      fontWeight: "550",
                      fontFamily: "UberMoveText, sans-serif",
                      fontSize: "18px",
                    }}>
                    {user.name}
                  </p>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#05944F",
                      fontWeight: "500",
                      fontFamily: "UberMoveText, sans-serif",
                      fontSize: "18px",
                    }}
                    to='/customer/profile'>
                    view account
                  </Link>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20%",
                  fontFamily: "sans-serif",
                }}>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  viewBox='0 0 24 24'
                  width='30px'
                  height='30px'
                  paddingleft='0'
                  className='c6 c7 c8 c9'>
                  <path d='M4.5 2.833v18.333l4.583-2.5 2.917 2.5 2.917-2.5 4.583 2.5V2.833h-15zM16.167 9.5H7.833V7h8.334v2.5z' />
                </svg>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    marginLeft: "20px",
                  }}
                  to='/customerOrder'>
                  Orders
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10%",
                  fontFamily: "sans-serif",
                }}>
                <FaHeart size='25px' />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontFamily: "sans-serif",
                    fontSize: "18px",
                    marginLeft: "20px",
                  }}
                  to='/customer/favorites'>
                  Favorites
                </Link>
              </div>

              <Row style={{ marginTop: "20%" }}>
                <Link to='/' onClick={this.handleSignOut}>
                  <Button
                    variant='light'
                    style={{
                      borderRadius: "30px",
                      width: "80%",
                      height: "3.5rem",
                      fontSize: "18px",
                      fontFamily: "sans-serif",
                      backgroundColor: "#eeee",
                    }}>
                    Sign out
                  </Button>
                </Link>
              </Row>
            </div>
          </Container>
        </OffCanvasMenu>
      </OffCanvas>
    );
  }
}
ProfileCanvas.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userSignOut: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.signin.user,
});
export default connect(mapStateToProps, { userSignOut })(ProfileCanvas);
