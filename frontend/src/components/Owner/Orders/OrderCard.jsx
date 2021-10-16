import React, { Component } from "react";
import "react-times/css/classic/default.css";
import { Col, Row, Card } from "react-bootstrap";
import { PropTypes } from "prop-types";

class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickHandler = () => {
    const { orderIndex, handleDisplay } = this.props;
    handleDisplay(orderIndex);
  };

  render() {
    const { bccolor, name, orderId, billamount, totalitems } = this.props;

    return (
      <Row style={{ paddingBottom: "30px" }}>
        <div onClick={this.clickHandler} role='presentation'>
          <Card style={{ width: "35rem", backgroundColor: bccolor }}>
            <Card.Body
              style={{
                padding: "25px",
                fontSize: "18px",
                fontFamily: "sans-serif",
              }}>
              <Row>
                <Col>
                  <Card.Title style={{ fontWeight: "550" }}>
                    Name - <span style={{ fontWeight: "normal" }}>{name}</span>
                  </Card.Title>
                  <Card.Title style={{ fontWeight: "550", paddingTop: "20px" }}>
                    Order Id -{" "}
                    <span style={{ fontWeight: "normal" }}>{orderId}</span>
                  </Card.Title>
                </Col>
                <Col>
                  <Card.Title style={{ fontWeight: "550" }}>
                    Bill Amount -{" "}
                    <span style={{ fontWeight: "normal" }}>${billamount}</span>
                  </Card.Title>
                  <Card.Title style={{ fontWeight: "550", paddingTop: "20px" }}>
                    Total Items -{" "}
                    <span style={{ fontWeight: "normal" }}>{totalitems}</span>
                  </Card.Title>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Row>
    );
  }
}
OrderCard.propTypes = {
  bccolor: PropTypes.string.isRequired,
  orderIndex: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  billamount: PropTypes.string.isRequired,
  totalitems: PropTypes.string.isRequired,
  handleDisplay: PropTypes.func.isRequired,
};
export default OrderCard;
