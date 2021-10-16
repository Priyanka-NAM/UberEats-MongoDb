import React, { Fragment, Component } from "react";
import { Route } from "react-router-dom";
import OwnerSignUp from "./SignUp/ownerSignUp";
import CustomerSignUp from "./SignUp/customerSignUp";
import CustomerHome from "./Home/CustomerHome";
import SignIn from "./SignIn/signIn";
import RestaurentHome from "./Restaurent/CustomerRestaurentHome";
import LandingPage from "./LandingPage/LandingPage";
import FinalOrder from "./Customer/Orders/FinalOrder";
import CustomerOrders from "./Customer/Orders/CustomerOrders";
import MenuUpdate from "./Owner/Menu/MenuUpdate";
import OwnerProfile from "./Owner/Profile/OwnerProfile";
import MenuUpdateCategories from "./Owner/Menu/MenuUpdateCategories";
import OwnerOrders from "./Owner/Orders/OwnerOrders";
import DeliveredOrders from "./Owner/Orders/DeliveredOrders";
import CancelledOrders from "./Owner/Orders/CancelledOrders";
import OwnerHomePage from "./Owner/OwnersHome/OwnerHomePage";
import CustomerProfile from "./Customer/Profile/CustomerProfile";
import Favorites from "./Customer/Favorites/Favorites";
import Home from "./Home/Home";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment key='key'>
        <main>
          <Route path='/signin' component={SignIn} />
          <Route path='/customer/signup' component={CustomerSignUp} />
          <Route path='/owner/signup' component={OwnerSignUp} />
          <Route path='/restaurents' component={RestaurentHome} />
          <Route path='/customer/home' component={CustomerHome} />
          <Route path='/order/checkout' component={FinalOrder} />
          <Route path='/customerorder' component={CustomerOrders} />
          <Route path='/owner/menuupdate' component={MenuUpdate} />
          <Route
            path='/owner/updatecategories'
            component={MenuUpdateCategories}
          />
          <Route path='/owner/orders' component={OwnerOrders} />
          <Route path='/owner/deliveredorders' component={DeliveredOrders} />
          <Route path='/owner/cancelledorders' component={CancelledOrders} />
          <Route path='/owner/profile' component={OwnerProfile} />
          <Route path='/customer/profile' component={CustomerProfile} />
          <Route path='/customer/favorites' component={Favorites} />
          <Route path='/owner/home' component={OwnerHomePage} />
          <Route path='/home' exact component={Home} />
          <Route path='/' exact component={LandingPage} />
        </main>
      </Fragment>
    );
  }
}

export default Main;
