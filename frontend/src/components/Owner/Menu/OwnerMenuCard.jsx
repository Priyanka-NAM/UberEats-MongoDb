import React, { Component } from "react";
import "react-times/css/classic/default.css";
import { MdDelete } from "react-icons/md";
import { Image } from "react-bootstrap";
import { PropTypes } from "prop-types";

class OwnerMenuCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickHandler = this.clickHandler.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
  }

  clickHandler = () => {
    const { orderIndex, handleEdit } = this.props;
    handleEdit(orderIndex);
  };

  clickDelete = () => {
    const { orderIndex, handleDelete } = this.props;
    handleDelete(orderIndex);
  };

  render() {
    const { orderIndex, dishName, dishDescription, dishPrice, dishImage } =
      this.props;
    const src = `${dishImage}`;

    console.log("dishPrice ", dishPrice);
    return (
      <div
        className='card mb-3'
        style={{ width: "28rem", margin: "1%" }}
        key={orderIndex}
        dishindex={orderIndex}
        onClick={this.clickHandler}
        onKeyPress={() => {}}
        role='presentation'>
        <div className='row no-gutters'>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title'>{dishName}</h5>

              <p className='card-text'>{dishDescription}</p>
              <p className='card-text'>${dishPrice}</p>
            </div>
          </div>
          <div className='col-md-4'>
            <MdDelete
              onClick={this.clickDelete}
              size='30'
              style={{
                position: "absolute",
                zIndex: "1000",
                marginLeft: "24%",
                color: "grey",
              }}
            />
            <Image src={src} />
          </div>
        </div>
      </div>
    );
  }
}
OwnerMenuCard.propTypes = {
  dishDescription: PropTypes.string.isRequired,
  orderIndex: PropTypes.number.isRequired,
  dishName: PropTypes.string.isRequired,
  dishPrice: PropTypes.string.isRequired,
  dishImage: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default OwnerMenuCard;
