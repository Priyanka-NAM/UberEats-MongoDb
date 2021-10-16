import React, { Component } from "react";
import "react-times/css/classic/default.css";
import { FaPlus } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { Button, Col, Table, Row, Modal } from "react-bootstrap";
import OwnerHome from "../../Home/OwnerHome";
import MenuNav from "./MenuNav";

class MenuUpdateCategories extends Component {
  constructor(props) {
    super(props);
    this.state = { showCategory: false };
  }

  handleShow = () => {
    this.setState({
      showCategory: true,
    });
  };

  handleClose = () => {
    this.setState({
      showCategory: false,
    });
  };

  render() {
    const { showCategory } = this.state;
    const pageContent = (
      <Col style={{ padding: "0px", fontFamily: "sans-serif" }} align='left'>
        <MenuNav />
        <Row style={{ marginLeft: "3%", marginTop: "3%" }}>
          <Row>
            <h1>Categories</h1>
          </Row>
          <Col
            align='right'
            style={{
              marginRight: "8%",
              fontSize: "16px",
              fontFamily: "sans-serif",
            }}>
            <Button
              style={{ width: "15%", height: "3.5rem" }}
              onClick={this.handleShow}
              variant='dark'>
              <FaPlus style={{ marginRight: "10%" }} />
              New Category
            </Button>
          </Col>
          <br />
          <Row style={{ marginTop: "4%" }}>
            <Table
              style={{
                width: "80%",
                fontSize: "16px",
                fontFamily: "sans-serif",
              }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Menus</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    height: "3.5rem",
                  }}>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr
                  style={{
                    height: "3.5rem",
                  }}>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr
                  style={{
                    height: "3.5rem",
                  }}>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Row>
        <Modal
          show={showCategory}
          onHide={this.handleClose}
          backdrop='static'
          keyboard={false}
          style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <BiX
            size='35px'
            style={{ color: "black" }}
            onClick={this.handleClose}
          />
          <Modal.Header>
            <h5
              style={{
                fontSize: "24px",
                fontFamily: "UberMove, sans-serif",
                marginBottom: "0px",
              }}>
              Item Category
            </h5>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title
              style={{
                fontSize: "25px",
                fontFamily: "UberMove, sans-serif",
                marginBottom: "20px",
              }}>
              Total
              <span
                style={{
                  paddingLeft: "80%",
                }}>
                $5
              </span>
            </Modal.Title>

            <ul
              className='list-group'
              style={{ fontSize: "16px", fontFamily: "UberMove, sans-serif" }}>
              <li
                className=' d-flex justify-content-between align-items-center'
                style={{ padding: "0px 20px 10px 20px" }}>
                <span>
                  <span style={{ marginRight: "20px" }}>4</span>item
                </span>
                <span>$5</span>
              </li>
            </ul>
          </Modal.Body>
        </Modal>
      </Col>
    );
    return <OwnerHome pageContent={pageContent} />;
  }
}

export default MenuUpdateCategories;
