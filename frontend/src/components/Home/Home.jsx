import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import OwnerHome from "./OwnerHome";
import CustomerHome from "./CustomerHome";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let home = null;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.is_owner === 1) {
        home = <OwnerHome />;
      } else if (user.is_owner === 0) home = <CustomerHome />;
    } else {
      home = <Redirect to='/' />;
    }

    return <div>{home}</div>;
  }
}
export default Home;
