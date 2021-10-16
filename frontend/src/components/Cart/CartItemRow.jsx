import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";

function CartItemRow(props) {
  const { quantity, dishtitle, totaldishprice } = props;
  console.log("Total dish price ", totaldishprice);
  return (
    <Row style={{ display: "flex" }}>
      <Row style={{ display: "flex", paddingBottom: "0px" }}>
        <Col>
          <Button
            variant='secondary'
            style={{
              fontSize: "18px",
              fontFamily: "UberMove, sans-serif",
              borderRadius: "30px",
              width: "60px",

              height: "35px",
            }}>
            {quantity}
          </Button>
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
      </Row>
    </Row>
  );
}
CartItemRow.propTypes = {
  quantity: PropTypes.number.isRequired,
  dishtitle: PropTypes.string.isRequired,
  totaldishprice: PropTypes.string.isRequired,
};

export default CartItemRow;
