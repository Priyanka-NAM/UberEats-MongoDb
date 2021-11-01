/* eslint-disable react/require-default-props */
/* eslint-disable object-shorthand */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../Styles/SideBar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { BiX } from "react-icons/bi";
import {
  Button,
  Col,
  Row,
  Container,
  Nav,
  Form,
  FormControl,
  Modal,
  InputGroup,
} from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import UberELogo from "../../Home/HomeIcons/logo";
import mainstyle from "../../Home/HomeIcons/HeaderStyle";
import "../../Styles/SignInUp.css";
import ProfileCanvas from "../../Home/HomeIcons/ProfileCanvas";
import { customerOrderPlaced } from "../../../Actions/CustomerActions";
import { emptyCart } from "../../../Actions/CartActions";

class FinalOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showChange: false,
      showOrderSucess: false,
      deliveryevent: true,
      tempChangeLocation: "",
      ChangedDeliveryLocation: "",
      notes: "",
    };
  }

  handleShow = () => {
    this.setState({
      showModal: true,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      showChange: false,
    });
  };

  handleOpen = () => {
    this.setState({
      showChange: true,
    });
  };

  handleDeliveryAddressChange = (e) => {
    this.setState({
      tempChangeLocation: e.target.value,
    });
  };

  handleLocationClose = () => {
    const { tempChangeLocation } = this.state;
    this.setState({
      showChange: false,
      ChangedDeliveryLocation: tempChangeLocation,
    });
  };

  handlePlaceOrder = (e) => {
    e.preventDefault();
    const {
      cartItems,
      restaurantId,
      currentLocation,
      userLocation,
      restaurantImage,
      restaurant_city,
      restaurantName,
    } = this.props;
    const { deliveryevent, ChangedDeliveryLocation, notes } = this.state;
    this.setState({
      showOrderSucess: true,
    });
    const statusDetails = {
      restaurant_id: restaurantId,
      restaurant_image: restaurantImage,
      restaurant_city: restaurant_city,
      restaurant_name: restaurantName,
      delivery_status: "Order Received",
      order_status: "Active",
      cart_items: cartItems,
    };
    const CostObject = this.getCostFromCartItems(cartItems);
    let order_delivery_type = "Pickup";

    if (deliveryevent) {
      order_delivery_type = "Delivery";
    }
    let orderlocation = userLocation;
    if (currentLocation.addressLine1 !== "") {
      orderlocation = currentLocation;
    }

    let addressLine1 = orderlocation.addressLine1;
    let state = orderlocation.state;
    let city = orderlocation.city;
    let country = orderlocation.country;
    let zipcode = orderlocation.zipcode;

    if (ChangedDeliveryLocation !== "") {
      const locationdetails = ChangedDeliveryLocation.split(",");
      [addressLine1, city, state, country, zipcode] = [...locationdetails];
    }
    const orderPostInput = {
      ...statusDetails,
      ...CostObject,
      order_delivery_type,
      order_address_line_1: addressLine1,
      order_city: city,
      order_state: state,
      order_country: country,
      order_zipcode: zipcode,
      notes: notes,
    };
    this.props.customerOrderPlaced(orderPostInput);
    this.props.emptyCart();
  };

  getCostFromCartItems = (cartItems) => {
    const { deliveryevent } = this.state;
    let cartRows = null;
    let totalCartValue = 0;
    let deliveryfee = 5.0;
    if (deliveryevent) {
      deliveryfee = 5.0;
    } else {
      deliveryfee = 0.0;
    }

    const cadriverbenefit = 2.0;
    let ordertotal = 0;
    if (cartItems) {
      cartRows = cartItems.map((cartitem, index) => {
        totalCartValue += parseFloat(cartitem.price, 10);
        ordertotal = totalCartValue + deliveryfee + cadriverbenefit;
        return 0;
      });
    }
    const taxTotal = 0.09 * totalCartValue;
    ordertotal += taxTotal;
    return {
      sub_total: totalCartValue.toFixed(2),
      tax: taxTotal.toFixed(2),
      delivery_cost: deliveryfee,
      gratitude: cadriverbenefit,
      order_total: ordertotal.toFixed(2),
    };
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDeliveryMode = (e) => {
    if (e.target.value === "delivery") {
      this.setState({
        deliveryevent: true,
      });
    } else {
      this.setState({
        deliveryevent: false,
      });
    }
  };

  render() {
    const {
      showModal,
      showOrderSucess,
      deliveryevent,
      showChange,
      ChangedDeliveryLocation,
    } = this.state;
    const {
      restaurantName,
      cartItems,
      currentLocation,
      userLocation,
      restaurantDeliveryMode,
    } = this.props;
    console.log("currentLocation", currentLocation);
    console.log("userLocation", userLocation);
    const location = currentLocation ? currentLocation : userLocation;
    let addressLine1 = userLocation.addressLine1;
    let state = userLocation.state;
    let city = userLocation.city;
    let country = userLocation.country;
    let zipcode = userLocation.zipcode;
    if (currentLocation.addressLine1 !== "") {
      addressLine1 = currentLocation.addressLine1;
      state = currentLocation.state;
      city = currentLocation.city;
      country = currentLocation.country;
      zipcode = currentLocation.zipcode;
    }
    if (ChangedDeliveryLocation !== "") {
      const locationdetails = ChangedDeliveryLocation.split(",");
      addressLine1 = locationdetails[0];
      state = locationdetails[2];
      city = locationdetails[1];
      country = locationdetails[3];
      zipcode = locationdetails[4];
    }
    let cartRows = null;
    let totalCartValue = 0;
    let deliveryfee = 5.0;
    if (deliveryevent) {
      deliveryfee = 5.0;
    } else {
      deliveryfee = 0.0;
    }
    const cadriverbenefit = 2.0;
    let ordertotal = 0;
    let taxTotal = 0;
    if (cartItems) {
      cartRows = cartItems.map((cartitem, index) => {
        totalCartValue += parseFloat(cartitem.price, 10);
        ordertotal = totalCartValue + deliveryfee + cadriverbenefit;
        return (
          <Row
            style={{ textAlign: "left", width: "70%", paddingBottom: "10px" }}>
            <Col xs={1} className='locationIcon'>
              <Button
                variant='light'
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#eeeeee",
                  width: "3rem",
                }}>
                {cartitem.quantity}
              </Button>
            </Col>
            <Col style={{ textAlign: "left" }}>
              <h5 className='addressdetails'>{cartitem.title}</h5>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <h6 className='priceDetails'>
                {parseFloat(cartitem.price, 10).toFixed(2)}
              </h6>
            </Col>
          </Row>
        );
      });

      taxTotal = 0.09 * totalCartValue;
      ordertotal += taxTotal;
      ordertotal = ordertotal.toFixed(2);
      totalCartValue = totalCartValue.toFixed(2);
      console.log("restaurantName", restaurantName);
    }
    return (
      <Container fluid='true' style={{ overflow: "hidden" }}>
        <Form onSubmit={this.handlePlaceOrder}>
          <Row
            style={{
              display: "flex",
              marginLeft: "2%",
              height: "100vh",
            }}>
            <Col style={{ flex: "1.5", backgroundColor: "white" }} fluid='true'>
              <Nav style={{ marginTop: "2%" }}>
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
              </Nav>
              <div style={{ width: "85%" }}>
                <Row style={{ marginTop: "4%" }}>
                  <h1 className='restaName'>{restaurantName}</h1>
                </Row>
                <hr style={{ border: "1px", width: "70%" }} />

                <Row style={{ marginTop: "2%" }}>
                  <h4 className='subtitle'>Delivery Mode</h4>
                  {(restaurantDeliveryMode === "Both" ||
                    restaurantDeliveryMode === "Delivery") && (
                    <Row style={{ paddingBottom: "20px" }}>
                      <Col xs={1} style={{ paddingRight: "0%" }}>
                        <input
                          type='radio'
                          name='deliverymode'
                          value='delivery'
                          style={{
                            height: "22px",
                            width: "22px",
                            verticalAlign: "middle",
                            backgroundColor: "black",
                          }}
                          onClick={this.handleDeliveryMode}
                          required
                        />
                      </Col>
                      <Col>
                        <Form.Check.Label className='addressdetails' required>
                          Delivery
                        </Form.Check.Label>
                      </Col>
                    </Row>
                  )}

                  {(restaurantDeliveryMode === "Both" ||
                    restaurantDeliveryMode === "Pick up") && (
                    <Row style={{ paddingBottom: "15px" }}>
                      <Col xs={1}>
                        <input
                          type='radio'
                          name='deliverymode'
                          value='pickup'
                          style={{
                            height: "22px",
                            width: "22px",
                            verticalAlign: "middle",
                          }}
                          onClick={this.handleDeliveryMode}
                          required
                        />
                      </Col>
                      <Col>
                        <Form.Check.Label className='addressdetails'>
                          Pickup
                        </Form.Check.Label>
                      </Col>
                    </Row>
                  )}
                </Row>

                {deliveryevent &&
                  (restaurantDeliveryMode === "Both" ||
                    restaurantDeliveryMode === "Delivery") && (
                    <>
                      <hr style={{ border: "1px", width: "70%" }} />
                      <Row style={{ marginTop: "2%" }}>
                        <h4 className='subtitle'>Delivery Address</h4>
                      </Row>
                      <Row style={{ textAlign: "left", width: "70%" }}>
                        <Col xs={1} className='locationIcon'>
                          <MdLocationOn size='30px' />
                        </Col>
                        <Col
                          style={{
                            textAlign: "left",
                            fontFamily: "sans-serif",
                          }}>
                          <h5 className='addressdetails'>{addressLine1}</h5>
                          <h6 className='detailsadd'>
                            {city},{zipcode},{state},{country}
                          </h6>
                        </Col>
                        <Col style={{ textAlign: "right" }}>
                          <Button
                            variant='light'
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#eeeeee",
                            }}
                            onClick={this.handleOpen}>
                            Edit
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                <hr style={{ border: "1px", width: "70%" }} />
                <Row style={{ marginTop: "2%" }}>
                  <h4 className='subtitle'>Payment</h4>
                  <Row style={{ paddingBottom: "20px" }}>
                    <Col xs={1} style={{ paddingRight: "0%" }}>
                      <input
                        type='radio'
                        name='radio'
                        value='value'
                        style={{
                          height: "22px",
                          width: "22px",
                          verticalAlign: "middle",
                          backgroundColor: "black",
                        }}
                        defaultChecked
                      />
                    </Col>
                    <Col>
                      <Form.Check.Label className='addressdetails' required>
                        Cash on Delivery
                      </Form.Check.Label>
                    </Col>
                  </Row>
                  <hr style={{ border: "1px", width: "70%" }} />
                </Row>
                <Row style={{ marginTop: "2%" }}>
                  <h4 className='subtitle'>Your items</h4>
                </Row>
                {cartRows}
                <br />
                <br />
                <input
                  type='text'
                  name='notes'
                  placeholder='Add a Note for the Store'
                  onChange={this.handleChange}
                  style={{
                    backgroundColor: "#eeeee",
                    fontFamily: "sans-serif",
                    height: "3rem",
                    width: "70%",
                  }}
                />
              </div>
            </Col>
            <Col
              style={{ backgroundColor: "#F6F6F6" }}
              align='center'
              fluid='true'>
              <Row style={{ paddingTop: "40px", width: "80%" }}>
                <Button className='placeorderbtn' variant='light' type='submit'>
                  Place Order
                </Button>
              </Row>
              <Row style={{ width: "80%" }}>
                <p>
                  If you’re not around when the delivery person arrives, they’ll
                  leave your order at the door. By placing your order, you agree
                  to take full responsibility for it once it’s delivered.
                </p>
              </Row>
              <hr style={{ border: "1px black" }} />
              <Row
                style={{
                  width: "80%",
                  paddingTop: "40px",
                  fontSize: "18px",
                  fontFamily: "sans-serif",
                  letterSpacing: "0.06em",
                }}>
                <ul className='list-group'>
                  <li
                    className=' d-flex justify-content-between align-items-center'
                    style={{ paddingBottom: "10px" }}>
                    Subtotal
                    <span>${totalCartValue}</span>
                  </li>
                  <li
                    className=' d-flex justify-content-between align-items-center'
                    style={{ paddingBottom: "10px" }}>
                    Tax
                    <span>${taxTotal.toFixed(2)}</span>
                  </li>
                  <li
                    className='d-flex justify-content-between align-items-center'
                    style={{ paddingBottom: "10px" }}>
                    Delivery Fee
                    <span>${deliveryfee}</span>
                  </li>
                  <li
                    className='d-flex justify-content-between align-items-center'
                    style={{ paddingBottom: "10px" }}>
                    CA Driver Benefits
                    <span>${cadriverbenefit}</span>
                  </li>
                </ul>
              </Row>
              <hr style={{ border: "1px black" }} />
              <Row
                style={{
                  width: "80%",
                  paddingTop: "20px",
                  fontSize: "24px",
                  fontFamily: "sans-serif",
                }}>
                <ul className='list-group'>
                  <li
                    className=' d-flex justify-content-between align-items-center'
                    style={{ paddingBottom: "10px" }}>
                    Total
                    <span>${ordertotal}</span>
                  </li>
                </ul>
              </Row>
            </Col>
          </Row>
        </Form>
        <ProfileCanvas handleClose={this.handleClose} showModal={showModal} />
        <Modal
          show={showChange}
          onHide={this.handleLocationClose}
          backdrop='static'
          keyboard={false}
          style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Modal.Header>
            <BiX
              size='35px'
              style={{ color: "black" }}
              onClick={this.handleLocationClose}
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
                  onChange={this.handleDeliveryAddressChange}
                />
              </InputGroup>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='dark'
              onClick={this.handleLocationClose}
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
          show={showOrderSucess}
          backdrop='static'
          keyboard={false}
          style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Modal.Body>
            <Modal.Title
              style={{
                fontSize: "36px",
                fontFamily: "sans-serif",
                marginBottom: "20px",
              }}>
              Order is placed Successfully
            </Modal.Title>
          </Modal.Body>
          <Modal.Footer>
            <Link to='/customer/home'>
              <Button
                variant='dark'
                style={{
                  width: "100%",
                  height: "60px",
                  fontSize: "18px",
                  fontFamily: "UberMove, sans-serif",
                }}>
                Return to home
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

FinalOrder.propTypes = {
  restaurantName: PropTypes.string.isRequired,
  restaurantId: PropTypes.number.isRequired,
  restaurant_city: PropTypes.number.isRequired,
  restaurantImage: PropTypes.string.isRequired,
  cartItems: PropTypes.array.isRequired,
  currentLocation: PropTypes.object.isRequired,
  userLocation: PropTypes.object.isRequired,
  customerOrderPlaced: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  restaurantDeliveryMode: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  restaurantName: state.cartDetails.restaurantName,
  restaurant_city: state.cartDetails.restaurant_city,
  restaurantId: state.cartDetails.restaurantId,
  restaurantImage: state.cartDetails.restaurantImage,
  restaurantDeliveryMode: state.cartDetails.DeliveryMode,
  currentLocation: state.currentLocation,
  userLocation: state.signin.address,
  cartItems: state.cartDetails.items,
});
export default connect(mapStateToProps, { customerOrderPlaced, emptyCart })(
  FinalOrder
);
