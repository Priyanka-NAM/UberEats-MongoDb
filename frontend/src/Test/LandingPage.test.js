/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";

import Adapter from "enzyme-adapter-react-16";

import LandingPage from "../components/LandingPage/LandingPage";

Enzyme.configure({ adapter: new Adapter() });

it("render the Landing Page component correctly", () => {
  const LandingPageComponent = renderer
    .create(
      <Router>
        <LandingPage />
      </Router>
    )
    .toJSON();
  expect(LandingPageComponent).toMatchSnapshot();
});
