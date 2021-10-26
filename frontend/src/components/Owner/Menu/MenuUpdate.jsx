/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component } from "react";
import "react-times/css/classic/default.css";
import { FaPlus, FaGripLines } from "react-icons/fa";
import { Button, Col, Alert, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OwnerHome from "../../Home/OwnerHome";
import MenuNav from "./MenuNav";
import MenuAddEdit from "./MenuAddEdit";
import OwnerMenuCard from "./OwnerMenuCard";
import { ownerMenu, ownerMenuUpdate } from "../../../Actions/OwnerActions";

class MenuUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = { showEdit: false, showAdd: false };
  }

  componentDidMount() {
    this.props.ownerMenu();
  }

  componentDidUpdate = (prevprops) => {
    const { allDishes } = this.props;
    if (allDishes !== prevprops.allDishes) {
      this.setState({
        allDishes,
      });
    }
  };

  handleEdit = (index) => {
    const { allDishes, showEdit } = this.state;
    this.setState({
      showEdit: !showEdit,
      showAdd: false,
      currentDish: allDishes[index],
    });
  };

  handleAdd = (e) => {
    e.preventDefault();
    const { showAdd } = this.state;
    this.setState({
      showAdd: !showAdd,
      showEdit: false,
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    this.setState({
      showEdit: false,
    });
  };

  handleAddSave = (e) => {
    e.preventDefault();
    this.setState({
      showAdd: false,
    });
  };

  visibilityEditHandler = () => {
    const { showEdit } = this.state;
    this.setState({
      showEdit: !showEdit,
    });
  };

  visibilityAddHandler = () => {
    const { showAdd } = this.state;
    this.setState({
      showAdd: !showAdd,
    });
  };

  handleDelete = (index) => {
    this.setState({
      showEdit: false,
    });
    const isActive = "false";
    const { allDishes } = this.state;
    const delDish = allDishes[index];
    const {
      dish_id: dishId,
      restaurant_id: restaurentId,
      name: dishname,
      description: dishdescription,
      dish_category: dishcategory,
      dish_type: dishtype,
      ingredients,
      price,
      image_file_path: imageFilePath,
    } = delDish;
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
  };

  createMenuCardComps = (dishes) => {
    const { allDishes } = this.state;
    const allDishIndexes = [];
    for (let idx = 0; idx < dishes.length; idx += 1) {
      allDishIndexes.push(
        allDishes.findIndex((dish) => dish.dish_id === dishes[idx].dish_id)
      );
    }
    return dishes.map((dish, index) => (
      <OwnerMenuCard
        key={dish.name}
        orderIndex={allDishIndexes[index]}
        dishName={dish.name}
        dishDescription={dish.description}
        dishPrice={dish.price}
        dishImage={dish.image_file_path}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
      />
    ));
  };

  render() {
    const { showEdit, showAdd, errormessage, allDishes, currentDish } =
      this.state;
    let appetizerComp = null;
    let saladsComp = null;
    let mainCourseComp = null;
    let dessertsComp = null;
    let beveragesComp = null;
    let otherComp = null;
    let MenuAddEditComp = null;
    if (!allDishes || allDishes.length === 0) {
      appetizerComp = <Alert variant='info'>No Dishes to Display</Alert>;
    } else {
      const appetizers = allDishes.filter(
        (dish) => dish.category === "Appetizer"
      );
      const salads = allDishes.filter((dish) => dish.category === "Salads");
      const mainCourse = allDishes.filter(
        (dish) => dish.category === "Main Course"
      );
      const desserts = allDishes.filter((dish) => dish.category === "Desserts");
      const beverages = allDishes.filter(
        (dish) => dish.category === "Beverages"
      );
      const other = allDishes.filter((dish) => dish.category === "Others");

      appetizerComp = this.createMenuCardComps(appetizers);
      saladsComp = this.createMenuCardComps(salads);
      mainCourseComp = this.createMenuCardComps(mainCourse);
      dessertsComp = this.createMenuCardComps(desserts);
      beveragesComp = this.createMenuCardComps(beverages);
      otherComp = this.createMenuCardComps(other);
    }
    if (showEdit) {
      MenuAddEditComp = (
        <div
          show={showEdit.toString()}
          style={{ display: showEdit ? "block" : "none" }}>
          <MenuAddEdit
            key='edit'
            visibilityCb={this.visibilityEditHandler}
            currentDish={currentDish}
            displayDetails={showEdit}
            actionType='Edit Item'
          />
        </div>
      );
    } else if (showAdd) {
      const { restaurant_id: restaurantId } = JSON.parse(
        localStorage.getItem("user")
      );
      const newDish = { restaurant_id: restaurantId };
      MenuAddEditComp = (
        <div
          show={showAdd.toString()}
          style={{ display: showAdd ? "block" : "none" }}>
          <MenuAddEdit
            key='add'
            visibilityCb={this.visibilityAddHandler}
            displayDetails={showAdd}
            actionType='Add Item'
            currentDish={newDish}
          />
        </div>
      );
    }
    const pageContent = (
      <Col style={{ padding: "0px" }} align='left'>
        <MenuNav />
        <Row style={{ marginRight: "0%" }}>
          <Col
            style={{
              paddingLeft: "5%",
              paddingTop: "4%",
              borderRight: "1px solid black",
              height: "84vh",
              overflow: "scroll",
            }}>
            <h4 style={{ fontSize: "35px", fontFamily: "sans-serif" }}>Menu</h4>
            <Button
              onClick={this.handleAdd}
              style={{
                marginLeft: "70%",
                marginTop: "0%",
                width: "15%",
                height: "3rem",
                fontFamily: "sans-serif",
                fontSize: "18px",
              }}
              variant='light'>
              <FaPlus style={{ marginRight: "10%" }} />
              Add Item
            </Button>
            {errormessage}
            <Row style={{ paddingTop: "40px", width: "90%" }}>
              <tr>
                <th
                  style={{
                    fontSize: "22px",
                    fontFamily: "sans-serif",
                  }}>
                  <FaGripLines style={{ backgroundColor: "#eeeee" }} />
                  <span style={{ paddingLeft: "15px" }}>Appetizers</span>
                </th>
              </tr>
              <Row>{appetizerComp}</Row>
            </Row>
            <Row style={{ paddingTop: "40px", width: "90%" }}>
              <tr>
                <th
                  style={{
                    fontSize: "22px",
                    fontFamily: "sans-serif",
                  }}>
                  <FaGripLines style={{ backgroundColor: "#eeeee" }} />
                  <span style={{ paddingLeft: "15px" }}>Salads</span>
                </th>
              </tr>
              <Row>{saladsComp}</Row>
            </Row>
            <Row style={{ paddingTop: "40px", width: "90%" }}>
              <tr>
                <th
                  style={{
                    fontSize: "22px",
                    fontFamily: "sans-serif",
                  }}>
                  <FaGripLines style={{ backgroundColor: "#eeeee" }} />
                  <span style={{ paddingLeft: "15px" }}>Main Course</span>
                </th>
              </tr>
              <Row>{mainCourseComp}</Row>
            </Row>
            <Row style={{ paddingTop: "40px", width: "90%" }}>
              <tr>
                <th
                  style={{
                    fontSize: "22px",
                    fontFamily: "sans-serif",
                  }}>
                  <FaGripLines style={{ backgroundColor: "#eeeee" }} />
                  <span style={{ paddingLeft: "15px" }}>Beverages</span>
                </th>
              </tr>
              <Row>{beveragesComp}</Row>
            </Row>
            <Row style={{ paddingTop: "40px", width: "90%" }}>
              <tr>
                <th
                  style={{
                    fontSize: "22px",
                    fontFamily: "sans-serif",
                  }}>
                  <FaGripLines style={{ backgroundColor: "#eeeee" }} />
                  <span style={{ paddingLeft: "15px" }}>Desserts</span>
                </th>
              </tr>
              <Row>{dessertsComp}</Row>
            </Row>
            <Row style={{ paddingTop: "40px", width: "90%" }}>
              <tr>
                <th
                  style={{
                    fontSize: "22px",
                    fontFamily: "sans-serif",
                  }}>
                  <FaGripLines style={{ backgroundColor: "#eeeee" }} />
                  <span style={{ paddingLeft: "15px" }}>Others</span>
                </th>
              </tr>
              <Row>{otherComp}</Row>
            </Row>
          </Col>
          <Col xs={4} style={{ paddingTop: "10px" }}>
            {MenuAddEditComp}
          </Col>
        </Row>
      </Col>
    );
    return <OwnerHome pageContent={pageContent} />;
  }
}

MenuUpdate.propTypes = {
  allDishes: PropTypes.object.isRequired,
  ownerMenu: PropTypes.func.isRequired,
  ownerMenuUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allDishes: state.owner.allDishes,
});

export default connect(mapStateToProps, {
  ownerMenu,
  ownerMenuUpdate,
})(MenuUpdate);
