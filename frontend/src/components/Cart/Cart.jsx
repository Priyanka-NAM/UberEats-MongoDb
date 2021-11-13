/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import { connect } from "react-redux";

import { Modal, Button, Row } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CartItemRow from "./CartItemRow";
import mainstyle from "../Home/HomeIcons/HeaderStyle";
import "../Styles/Header.css";
import { deleteCartItem } from "../../Actions/CartActions";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, cartItemCount: 0 };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { cartItems } = this.props;
    this.setState({
      cartItemCount: cartItems.length,
    });
  }

  componentDidUpdate(prevProps) {
    const { cartItems } = this.props;
    if (cartItems !== prevProps.cartItems) {
      this.setState({
        cartItemCount: cartItems.length,
      });
    }
  }

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

  handleItemDelete = (itemIndex) => {
    const { cartItemCount } = this.state;
    this.setState({
      cartItemCount: cartItemCount - 1,
    });

    this.props.deleteCartItem(itemIndex);
  };

  render() {
    const { showModal, cartItemCount } = this.state;
    const { restaurantName, cartItems } = this.props;
    let cartRows = null;
    let emptyCart = null;
    let newCart = null;
    let totalCartValue = 0;
    let totalItems = 0;
    if (cartItems) {
      totalItems = cartItems.length;
      cartRows = cartItems.map((cartitem, index) => {
        totalCartValue += parseFloat(cartitem.price, 10);
        let eachitemprice = parseFloat(cartitem.price, 10);
        eachitemprice = eachitemprice.toFixed(2);
        return (
          <CartItemRow
            quantity={cartitem.quantity}
            dishtitle={cartitem.title}
            totaldishprice={eachitemprice.toString()}
            itemIndex={index}
            handleDelete={this.handleItemDelete}
          />
        );
      });
    }
    if (totalCartValue === 0) {
      emptyCart = (
        <div>
          <Modal
            show={showModal}
            onHide={this.handleClose}
            backdrop='static'
            keyboard={false}
            style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <Modal.Header>
              <BiX
                size='35px'
                style={{ color: "black" }}
                onClick={this.handleClose}
              />
            </Modal.Header>
            <Modal.Body>
              <Row>
                <FaShoppingCart
                  size='100'
                  style={{ paddingRight: "3px", color: "#eeee" }}
                />
              </Row>
              <br />
              <br />
              <Row>
                <h6
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "18px",
                    fontWeight: "550",
                    paddingLeft: "30px",
                  }}>
                  Add items from a restaurant to start a new cart
                </h6>
              </Row>
            </Modal.Body>
          </Modal>
        </div>
      );
    } else {
      totalCartValue = totalCartValue.toFixed(2);
      newCart = (
        <Modal
          show={showModal}
          onHide={this.handleClose}
          backdrop='static'
          keyboard={false}
          style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Modal.Header>
            <BiX
              size='35px'
              style={{ color: "black" }}
              onClick={this.handleClose}
            />
          </Modal.Header>
          <Modal.Body>
            <Modal.Title
              style={{
                fontSize: "36px",
                fontFamily: "UberMove, sans-serif",
                marginBottom: "20px",
              }}>
              {restaurantName}
            </Modal.Title>
            {cartRows}
          </Modal.Body>
          <Modal.Footer>
            <Link to={{ pathname: "/order/checkout", state: "" }}>
              <Button
                variant='dark'
                style={{
                  width: "100%",
                  height: "60px",
                  fontSize: "18px",
                  fontFamily: "UberMove, sans-serif",
                }}>
                Go to Checkout .
                <span style={{ paddingLeft: "15px" }}>${totalCartValue}</span>
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      );
    }

    return (
      <>
        <Button
          size='lg'
          style={mainstyle.cart}
          variant='light'
          onClick={this.handleShow}>
          <FaShoppingCart style={{ paddingRight: "3px" }} />
          Cart.{cartItemCount}
        </Button>
        {emptyCart}
        {newCart}
      </>
    );
  }
}

Cart.propTypes = {
  restaurantName: PropTypes.string.isRequired,
  cartItems: PropTypes.array.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurantName: state.cartDetails.restaurantName,
  cartItems: state.cartDetails.items,
});

export default connect(mapStateToProps, { deleteCartItem })(Cart);
