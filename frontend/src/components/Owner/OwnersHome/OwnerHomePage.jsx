/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import "react-times/css/classic/default.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import OwnerRestaBanner from "../../Restaurent/RestaurentPageIcons/OwnerRestaBanner";
import OwnerHome from "../../Home/OwnerHome";
import MenuCard from "../../Restaurent/RestaurentPageIcons/MenuCard";
import { ownerMenu } from "../../../Actions/OwnerActions";

class OwnerHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { ownerMenu: ownerMenuRenamed } = this.props;
    ownerMenuRenamed();
  }

  componentDidUpdate = (prevprops) => {
    const { allDishes, ownerDetails } = this.props;
    if (
      allDishes !== prevprops.allDishes ||
      ownerDetails !== prevprops.ownerDetails
    ) {
      this.setState({
        allDishes,
        ownerDetails,
      });
    }
  };

  render() {
    let restaurentMenu = null;
    const { allDishes, ownerDetails } = this.state;
    if (allDishes) {
      restaurentMenu = allDishes.map((dish) => (
        <MenuCard
          key={dish.dish_id}
          src={dish.image_file_path}
          title={dish.name}
          price={dish.price}
          description={dish.description}
          quantity='2'
          dishDetails={dish}
          isOwnerHome
        />
      ));
    }
    let src = null;
    let restaTitle = null;
    let restaAddress = null;
    let otherDetails = null;
    let description = null;
    if (ownerDetails) {
      src = `${ownerDetails.image_file_path}`;
      restaTitle = ownerDetails.name;
      restaAddress = `(${ownerDetails.restaurant_address_line_one})`;
      otherDetails = `Ph -${ownerDetails.phone_num}  • Timings ${ownerDetails.restaurant_start_time} - ${ownerDetails.restaurant_end_time}`;
      description = ownerDetails.description;
    }

    const pageContent = (
      <Col style={{ padding: "0%", margin: "0%" }}>
        <Container fluid>
          <Row style={{ paddingTop: "2%" }}>
            <OwnerRestaBanner
              key='1'
              src={src}
              restaTitle={restaTitle}
              restaAddress={restaAddress}
              otherDetails={otherDetails}
              restauDescri={description}
            />
          </Row>
          <Row style={{ padding: "0%", margin: "0%", width: "100%" }}>
            {restaurentMenu}
          </Row>
        </Container>
      </Col>
    );
    return <OwnerHome pageContent={pageContent} />;
  }
}

OwnerHomePage.propTypes = {
  allDishes: PropTypes.object.isRequired,
  ownerDetails: PropTypes.object.isRequired,
  ownerMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allDishes: state.owner.allDishes,
  ownerDetails: state.owner.ownerDetails.user,
});

export default connect(mapStateToProps, {
  ownerMenu,
})(OwnerHomePage);
