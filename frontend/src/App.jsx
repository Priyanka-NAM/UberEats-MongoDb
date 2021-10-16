import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { Switch } from "react-router";
import Main from "./components/main";
import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <React.Fragment key='key'>
        <Switch>
          <Main />
        </Switch>
      </React.Fragment>
    </Provider>
  );
}

export default App;
