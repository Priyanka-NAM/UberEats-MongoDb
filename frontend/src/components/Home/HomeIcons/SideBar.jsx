import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Button, Row } from "react-bootstrap";
import "../../Styles/SideBar.css";

const SidebarButton = {
  borderRadius: 20,
  backgroundColor: "#eeeeee",
  color: "black",
  fontSize: "16px",
  fontFamily: "UberMoveText, sans-serif",
  fontWeight: "550",
  textTransform: "none",
  height: "40px",
};

const SidebarActiveButton = {
  borderRadius: 20,
  backgroundColor: "black",
  color: "white",
  fontFamily: "UberMoveText, sans-serif",
  fontWeight: "550",
  fontSize: "16px",
  textTransform: "none",
  height: "40px",
};

let vegStyle = SidebarButton;
let nonVegStyle = SidebarButton;
let veganStyle = SidebarButton;

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVeganActive: false,
      isVegActive: false,
      isNonVegActive: false,
    };
  }

  handleFoodType = (e) => {
    e.preventDefault();
    const { isVegActive, isNonVegActive, isVeganActive } = this.state;
    const { FoodTypeSelection } = this.props;
    if (e.target.name === "veg") {
      if (!isVegActive) {
        this.setState({
          isVegActive: true,
          isNonVegActive: false,
          isVeganActive: false,
        });
        vegStyle = SidebarActiveButton;
        nonVegStyle = SidebarButton;
        veganStyle = SidebarButton;
      } else {
        this.setState({
          isVegActive: false,
        });
        vegStyle = SidebarButton;
        return FoodTypeSelection("allresto");
      }
    } else if (e.target.name === "nonveg") {
      if (!isNonVegActive) {
        this.setState({
          isVegActive: false,
          isNonVegActive: true,
          isVeganActive: false,
        });
        nonVegStyle = SidebarActiveButton;
        vegStyle = SidebarButton;
        veganStyle = SidebarButton;
      } else {
        this.setState({
          isNonVegActive: false,
        });
        nonVegStyle = SidebarButton;
        return FoodTypeSelection("allresto");
      }
    } else if (e.target.name === "vegan") {
      if (!isVeganActive) {
        this.setState({
          isVeganActive: true,
          isVegActive: false,
          isNonVegActive: false,
        });
        veganStyle = SidebarActiveButton;
        nonVegStyle = SidebarButton;
        vegStyle = SidebarButton;
      } else {
        this.setState({
          isVeganActive: false,
        });
        veganStyle = SidebarButton;
        return FoodTypeSelection("allresto");
      }
    }
    return FoodTypeSelection(e.target.name);
  };

  render() {
    return (
      <Container fluid='true'>
        <Row fluid='true'>
          <Row>
            <h4 className='sidebar-heading'>Sort</h4>
          </Row>

          <Row style={{ maxWidth: "20%" }}>
            <Button
              variant='light'
              style={veganStyle}
              name='vegan'
              onClick={this.handleFoodType}>
              Vegan
            </Button>
          </Row>
          <Row style={{ maxWidth: "32%" }}>
            <Button
              variant='light'
              style={vegStyle}
              name='veg'
              onClick={this.handleFoodType}>
              Vegetarian
            </Button>
          </Row>
          <Row style={{ maxWidth: "32%" }}>
            <Button
              variant='light'
              style={nonVegStyle}
              name='nonveg'
              onClick={this.handleFoodType}>
              Non-Vegetarian
            </Button>
          </Row>
        </Row>
      </Container>
    );
  }
}
SideBar.propTypes = {
  FoodTypeSelection: PropTypes.func.isRequired,
};
export default SideBar;
