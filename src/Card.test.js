import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";
import image1 from "./image1.jpg";

it("renders without crashing", function() {
  render(<Card />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Card src={image1} caption="Photo by Richard Pasquarella on Unsplash" currNum={1} totalNum={1}/>);
  expect(asFragment()).toMatchSnapshot();
});

