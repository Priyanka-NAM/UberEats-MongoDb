/* eslint-disable no-param-reassign */
import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import { BsFillPlusCircleFill, BsDashCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { updateCart } from "../../Actions/CartActions";

function CartItemRow(props) {
  const { quantity, dishtitle, totaldishprice, itemIndex } = props;
  // const itemPrice = totaldishprice / quantity;

  console.log("Total dish price ", totaldishprice);

  const handleIncrement = () => {
    props.updateCart(dishtitle, quantity + 1);
    // props.quantity = quantity + 1;
    // props.totaldishprice = (
    //   parseInt(props.quantity, 10) * parseFloat(itemPrice)
    // ).toFixed(2);
  };

  const handleDecrement = () => {
    if (quantity === 0) return;
    props.updateCart(dishtitle, quantity - 1);
    // props.quantity = quantity - 1;
    // props.totaldishprice = (
    //   parseInt(props.quantity, 10) * parseFloat(itemPrice)
    // ).toFixed(2);
  };

  const handleDeleteItem = () => {
    props.handleDelete(itemIndex);
    // props.quantity = quantity - 1;
    // props.totaldishprice = (
    //   parseInt(props.quantity, 10) * parseFloat(itemPrice)
    // ).toFixed(2);
  };

  return (
    <Row style={{ display: "flex" }}>
      <Row style={{ display: "flex", paddingBottom: "0px" }}>
        <Col style={{ padding: "0", margin: "0" }}>
          <BsDashCircleFill
            size='35px'
            style={{ color: "lightgrey" }}
            onClick={handleDecrement}
          />
        </Col>
        <Col style={{ paddingRight: "0", margin: "0" }}>
          <h5
            style={{
              fontSize: "20px",
              fontFamily: "UberMove, sans-serif",
              fontWeight: "500",
            }}>
            {quantity}
          </h5>
        </Col>
        <Col style={{ paddingLeft: "0", margin: "0" }}>
          <BsFillPlusCircleFill
            size='35px'
            style={{ color: "lightgrey" }}
            onClick={handleIncrement}
          />
        </Col>
        <Col style={{ flex: "6" }}>
          <p
            style={{
              fontSize: "20px",
              fontFamily: "UberMove, sans-serif",
            }}>
            {dishtitle}
          </p>
        </Col>
        <Col align='right' style={{ flex: "1" }}>
          <p
            style={{
              fontSize: "18px",
              fontFamily: "UberMove, sans-serif",
            }}>
            ${totaldishprice}
          </p>
        </Col>
        <Col>
          <MdDelete
            size='35px'
            style={{ color: "lightgrey" }}
            onClick={handleDeleteItem}
          />
        </Col>
      </Row>
    </Row>
  );
}
CartItemRow.propTypes = {
  quantity: PropTypes.number.isRequired,
  dishtitle: PropTypes.string.isRequired,
  totaldishprice: PropTypes.string.isRequired,
  itemIndex: PropTypes.number.isRequired,
  updateCart: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { updateCart })(CartItemRow);
