/* eslint-disable react/require-default-props */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  Nav,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
  Row,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBars, FaSearch } from "react-icons/fa";
import Cart from "../../Cart/Cart";
import Location from "./Location";
import UberELogo from "./logo";
import mainstyle from "./HeaderStyle";
import ProfileCanvas from "./ProfileCanvas";
import "../../Styles/Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      deliverystyle: mainstyle.DpActiveButton,
      pickupstyle: mainstyle.DPButton,
      searchInput: "",
    };
  }

  getAddressFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { address_line_1, city, state, country, zipcode } = user;
    return { address_line_1, city, state, country, zipcode };
  };

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

  handleDeliveryPickup = (e) => {
    e.preventDefault();
    const { restoSearch } = this.props;
    if (e.target.name === "Delivery") {
      this.setState({
        deliverystyle: mainstyle.DpActiveButton,
        pickupstyle: mainstyle.DPButton,
      });
      return restoSearch(e.target.name);
    }

    this.setState({
      deliverystyle: mainstyle.DPButton,
      pickupstyle: mainstyle.DpActiveButton,
    });
    return restoSearch(e.target.name);
  };

  handleSearchBarKeyPress = (target) => {
    if (target.charCode === 13) {
      const { searchBarCallback } = this.props;
      const { searchInput } = this.state;
      console.log("On Search Bar Enter Key Press: ", searchInput);
      searchBarCallback(searchInput);
    }
  };

  handleSearchBarChange = (e) => {
    const { searchBarChangeCb } = this.props;
    console.log("On Search Bar change: ", e.target.value);
    this.setState({
      searchInput: e.target.value,
    });
    searchBarChangeCb(e.target.value);
  };

  handleSearchBar = (e) => {
    const { searchBarCallback } = this.props;
    const { searchInput } = this.state;
    console.log("On Search Bar Click : ", searchInput);
    searchBarCallback(searchInput);
  };

  render() {
    const { showModal, deliverystyle, pickupstyle } = this.state;
    const userLocationFromLocal = this.getAddressFromLocalStorage();
    const defaultDescription = `${userLocationFromLocal.address_line_1},${userLocationFromLocal.city},${userLocationFromLocal.state},${userLocationFromLocal.country},${userLocationFromLocal.zipcode}`;
    const { location, defaultUserLocationDescription } = this.props;
    const isCurrentURL = (url) =>
      location.pathname.toLowerCase() === url.toLowerCase();

    return (
      <Container fluid='true' style={{ marginBottom: "2%" }}>
        <Row fluid='true'>
          <Nav style={mainstyle.headerRow}>
            <Nav.Item>
              <FaBars
                style={{ height: "50px" }}
                xs='6'
                size='24px'
                color='black'
                onClick={this.handleShow}
              />
            </Nav.Item>

            <Nav.Item style={mainstyle.paddingLeft}>
              <Link to={{ pathname: "/customer/home", state: "" }}>
                <img
                  style={{ paddingLeft: "15px", height: "50px" }}
                  src={UberELogo.UberEBLogo.src}
                  alt={UberELogo.UberEBLogo.alt}
                />
              </Link>
            </Nav.Item>

            {isCurrentURL("/customer/home") ? (
              <Nav.Item style={{ paddingLeft: "40px" }}>
                <ButtonGroup style={mainstyle.DeliveryPickupgroup}>
                  <Button
                    style={deliverystyle}
                    variant='light'
                    name='Delivery'
                    onClick={this.handleDeliveryPickup}>
                    Delivery
                  </Button>
                  <Button
                    style={pickupstyle}
                    variant='light'
                    name='Pick up'
                    onClick={this.handleDeliveryPickup}>
                    Pickup
                  </Button>
                </ButtonGroup>
              </Nav.Item>
            ) : null}

            {!isCurrentURL("/customer/profile") ? (
              <>
                <Nav.Item
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "40px",
                  }}>
                  <Location
                    isLong={!isCurrentURL("/customer/home")}
                    description={defaultDescription}
                    changedLocationDescription=''
                    changeLocation={() => {}}
                  />
                </Nav.Item>
                <Nav.Item style={mainstyle.paddingLeft}>
                  <InputGroup
                    size='lg'
                    style={{
                      width: "70rem",
                      height: "54.4px",
                    }}>
                    <Button variant='light' onClick={this.handleSearchBar}>
                      <FaSearch />
                    </Button>
                    <FormControl
                      placeholder='What are you craving?'
                      onKeyPress={this.handleSearchBarKeyPress}
                      onChange={this.handleSearchBarChange}
                    />
                  </InputGroup>
                </Nav.Item>
                <Nav.Item align='center' style={mainstyle.paddingLeft}>
                  <Cart title='' description='' quantity='' price='' />
                </Nav.Item>
              </>
            ) : null}
          </Nav>
        </Row>
        <ProfileCanvas
          showModal={showModal}
          handleSignOut={null}
          handleClose={this.handleClose}
        />
      </Container>
    );
  }
}

Header.propTypes = {
  restoSearch: () => {},
  searchBarCallback: () => {},
};

Header.propTypes = {
  restoSearch: PropTypes.func,
  searchBarCallback: PropTypes.func,
  defaultUserLocationDescription: PropTypes.string.isRequired,
  searchBarChangeCb: PropTypes.func,
};

export default withRouter(Header);
