import React from "react";
import PropTypes from "prop-types";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/SideBar.css";
import "../../Styles/signInUp.module.css";
import { Container } from "react-bootstrap";

function RestaBanner({
  src,
  restaTitle,
  restaAddress,
  otherDetails,
  restauDescri,
  isOwnerHome,
}) {
  return (
    <Container fluid='true'>
      <img
        style={{
          objectFit: "cover",
          minHeight: "24vh",
          minWidth: "100%",
          overflow: "hidden",
        }}
        src={src}
        alt=''
      />
      <div
        style={{
          width: isOwnerHome ? "80%" : "100%",
          color: "white",
          position: "relative",
          marginTop: "-3.6%",
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0) 100%)",
        }}>
        <h1>
          {restaTitle} {restaAddress}
        </h1>
        <div>
          <h6 style={{ fontFamily: "sans-serif", fontSize: "16px" }}>
            {otherDetails}
          </h6>
        </div>
      </div>
      <div className='resta-details'>
        <h6>{restauDescri}</h6>
      </div>
    </Container>
  );
}

RestaBanner.defaultProps = {
  restaAddress: "",
  src: "",
  restaTitle: "",
  otherDetails: "",
  restauDescri: "",
};

RestaBanner.propTypes = {
  src: PropTypes.string,
  restaTitle: PropTypes.string,
  restaAddress: PropTypes.string,
  otherDetails: PropTypes.string,
  restauDescri: PropTypes.string,
  isOwnerHome: PropTypes.bool.isRequired,
};

export default RestaBanner;
