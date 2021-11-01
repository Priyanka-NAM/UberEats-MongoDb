/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getToken } from "../Service/authService";
import Header from "../Home/HomeIcons/Header";
import RestaBanner from "./RestaurentPageIcons/RestaBanner";
import "../Styles/Home.css";
import MenuCard from "./RestaurentPageIcons/MenuCard";
import backendServer from "../../backEndConfig";

class RestaurentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { location } = this.props;
    console.log("Restaurant Home Props: ", location);
    const { state } = location;
    const { restaurant } = state;
    const { restaurant_id } = restaurant;
    axios.defaults.headers.common.authorization = getToken();
    axios
      .get(
        `${backendServer}/ubereats/customerrestaurant/restaurantdetails/${restaurant_id}`
      )
      .then((response) => {
        if (response.data) {
          if (response.data.status !== "RESTAURANT_DETAILS") {
            this.setState({
              restaurentDetails: [],
            });
          } else {
            this.setState({
              restaurentDetails: response.data.restaurentDetails,
            });
            console.log("Restaurant Details Request Successful");
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log("Restaurant Get Error", error.response.data);
        }
      });
    axios
      .get(`${backendServer}/ubereats/dishes/alldishes/${restaurant_id}`)
      .then((response) => {
        if (response.data) {
          if (response.data.status !== "ALL_DISHES") {
            this.setState({
              dishesList: [],
            });
          } else {
            this.setState({
              dishesList: response.data.allDishes,
            });
            console.log("Dish Details Request Successful");
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log("Restaurant Get Error", error.response.data);
        }
      });
  }

  render() {
    const { dishesList, restaurentDetails } = this.state;
    const { currentLocation, userLocation } = this.props;
    let restaurentMenu = null;
    let restaurentBanner = null;
    console.log(
      "Customer Restaurant Home => Restaurant Details ",
      restaurentDetails
    );
    console.log("Customer Restaurant Home => dishes List ", dishesList);
    if (dishesList && restaurentDetails) {
      restaurentMenu = dishesList.map((dish) => (
        <MenuCard
          key={dish.dish_id}
          src={dish.image_file_path}
          title={dish.name}
          price={dish.price}
          currentRestaurantName={restaurentDetails.name}
          currentRestaurantImage={restaurentDetails.image_file_path}
          currentRestaurantCity={restaurentDetails.restaurant_city}
          restaurantDeliveryType={restaurentDetails.delivery_type}
          isOwnerHome={false}
          description={dish.description}
          dishDetails={dish}
          quantity='2'
        />
      ));
    }
    if (restaurentDetails) {
      const src = `${restaurentDetails.image_file_path}`;
      restaurentBanner = (
        <RestaBanner
          key={restaurentDetails.restaurant_id}
          src={src}
          restaTitle={restaurentDetails.name}
          restaAddress={restaurentDetails.restaurant_city}
          isOwnerHome={false}
          otherDetails={`$5.00 Delivery Fee •   35
          - 45 • min •  4.5 • ${restaurentDetails.restaurant_start_time} -${restaurentDetails.restaurant_end_time}`}
          restauDescri={restaurentDetails.description}
        />
      );
    }

    return (
      <div style={{ height: "100vh", overflow: "scroll" }}>
        <Header
          hideDeliveryPickup={false}
          defaultUserLocationDescription={
            currentLocation.addressDescription
              ? currentLocation.addressDescription
              : userLocation.addressDescription
          }
        />
        <div>
          {restaurentBanner}
          <Container fluid>
            <Row
              style={{
                paddingLeft: "20px",
                paddingTop: "30px",
                fontSize: "19px",
                fontWeight: "500",
                color: "black",

                fontFamily: "UberMoveText, sans-serif",
              }}>
              <h3
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}>
                Menu
              </h3>
            </Row>
          </Container>
          <hr style={{ border: "soild 1px" }} />
          <div
            style={{
              height: "100%",
            }}>
            <Row
              style={{
                padding: "0%",
                margin: "0%",
              }}>
              {restaurentMenu}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

RestaurentHome.propTypes = {
  location: PropTypes.object.isRequired,
  currentLocation: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  currentLocation: state.currentLocation,
  userLocation: state.signin.address,
});
export default connect(mapStateToProps, {})(RestaurentHome);
