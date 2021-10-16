/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { shallowToJson } from "enzyme-to-json";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SignIn from "../components/SignIn/signIn";

Enzyme.configure({ adapter: new Adapter() });

it("renders three <SignIn /> components", () => {
  const SignInWrapper = shallow(
    <Router>
      <SignIn />
    </Router>
  );
  expect(shallowToJson(SignInWrapper)).toMatchSnapshot();
});
