/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-return-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import "react-times/css/classic/default.css";
import { PropTypes } from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Form, Col, Alert, Row, Card } from "react-bootstrap";
import backendServer from "../../../backEndConfig";
import { getToken } from "../../Service/authService";
import { ownerMenuAdd, ownerMenuUpdate } from "../../../Actions/OwnerActions";
import { dishProfilePic } from "../../../Actions/ImageUploadAction";

class MenuAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddSave = this.handleAddSave.bind(this);
    this.handleEditSave = this.handleEditSave.bind(this);
    this.setStateFromProps = this.setStateFromProps.bind(this);
  }

  componentDidMount() {
    this.hasMounted = true;
    this.setStateFromProps(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentDish !== prevProps.currentDish) {
      this.setStateFromProps(this.props);
    }
    if (this.props.imageFilePath !== prevProps.imageFilePath) {
      this.setState({
        imageFilePath: this.props.imageFilePath,
      });
    }
  }

  handleAddSave = (e) => {
    const { visibilityCb, actionType } = this.props;
    e.preventDefault();
    console.log("Inside Handle Add Save ", this.state);
    console.log("Inside Handle Add Save ", this.props);

    const {
      restaurentId,
      dishname,
      dishdescription,
      dishcategory,
      dishtype,
      ingredients,
      price,
      imageFilePath,
    } = this.state;
    // const { imageFilePath } = this.props;

    const dishdata = {
      restaurentId,
      dishname,
      dishdescription,
      imageFilePath,
      dishcategory,
      dishtype,
      ingredients,
      price,
    };

    this.props.ownerMenuAdd(dishdata);
    return visibilityCb();
  };

  handleEditSave = (e) => {
    const { visibilityCb } = this.props;
    e.preventDefault();
    console.log("Inside Handle Submit ", this.state);
    const isActive = "true";
    const {
      dishId,
      restaurentId,
      dishname,
      dishdescription,
      dishcategory,
      dishtype,
      ingredients,
      price,
    } = this.state;
    const { imageFilePath } = this.props;
    // isActive (should be '0' for deleting)
    const dishdata = {
      dishId,
      restaurentId,
      dishname,
      dishdescription,
      imageFilePath,
      dishcategory,
      dishtype,
      ingredients,
      price,
      isActive,
    };
    this.props.ownerMenuUpdate(dishdata);
    visibilityCb();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { actionType } = this.props;
    console.log("save button => action type ", actionType);
    if (actionType === "Add Item") {
      this.handleAddSave(e);
    }
    if (actionType === "Edit Item") {
      this.handleEditSave(e);
    }
  };

  handleUploadImage(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("image", this.fileInput.files[0]);
    this.props.dishProfilePic(data);
  }

  // handleUplokadImage(e) {
  //   e.preventDefault();
  //   const data = new FormData();
  //   data.append("image", this.fileInput.files[0]);
  //   const uploadConfig = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //       authorization: getToken(),
  //     },
  //   };
  //   axios.defaults.withCredentials = true;
  //   axios.defaults.headers.common["x-auth-token"] = getToken();
  //   axios
  //     .post(
  //       `${backendServer}/ubereats/fileUpload/profile_upload`,
  //       data,
  //       uploadConfig
  //     )
  //     .then((response) => {
  //       console.log("Response from server ", response.data);
  //       this.setState({
  //         src: `${backendServer}/public/${response.data}`,
  //         imageFilePath: `${response.data}`,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("Upload file error: ", err.response);
  //     });
  // }

  setStateFromProps = (updatedProps) => {
    const { currentDish } = updatedProps;
    const {
      name,
      description,
      ingredients,
      price,
      category,
      dish_type,
      dish_id,
      restaurant_id,
      image_file_path,
    } = currentDish || {};

    this.setState({
      dishId: dish_id,
      restaurentId: restaurant_id,
      dishname: name,
      dishdescription: description,
      image: image_file_path,
      dishcategory: category,
      dishtype: dish_type,
      ingredients: ingredients,
      price: price,
      imageFilePath: image_file_path,
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { actionType } = this.props;
    console.log("state inside render of menu add edit ", this.state);
    const {
      dishname: name,
      dishdescription: description,
      dishcategory,
      dishtype,
      ingredients,
      price,
      updateStatus,
    } = this.state;
    const { imageFilePath } = this.props;
    const src = `${imageFilePath}`;

    let alertmessage = null;
    if (updateStatus === "DISH_UPDATE_SUCCESS") {
      alertmessage = <Alert variant='success'>Dish is updated.</Alert>;
    } else if (updateStatus === "DISH_UPDATE_FAILURE") {
      alertmessage = <Alert variant='danger'>Unable to update this dish</Alert>;
    }
    return (
      <div>
        <h4
          style={{
            fontSize: "28px",
            fontFamily: "sans-serif",
            paddingBottom: "0%",
          }}>
          {actionType}
        </h4>

        <Form
          style={{
            width: "90%",
            marginTop: "25px",
            fontFamily: "sans-serif",
            fontSize: "18px",
          }}
          onSubmit={this.handleSubmit}>
          <Button
            type='submit'
            style={{
              marginLeft: "70%",
              marginTop: "0%",
              width: "16%",
              height: "3rem",
              fontFamily: "sans-serif",
              fontSize: "18px",
            }}
            variant='dark'>
            Save
          </Button>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Dish Name</Form.Label>
            <Form.Control
              type='text'
              name='dishname'
              required
              placeholder=''
              value={name}
              onChange={this.handleChange}
              style={{ backgroundColor: "#eeee" }}
            />
          </Form.Group>
          <br />
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Row>
              <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  style={{ height: "90%", backgroundColor: "#eeee" }}
                  as='textarea'
                  name='dishdescription'
                  value={description}
                  required
                  rows={5}
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Picture</Form.Label>
                <Card style={{ width: "16rem", height: "12rem" }}>
                  <div style={{ width: "16rem", height: "8rem" }}>
                    <img src={src} alt='Preview' />
                  </div>
                  <input
                    type='file'
                    name='image'
                    encType='multipart/form-data'
                    className='form-control'
                    style={{ display: "none" }}
                    ref={(fileInput) => (this.fileInput = fileInput)}
                  />
                  <Card.Footer align='center'>
                    <Button
                      variant='light'
                      style={{
                        paddingTop: "10px",
                        width: "40%",
                        paddingRight: "15px",
                      }}
                      onClick={() => this.fileInput.click()}>
                      Add File
                    </Button>
                    <Button
                      variant='dark'
                      style={{ paddingTop: "10px", width: "40%" }}
                      onClick={this.handleUploadImage}>
                      Upload
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Form.Group>
          <br />
          <Row>
            <Col>
              <Form.Label>Catergories</Form.Label>
              <Form.Select
                name='dishcategory'
                style={{
                  backgroundColor: "#eeee",
                }}
                value={dishcategory}
                onChange={this.handleChange}
                required>
                <option value=''>Select Category</option>
                <option value='Appetizer'>Appetizer</option>
                <option value='Salads'>Salads</option>
                <option value='Main Course'>Main Course</option>
                <option value='Desserts'>Desserts</option>
                <option value='Beverages'>Beverages</option>
                <option value='Others'>Others</option>
              </Form.Select>
              <br />
            </Col>
            <Col>
              <Form.Label>Dietary</Form.Label>
              <Form.Select
                name='dishtype'
                onChange={this.handleChange}
                style={{
                  backgroundColor: "#eeee",
                }}
                value={dishtype}
                required>
                <option value=''>Select Dietary</option>
                <option value='Vegetarian'>Veg</option>
                <option value='Non Vegetarian'>NonVeg</option>
                <option value='Vegan'>Vegan</option>
              </Form.Select>
              <br />
            </Col>
          </Row>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Main Ingredients</Form.Label>
            <Form.Control
              type='text'
              name='ingredients'
              value={ingredients}
              placeholder=''
              onChange={this.handleChange}
              style={{ backgroundColor: "#eeee" }}
            />
          </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
            <Form.Label column sm={8}>
              Price
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type='text'
                pattern='^\d*(\.\d{0,2})?$'
                name='price'
                value={price}
                onChange={this.handleChange}
                required
                placeholder='$'
                style={{ backgroundColor: "#eeee" }}
              />
            </Col>
          </Form.Group>
          {alertmessage}
        </Form>
      </div>
    );
  }
}

MenuAddEdit.propTypes = {
  actionType: PropTypes.string.isRequired,
  visibilityCb: PropTypes.func.isRequired,
  currentDish: PropTypes.object.isRequired,
  ownerMenuAdd: PropTypes.func.isRequired,
  ownerMenuUpdate: PropTypes.func.isRequired,
  dishProfilePic: PropTypes.func.isRequired,
  imageFilePath: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  imageFilePath: state.imageUpload.dish_image_file_path,
});

export default connect(mapStateToProps, {
  ownerMenuAdd,
  ownerMenuUpdate,
  dishProfilePic,
})(MenuAddEdit);
